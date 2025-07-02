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

const sendWelcomeEmail = require('./mailer');

// Models
const User = require('./models/user');
const Certificate = require('./models/certificate');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'trojan-secret';
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PDFS_DIR = path.join(__dirname, 'pdfs');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);
if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Static Files
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/pdfs', express.static(PDFS_DIR));
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

app.get('/', (_, res) => res.redirect('/iamtrojan.html'));

app.get('/health', (_, res) => res.send('🚀 Server is healthy'));

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// ✅ Register
app.post('/register', async (req, res) => {
  console.log("📥 Received registration:", req.body);
  try {
    const { name, email, password, message, securityQuestion, securityAnswer, accessCode } = req.body;
    const role = accessCode === 'TROJAN-ADMIN-2025' ? 'admin' : 'user';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists.");

    const newUser = new User({
      name, email, password: hashedPassword, message,
      role, securityQuestion, securityAnswer
    });
    await newUser.save();

    // ✅ Send welcome email
    await sendWelcomeEmail(email, name);

    res.send('<h2 style="color:#00f0ff;">Thanks for registering! A confirmation email has been sent to your inbox.</h2><a href="/">Go Back</a>');
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).send("Registration failed");
  }
});

// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, message, securityQuestion, securityAnswer, accessCode } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.send("User already exists.");

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const role = accessCode === 'TROJAN-ADMIN-2025' ? 'admin' : 'user';

//     const newUser = new User({
//       name, email, message, securityQuestion, securityAnswer,
//       password: hashedPassword, role
//     });

//     await newUser.save();
//     res.send(`<h2 style="color:#00f0ff;">Thanks for registering!</h2><a href="/">Go Back</a>`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Registration failed");
//   }
// });

// ✅ Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.CHIEF_ADMIN_EMAIL && password === process.env.CHIEF_ADMIN_PASS) {
    const token = jwt.sign({ username: "Chief_Trojan", role: "admin" }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token, role: 'admin' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ success: false, message: "Incorrect password" });

  const token = jwt.sign({ username: user.name.replace(/\s+/g, "_"), role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, token, role: user.role });
});

// ✅ Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

app.post('/reset-password', async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    // Check if answer matches
    if (user.securityAnswer.toLowerCase() !== answer.toLowerCase()) {
      return res.status(401).json({ success: false, message: "Incorrect security answer." });
    }

    // Hash new password and save
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ success: true, message: "✅ Password reset successful!" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});


// ✅ Get profile
app.get('/me', authenticate, async (req, res) => {
  const username = req.user.username.replace(/_/g, ' ');
  const user = await User.findOne({ name: new RegExp(`^${username}$`, 'i') });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ name: user.name, email: user.email, progress: user.progress, interests: user.interests });
});

// ✅ Update profile
app.post('/update-profile', authenticate, async (req, res) => {
  const { name, email, interests, progress } = req.body;
  const username = req.user.username.replace(/_/g, ' ');

  const user = await User.findOneAndUpdate(
    { name: new RegExp(`^${username}$`, 'i') },
    { name, email, interests, progress },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Profile updated" });
});

// ✅ Get lessons
app.get('/courses', authenticate, async (req, res) => {
  const username = req.user.username.replace(/_/g, ' ');
  const user = await User.findOne({ name: new RegExp(`^${username}$`, 'i') });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ lessons, completed: user.completedLessons || [] });
});

// ✅ Mark lesson complete
app.post('/mark-complete', authenticate, async (req, res) => {
  const { lessonId } = req.body;
  const username = req.user.username.replace(/_/g, ' ');
  const user = await User.findOne({ name: new RegExp(`^${username}$`, 'i') });

  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  user.completedLessons = user.completedLessons || [];
  if (!user.completedLessons.includes(lessonId)) {
    user.completedLessons.push(lessonId);
  }
  await user.save();
  res.json({ success: true, message: "Lesson marked complete" });
});

// ✅ Progress increase
app.post('/increase-progress', authenticate, async (req, res) => {
  const username = req.user.username.replace(/_/g, ' ');
  const user = await User.findOne({ name: new RegExp(`^${username}$`, 'i') });

  if (!user) return res.status(404).json({ message: "User not found" });
  user.progress = Math.min((user.progress || 0) + 1, 10);
  await user.save();
  res.json({ message: "Progress increased!" });
});

// ✅ Upload photo
app.post('/upload-photo', authenticate, upload.single('photo'), async (req, res) => {
  const username = req.user.username.replace(/_/g, ' ');
  const user = await User.findOne({ name: new RegExp(`^${username}$`, 'i') });

  if (!user) return res.status(404).send("User not found");
  user.profileImage = `/uploads/${req.file.filename}`;
  await user.save();

  res.send(`
    <h2 style="color:#00f0ff;">Upload successful!</h2>
    <img src="${user.profileImage}" width="200" />
    <br><br><a href="/dashboard/user-dashboard.html">← Back to Dashboard</a>
  `);
});

// ✅ Save certificate
app.post('/save-certificate', async (req, res) => {
  try {
    const { name, score, certId, date, level } = req.body;
    const cert = new Certificate({ name, score, certId, date, level });
    await cert.save();

    const templateBytes = fs.readFileSync("./certs/template.pdf");
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];
    page.drawText(name, { x: 200, y: 300, size: 24, color: rgb(0, 0.53, 0.71) });
    page.drawText(`Certificate ID: ${certId}`, { x: 200, y: 270, size: 14, color: rgb(0.4, 0.4, 0.4) });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(PDFS_DIR, `${certId}.pdf`), pdfBytes);

    res.json({ success: true, message: "Certificate saved and PDF created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Certificate generation failed" });
  }
});

// ✅ Get all users (admin)
app.get('/all-users', authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const users = await User.find({}, "-password");
  res.json(users);
});

// ✅ Reset password (admin)
app.post('/admin/reset-password', authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ success: true, message: "Password reset successful" });
});

// ✅ Change role (admin)
app.post('/admin/change-role', authenticate, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  const { email, role } = req.body;
  const user = await User.findOneAndUpdate({ email }, { role }, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ success: true, message: "Role updated" });
});

// ✅ Broadcast (admin)
app.post('/admin/broadcast', authenticate, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  console.log("📢 Admin broadcast:", req.body.message);
  res.json({ success: true, message: "Broadcast successful" });
});

// ✅ Protect PDF route
app.use("/pdfs", authenticate, (req, res, next) => {
  if (["user", "admin"].includes(req.user.role)) return next();
  return res.status(403).send("Access denied");
});

app.get("/certificate/:certId", (req, res) => {
  const filePath = path.join(PDFS_DIR, `${req.params.certId}.pdf`);
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found");
  res.contentType("application/pdf");
  fs.createReadStream(filePath).pipe(res);
});

// ✅ Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
