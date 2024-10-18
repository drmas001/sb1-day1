import React from 'react';
import { Users, Activity, Clipboard } from 'lucide-react';

const MainDashboard: React.FC = () => {
  // Mock data - in a real application, this would come from an API
  const patientCount = 150;
  const specialties = [
    { name: 'General Internal Medicine', count: 45 },
    { name: 'Neurology', count: 30 },
    { name: 'Hematology', count: 25 },
    { name: 'Cardiology', count: 50 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Main Dashboard</h1>
      
      <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Patients
                </dt>
                <dd className="text-3xl font-semibold text-gray-900">
                  {patientCount}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Specialty Statistics
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {specialties.map((specialty, index) => (
              <div key={specialty.name} className={index % 2 === 0 ? 'bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6' : 'bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'}>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-indigo-500" />
                  {specialty.name}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {specialty.count} patients
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Clipboard className="h-5 w-5 mr-2" />
          Generate Daily Report
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;