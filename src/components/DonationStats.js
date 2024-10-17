import React from 'react';

function DonationStats({ stats }) {
  return (
    <div>
      <h2>Donation Statistics</h2>
      <p>Total Donations: {stats.totalDonations}</p>
      <p>Average Donation Amount: {stats.averageDonationAmount}</p>
      {/* Add more statistics as needed */}
    </div>
  );
}

export default DonationStats;