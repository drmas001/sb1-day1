import React, { useState, useEffect } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

interface PatientData {
  mrn: string;
  patient_name: string;
  age: string;
  gender: string;
  admission_date: string;
  admission_time: string;
  assigned_doctor: string;
  specialty: string;
}

const NewPatientAdmission: React.FC = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData>({
    mrn: '',
    patient_name: '',
    age: '',
    gender: '',
    admission_date: '',
    admission_time: '',
    assigned_doctor: '',
    specialty: '',
  });
  const [existingPatient, setExistingPatient] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (patientData.mrn) {
      checkExistingPatient(patientData.mrn);
    }
  }, [patientData.mrn]);

  const checkExistingPatient = async (mrn: string) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('mrn', mrn)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No matching patient found
          setExistingPatient(null);
        } else {
          throw error;
        }
      } else if (data) {
        setExistingPatient(data);
      }
    } catch (error) {
      console.error('Error checking existing patient:', error);
      toast.error('Error checking patient records');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let patientId;

      if (existingPatient) {
        // If patient exists, use their MRN
        patientId = existingPatient.mrn;
      } else {
        // If new patient, insert into patients table
        const { data: newPatient, error: patientError } = await supabase
          .from('patients')
          .insert([
            {
              mrn: patientData.mrn,
              patient_name: patientData.patient_name,
              age: patientData.age,
              gender: patientData.gender,
              admission_date: patientData.admission_date,
              admission_time: patientData.admission_time,
              assigned_doctor: patientData.assigned_doctor,
              specialty: patientData.specialty
            }
          ])
          .select()
          .single();

        if (patientError) throw patientError;
        patientId = newPatient.mrn;
      }

      // Insert new visit
      const { data: newVisit, error: visitError } = await supabase
        .from('visits')
        .insert([
          {
            mrn: patientId,
            admission_date: `${patientData.admission_date}T${patientData.admission_time}`,
            specialty: patientData.specialty,
          }
        ])
        .select()
        .single();

      if (visitError) throw visitError;

      toast.success(existingPatient ? 'Patient re-admitted successfully' : 'New patient admitted successfully');
      navigate(`/patient/${patientId}`);
    } catch (error: any) {
      setError('Failed to admit patient. Please try again.');
      console.error('Error:', error.message);
      toast.error('Error admitting patient');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component remains the same
};

export default NewPatientAdmission;