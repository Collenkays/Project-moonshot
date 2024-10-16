const Alumni = require('../models/Alumni');

const getAlumniProfile = async (req, res) => {
  const alumni = await Alumni.findById(req.alumni._id);

  if (alumni) {
    res.json({
      _id: alumni._id,
      name: alumni.name,
      email: alumni.email,
      graduationYear: alumni.graduationYear,
      isAdmin: alumni.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'Alumni not found' });
  }
};

const updateAlumniProfile = async (req, res) => {
  const alumni = await Alumni.findById(req.alumni._id);

  if (alumni) {
    alumni.name = req.body.name || alumni.name;
    alumni.email = req.body.email || alumni.email;
    alumni.graduationYear = req.body.graduationYear || alumni.graduationYear;

    if (req.body.password) {
      alumni.password = req.body.password;
    }

    const updatedAlumni = await alumni.save();

    res.json({
      _id: updatedAlumni._id,
      name: updatedAlumni.name,
      email: updatedAlumni.email,
      graduationYear: updatedAlumni.graduationYear,
      isAdmin: updatedAlumni.isAdmin,
      token: generateToken(updatedAlumni._id),
    });
  } else {
    res.status(404).json({ message: 'Alumni not found' });
  }
};

const getAllAlumni = async (req, res) => {
  const alumni = await Alumni.find({}).select('-password');
  res.json(alumni);
};

module.exports = { getAlumniProfile, updateAlumniProfile, getAllAlumni };