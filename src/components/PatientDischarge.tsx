import React, { useState, useEffect } from 'react';
import { Search, UserMinus, Calendar, Clock, FileText } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Patient {
  mrn: string;
  patient_name: string;
  admission_date: string;
  specialty: string;
  visit_id: string;
}

interface Visit {
  visit_id: string;
  admission_date: string;
  discharge_date: string | null;
  specialty: string;
}

const PatientDischarge: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeTime, setDischargeTime] = useState('');
  const [dischargeNote, setDischargeNote] = useState('');
  const [previousVisits, setPreviousVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('visits')
        .select(`
          visit_id,
          admission_date,
          specialty,
          patients (mrn, patient_name)
        `)
        .is('discharge_date', null)
        .order('admission_date', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(visit => ({
        mrn: visit.patients.mrn,
        patient_name: visit.patients.patient_name,
        admission_date: visit.admission_date,
        specialty: visit.specialty,
        visit_id: visit.visit_id
      })) || [];

      setPatients(formattedData);
    } catch (error) {
      setError('Failed to fetch patients');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = async (patient: Patient) => {
    setSelectedPatient(patient);
    try {
      const { data, error } = await supabase
        .from('visits')
        .select('visit_id, admission_date, discharge_date, specialty')
        .eq('mrn', patient.mrn)
        .order('admission_date', { ascending: false });

      if (error) throw error;

      setPreviousVisits(data || []);
    } catch (error) {
      console.error('Error fetching previous visits:', error);
      toast.error('Failed to fetch previous visits');
    }
  };

  const handleDischarge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !dischargeDate || !dischargeTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const dischargeDatetime = `${dischargeDate}T${dischargeTime}:00`;

    try {
      const { error } = await supabase
        .from('visits')
        .update({ 
          discharge_date: dischargeDatetime,
          discharge_note: dischargeNote 
        })
        .eq('visit_id', selectedPatient.visit_id);

      if (error) throw error;

      toast.success(`Patient ${selectedPatient.patient_name} has been successfully discharged.`);
      setPatients(patients.filter(patient => patient.mrn !== selectedPatient.mrn));
      setSelectedPatient(null);
      setDischargeDate('');
      setDischargeTime('');
      setDischargeNote('');
      setPreviousVisits([]);
    } catch (error) {
      toast.error('Failed to discharge patient');
      console.error('Error:', error);
    }
  };

  // ... rest of the component remains the same
};

export default PatientDischarge;