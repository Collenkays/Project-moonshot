import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAlumniProfile, updateAlumniProfile } from '../services/api';

function AlumniProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const data = await getAlumniProfile(user.id);
        setProfile(data);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateAlumniProfile(user.id, profile);
    if (result.success) {
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      alert('Error updating profile. Please try again.');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Graduation Year</label>
          <input
            type="number"
            value={profile.graduationYear}
            onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>
        {isEditing ? (
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default AlumniProfile;