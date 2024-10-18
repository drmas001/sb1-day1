import React, { useState, useEffect } from 'react';
import { Activity, Users, CheckCircle, XCircle, Search, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface Patient {
  mrn: string;
  patient_name: string;
  admission_date: string;
  discharge_date?: string;
  status: 'active' | 'discharged';
}

interface Specialty {
  name: string;
  active_patients: Patient[];
  discharged_patients: Patient[];
}

const specialtiesList = [
  'General Internal Medicine',
  'Respiratory Medicine',
  'Infectious Diseases',
  'Neurology',
  'Gastroenterology',
  'Rheumatology',
  'Hematology',
  'Thrombosis Medicine',
  'Immunology & Allergy'
];

const SpecialtiesManagement: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'patient_name' | 'admission_date' | 'discharge_date'>('admission_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('visits')
        .select(`
          mrn,
          admission_date,
          discharge_date,
          specialty,
          patients (patient_name)
        `);

      if (error) throw error;

      const specialtiesData = specialtiesList.map(specialtyName => {
        const patients = (data || []).filter((visit: any) => visit.specialty === specialtyName);
        return {
          name: specialtyName,
          active_patients: patients.filter((p: any) => !p.discharge_date).map((p: any) => ({
            mrn: p.mrn,
            patient_name: p.patients.patient_name,
            admission_date: p.admission_date,
            status: 'active'
          })),
          discharged_patients: patients.filter((p: any) => p.discharge_date).map((p: any) => ({
            mrn: p.mrn,
            patient_name: p.patients.patient_name,
            admission_date: p.admission_date,
            discharge_date: p.discharge_date,
            status: 'discharged'
          })),
        };
      });

      setSpecialties(specialtiesData);
    } catch (error: any) {
      setError('Failed to fetch patients');
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component remains the same
};

export default SpecialtiesManagement;