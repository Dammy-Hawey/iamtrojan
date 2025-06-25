require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});


const User = require('./models/user');
const Certificate = require('./models/certificate');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'trojan-secret';
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.error('❌ MongoDB Error:', err));

// Middleware
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Lessons
const lessons = [
  { id: "lesson1", title: "Introduction to Cybersecurity", desc: "Understand threats, attacks, and CIA triad." },
  { id: "lesson2", title: "Phishing Tactics", desc: "Learn how to detect and avoid phishing." },
  { id: "lesson3", title: "Strong Passwords", desc: "Creating secure passwords and storing them safely." },
  { id: "lesson4", title: "Social Engineering", desc: "How hackers trick users into giving info." },
  { id: "lesson5", title: "Secure Browsing", desc: "Safe use of internet and browser hygiene." }
];

app.get('/', (req, res) => res.redirect('/iamtrojan.html'));

//chek-point for the website health
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy 🚀');
});


// ✅ Multer for profile image upload
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// ✅ Registration
app.post('/register', async (req, res) => {
  console.log("📥 Received registration:", req.body); // Add this line
  try {
    const { name, email, password, message, securityQuestion, securityAnswer, accessCode } = req.body;
    const role = accessCode === 'TROJAN-ADMIN-2025' ? 'admin' : 'user';
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists.");

    const newUser = new User({ name, email, password: hashedPassword, message, role, securityQuestion, securityAnswer });
    await newUser.save();

    res.send('<h2 style="color:#00f0ff;">Thanks for registering!</h2><a href="/">Go Back</a>');
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// ✅ Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded fallback admin
  if (email === process.env.CHIEF_ADMIN_EMAIL && password === process.env.CHIEF_ADMIN_PASS) {
    const token = jwt.sign({ username: "Chief_Trojan", role: "admin" }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token, role: 'admin' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Incorrect password" });

  const token = jwt.sign({ username: user.name.replace(/\s+/g, '_'), role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, token, role: user.role });
});

// ✅ Profile Route
app.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ name: new RegExp(`^${decoded.username.replace(/_/g, ' ')}$`, 'i') });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ name: user.name, email: user.email, progress: user.progress, interests: user.interests });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

// ✅ Save Certificate
app.post('/save-certificate', async (req, res) => {
  try {
    const { name, score, certId, date, level } = req.body;
    const cert = new Certificate({ name, score, certId, date, level });
    await cert.save();
    res.json({ success: true, message: "Certificate saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save certificate" });
  }
});

// ✅ Get All Users (admin only)
app.get('/all-users', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

// ✅ Profile Image Upload
app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ name: new RegExp(decoded.username.replace(/_/g, ' '), 'i') });
    if (!user) return res.status(404).send("User not found");

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.send(`
      <h2 style="color:#00f0ff;">Upload successful!</h2>
      <img src="${user.profileImage}" width="200" />
      <br><br><a href="/dashboard/user-dashboard.html">← Back to Dashboard</a>
    `);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Upload failed");
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
