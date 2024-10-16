import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllAlumni, updateAlumni, deleteAlumni } from '../services/api';

function AdminDashboard() {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      if (user && user.isAdmin) {
        const data = await getAllAlumni();
        setAlumni(data);
      }
    };
    fetchAlumni();
  }, [user]);

  const handleUpdate = async (id, updatedData) => {
    const result = await updateAlumni(id, updatedData);
    if (result.success) {
      setAlumni(alumni.map(a => a.id === id ? { ...a, ...updatedData } : a));
      alert('Alumni updated successfully!');
    } else {
      alert('Error updating alumni. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      const result = await deleteAlumni(id);
      if (result.success) {
        setAlumni(alumni.filter(a => a.id !== id));
        alert('Alumni deleted successfully!');
      } else {
        alert('Error deleting alumni. Please try again.');
      }
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search alumni..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Graduation Year</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumni.map(alumnus => (
            <tr key={alumnus.id}>
              <td>{alumnus.name}</td>
              <td>{alumnus.email}</td>
              <td>{alumnus.graduationYear}</td>
              <td>
                <button onClick={() => handleUpdate(alumnus.id, { /* updated data */ })} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(alumnus.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;