import React, { useState } from 'react';
import { UserPlus, UserMinus, Users } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  code: string;
  isAdmin: boolean;
}

const AdminDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Doe', code: 'JD001', isAdmin: false },
    { id: '2', name: 'Jane Smith', code: 'JS002', isAdmin: true },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: '', code: '', isAdmin: false });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
    setNewEmployee({ name: '', code: '', isAdmin: false });
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleToggleAdmin = (id: string) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, isAdmin: !emp.isAdmin } : emp
    ));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Add New Employee</h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Employee Code</label>
              <input
                type="text"
                name="code"
                id="code"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={newEmployee.code}
                onChange={(e) => setNewEmployee({...newEmployee, code: e.target.value})}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={newEmployee.isAdmin}
                onChange={(e) => setNewEmployee({...newEmployee, isAdmin: e.target.checked})}
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                Admin Access
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Employee List</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <li key={employee.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-indigo-600">{employee.name}</p>
                      <p className="text-sm text-gray-500">{employee.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleToggleAdmin(employee.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.isAdmin
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {employee.isAdmin ? 'Admin' : 'Staff'}
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <UserMinus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;