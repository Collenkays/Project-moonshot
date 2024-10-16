const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  alumni: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Alumni'
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', DonationSchema);