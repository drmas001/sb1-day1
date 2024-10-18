import React, { useState } from 'react';
import { FileText, Plus, Calendar, Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

interface Report {
  id: string;
  date: string;
  content: string;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create PDF Document
const ReportPDF = ({ report }: { report: Report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Daily Report</Text>
        <Text style={styles.content}>Date: {report.date}</Text>
        <Text style={styles.content}>Content: {report.content}</Text>
      </View>
    </Page>
  </Document>
);

const DailyReportsManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    { id: '1', date: '2023-03-22', content: 'All patients stable. No major incidents.' },
    { id: '2', date: '2023-03-23', content: 'Two new admissions in Cardiology. One discharge from Neurology.' },
  ]);
  const [newReport, setNewReport] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReport.trim()) {
      setReports([...reports, { id: Date.now().toString(), date: selectedDate, content: newReport.trim() }]);
      setNewReport('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Daily Reports Management</h1>
      
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Daily Report</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Create a new report for today's activities and patient status.</p>
          </div>
          <form onSubmit={handleAddReport} className="mt-5">
            <div className="w-full sm:max-w-xs mb-4">
              <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700">Report Date</label>
              <input
                type="date"
                id="reportDate"
                name="reportDate"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="w-full sm:max-w-xs">
              <label htmlFor="newReport" className="block text-sm font-medium text-gray-700">Report Content</label>
              <textarea
                id="newReport"
                name="newReport"
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter today's report..."
                value={newReport}
                onChange={(e) => setNewReport(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Report
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reports.map((report) => (
            <li key={report.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Report for {report.date}
                  </p>
                  <PDFDownloadLink document={<ReportPDF report={report} />} fileName={`daily_report_${report.date}.pdf`}>
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        'Loading document...'
                      ) : (
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <Download className="h-4 w-4 mr-1" />
                          Download PDF
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {report.content}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyReportsManagement;