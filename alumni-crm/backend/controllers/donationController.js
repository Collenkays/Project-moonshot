const Donation = require('../models/Donation');

const makeDonation = async (req, res) => {
  const { amount } = req.body;

  const donation = new Donation({
    alumni: req.alumni._id,
    amount
  });

  const createdDonation = await donation.save();

  res.status(201).json(createdDonation);
};

const getDonationStats = async (req, res) => {
  const totalDonations = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (totalDonations.length > 0) {
    res.json({
      totalAmount: totalDonations[0].totalAmount,
      count: totalDonations[0].count
    });
  } else {
    res.json({ totalAmount: 0, count: 0 });
  }
};

module.exports = { makeDonation, getDonationStats };