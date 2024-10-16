const Alumni = require('../models/Alumni');
const generateToken = require('../utils/generateToken');

const registerAlumni = async (req, res) => {
  const { name, email, password, graduationYear } = req.body;

  const alumniExists = await Alumni.findOne({ email });

  if (alumniExists) {
    res.status(400).json({ message: 'Alumni already exists' });
    return;
  }

  const alumni = await Alumni.create({
    name,
    email,
    password,
    graduationYear
  });

  if (alumni) {
    res.status(201).json({
      _id: alumni._id,
      name: alumni.name,
      email: alumni.email,
      graduationYear: alumni.graduationYear,
      isAdmin: alumni.isAdmin,
      token: generateToken(alumni._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid alumni data' });
  }
};

const loginAlumni = async (req, res) => {
  const { email, password } = req.body;

  const alumni = await Alumni.findOne({ email });

  if (alumni && (await alumni.matchPassword(password))) {
    res.json({
      _id: alumni._id,
      name: alumni.name,
      email: alumni.email,
      graduationYear: alumni.graduationYear,
      isAdmin: alumni.isAdmin,
      token: generateToken(alumni._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerAlumni, loginAlumni };