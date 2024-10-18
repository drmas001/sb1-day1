import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Calendar, Activity, FileText, Plus, Edit, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Patient {
  mrn: string;
  patient_name: string;
  age: number;
  gender: string;
  admission_date: string;
  specialty: string;
  assigned_doctor: string;
}

interface Note {
  id: string;
  mrn: string;
  content: string;
  created_at: string;
  created_by: string;
}

const PatientDetails: React.FC = () => {
  const { mrn } = useParams<{ mrn: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatientData();
    fetchPatientNotes();
  }, [mrn]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('mrn', mrn)
        .single();

      if (error) throw error;

      setPatient(data);
    } catch (error) {
      setError('Failed to fetch patient data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_notes')
        .select('*')
        .eq('mrn', mrn)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotes(data || []);
    } catch (error) {
      setError('Failed to fetch patient notes');
      console.error('Error:', error);
    }
  };

  // ... rest of the component remains the same
};

export default PatientDetails;