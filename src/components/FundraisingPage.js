import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDonationStats, makeDonation } from '../services/api';

function FundraisingPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDonationStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  const handleDonation = async (e) => {
    e.preventDefault();
    if (user && amount) {
      const result = await makeDonation(user.id, parseFloat(amount));
      if (result.success) {
        // Update stats and reset form
        setStats(prevStats => ({
          ...prevStats,
          totalRaised: prevStats.totalRaised + parseFloat(amount)
        }));
        setAmount('');
        alert('Thank you for your donation!');
      } else {
        alert('Error processing donation. Please try again.');
      }
    }
  };

  if (!stats) {
    return <div>Loading...</div>;
  }

  const progress = (stats.totalRaised / stats.goal) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support Our Alma Mater</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Fundraising Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-2"><strong>${stats.totalRaised.toLocaleString()}</strong> raised of ${stats.goal.toLocaleString()} goal</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
        <form onSubmit={handleDonation} className="space-y-4">
          <input
            type="number"
            placeholder="Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Donate
          </button>
        </form>
      </div>
    </div>
  );
}

export default FundraisingPage;