const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const { PDFDocument, rgb } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3000;

const jwt = require("jsonwebtoken");

const usersDir = path.join(__dirname, 'users');
const certsDir = path.join(__dirname, 'certificates');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(usersDir)) fs.mkdirSync(usersDir);
if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir);
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Serve static folders
app.use(express.static('public'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/uploads', express.static(uploadDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "trojan-secret";


const lessons = [
  { id: "lesson1", title: "Introduction to Cybersecurity", desc: "Understand threats, attacks, and CIA triad." },
  { id: "lesson2", title: "Phishing Tactics", desc: "Learn how to detect and avoid phishing." },
  { id: "lesson3", title: "Strong Passwords", desc: "Creating secure passwords and storing them safely." },
  { id: "lesson4", title: "Social Engineering", desc: "How hackers trick users into giving info." },
  { id: "lesson5", title: "Secure Browsing", desc: "Safe use of internet and browser hygiene." }
];

app.get('/', (req, res) => res.redirect('/iamtrojan.html'));

    // ========== Upload Photo ================
// const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return cb(new Error("Unauthorized"));
      }

      const token = authHeader.split(" ")[1];
      const [role, name] = token.split("-");
      const safeName = name?.replace(/\s+/g, "_") || "guest";
      const ext = path.extname(file.originalname);
      const filename = `${safeName}-${Date.now()}${ext}`;
      cb(null, filename);
    } catch (err) {
      cb(new Error("Error processing token"));
    }
  }
});

const upload = multer({ storage });

// ✅ Upload route
app.post('/upload-photo', upload.single('photo'), (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const [role, username] = token.split("-");
    const userFiles = fs.readdirSync(usersDir);
    const matched = userFiles.find(f => f.includes(username));
    if (!matched) return res.status(404).send("User not found");

    const userPath = path.join(usersDir, matched);
    const user = JSON.parse(fs.readFileSync(userPath));
    user.profileImage = `/uploads/${req.file.filename}`;
    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));

    res.send(`
      <h2 style="color:#00f0ff;">Upload successful!</h2>
      <img src="${user.profileImage}" width="200" />
      <br><br>
      <a href="/dashboard/user-dashboard.html">← Back to Dashboard</a>
    `);
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).send("Error uploading image.");
  }
});



// ========== Auth ================
app.post('/register', (req, res) => {
  const { name, email, password, message, securityQuestion, securityAnswer, accessCode } = req.body;
  const role = (accessCode === "TROJAN-ADMIN-2025") ? "admin" : "user";
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userData = {
    name, email, message, securityQuestion, securityAnswer,
    password: hashedPassword, createdAt: new Date(), role
  };
  const fileName = `${Date.now()}-${name.replace(/\s/g, '_')}.json`;
  fs.writeFileSync(path.join(usersDir, fileName), JSON.stringify(userData, null, 2));
  res.send('<h2 style="color:#00f0ff;">Thanks for registering!</h2><a href="/">Go Back</a>');
});

//Login Route
  app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const userFile = fs.readdirSync(usersDir).find(f => {
      const user = JSON.parse(fs.readFileSync(path.join(usersDir, f)));
      return user.email === email;
    });
    if (!userFile) return res.json({ success: false, message: "User not found" });

    const user = JSON.parse(fs.readFileSync(path.join(usersDir, userFile)));
    if (!bcrypt.compareSync(password, user.password))
      return res.json({ success: false, message: "Incorrect password" });

    const role = user.role || "user";
    const payload = { username: user.name.replace(/\s+/g, "_"), role };
    const token = jwt.sign(payload, "trojan-secret", { expiresIn: "1d" });

    res.json({ success: true, token, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ========== User Profile ================
//Me Route
  app.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    const username = decoded.username;

    const userFile = fs.readdirSync(usersDir).find(f => f.includes(username));
    if (!userFile) return res.status(404).json({ message: "User not found" });

    const user = JSON.parse(fs.readFileSync(path.join(usersDir, userFile)));
    res.json({
      name: user.name,
      email: user.email,
      progress: user.progress || 0,
      interests: user.interests || ""
    });
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});


//profile-update route
app.post('/update-profile', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    const username = decoded.username;

    const userFile = fs.readdirSync(usersDir).find(f => f.includes(username));
    if (!userFile) return res.status(404).json({ message: "User not found" });

    const userPath = path.join(usersDir, userFile);
    const user = JSON.parse(fs.readFileSync(userPath));
    const { name, email, interests, progress } = req.body;

    user.name = name;
    user.email = email;
    user.interests = interests;
    user.progress = progress || user.progress || 0;

    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("JWT Decode Error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});


// ========== Courses and Progress ================

app.get('/courses', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret"); // 👈 Match the secret used in /login
    const username = decoded.username;

    const file = fs.readdirSync(usersDir).find(f => f.includes(username));
    if (!file) return res.status(404).json({ message: "User not found" });

    const user = JSON.parse(fs.readFileSync(path.join(usersDir, file)));
    res.json({ lessons, completed: user.completedLessons || [] });
  } catch (err) {
    console.error("JWT Decode Error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});


app.post('/mark-complete', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { lessonId } = req.body;
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    const username = decoded.username;

    const file = fs.readdirSync(usersDir).find(f => f.includes(username));
    if (!file) return res.status(404).json({ success: false, message: "User not found" });

    const userPath = path.join(usersDir, file);
    const user = JSON.parse(fs.readFileSync(userPath));

    user.completedLessons = user.completedLessons || [];
    if (!user.completedLessons.includes(lessonId)) {
      user.completedLessons.push(lessonId);
    }

    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
    res.json({ success: true, message: "Lesson marked complete" });
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
});


app.post('/increase-progress', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    const username = decoded.username;

    const userFile = fs.readdirSync(usersDir).find(f => f.includes(username));
    if (!userFile) return res.status(404).json({ message: "User not found" });

    const userPath = path.join(usersDir, userFile);
    const user = JSON.parse(fs.readFileSync(userPath));

    user.progress = (user.progress || 0) + 1;
    if (user.progress > 10) user.progress = 10;

    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
    res.json({ message: "Progress increased!" });
  } catch (err) {
    console.error("JWT Decode Error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
});


// ========== Certificates ================
app.post("/save-certificate", async (req, res) => {
  const { name, score, certId, date } = req.body;
  const filename = `${certId}-${name.replace(/\s+/g, "_")}`;
  const jsonPath = path.join(certsDir, filename + ".json");
  const pdfPath = path.join(certsDir, filename + ".pdf");

  fs.writeFileSync(jsonPath, JSON.stringify({ name, score, certId, date }, null, 2));

  // Generate PDF certificate using pdf-lib
  const templateBytes = fs.readFileSync("./certs/template.pdf");
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  page.drawText(name, { x: 200, y: 300, size: 24, color: rgb(0, 0.53, 0.71) });
  page.drawText(`Certificate ID: ${certId}`, { x: 200, y: 270, size: 14, color: rgb(0.4, 0.4, 0.4) });
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytes);

  res.json({ success: true, message: "Certificate saved and PDF created." });
});

app.get("/get-certificates", (req, res) => {
  if (!fs.existsSync(certsDir)) return res.json([]);
  const files = fs.readdirSync(certsDir).filter(f => f.endsWith(".json"));
  const certs = files.map(file => JSON.parse(fs.readFileSync(path.join(certsDir, file))));
  res.json(certs);
});

app.get("/certificate/:certId", (req, res) => {
  const certId = req.params.certId;
  const pdfFile = fs.readdirSync(certsDir).find(f => f.startsWith(certId) && f.endsWith(".pdf"));
  if (!pdfFile) return res.status(404).send("Certificate not found");
  res.contentType("application/pdf");
  fs.createReadStream(path.join(certsDir, pdfFile)).pipe(res);
});

// ========== Admin ================

//all-user route
app.get('/all-users', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden: Admin only" });

    const userFiles = fs.readdirSync(usersDir);
    const allUsers = userFiles.map(file => {
      try {
        const userData = JSON.parse(fs.readFileSync(path.join(usersDir, file)));
        return {
          name: userData.name,
          email: userData.email,
          message: userData.message,
          securityQuestion: userData.securityQuestion,
          securityAnswer: userData.securityAnswer, // ✅ Include this
          role: userData.role,
          createdAt: userData.createdAt
        };
      } catch {
        return null;
      }
    }).filter(Boolean);

    res.json(allUsers);
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});


//Reset-password
app.post("/admin/reset-password", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "trojan-secret");
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { email, newPassword } = req.body;
    const userFile = fs.readdirSync(usersDir).find(f => {
      const user = JSON.parse(fs.readFileSync(path.join(usersDir, f)));
      return user.email === email;
    });

    if (!userFile) return res.status(404).json({ message: "User not found" });

    const userPath = path.join(usersDir, userFile);
    const user = JSON.parse(fs.readFileSync(userPath));
    user.password = bcrypt.hashSync(newPassword, 10);
    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
    res.json({ success: true, message: "Password reset successful" });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});


//Change-role
app.post('/admin/change-role', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "trojan-secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { email, role } = req.body;
    const file = fs.readdirSync(usersDir).find(f => {
      const user = JSON.parse(fs.readFileSync(path.join(usersDir, f)));
      return user.email === email;
    });

    if (!file) return res.status(404).json({ success: false, message: "User not found" });
    const userPath = path.join(usersDir, file);
    const user = JSON.parse(fs.readFileSync(userPath));
    user.role = role;
    fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
    res.json({ success: true, message: "Role updated" });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});

// ✅ Broadcast
app.post('/admin/broadcast', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "trojan-secret"); // 🔐 Use your secret
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    console.log("📢 Broadcast:", req.body.message);
    res.json({ success: true, message: "Broadcast successful" });
  } catch (err) {
    console.error("❌ Broadcast Token Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});

// Protect PDF access
// Secure access to PDFs: Backend check
app.use("/pdfs", (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized PDF access");

  try {
    const decoded = jwt.verify(token, "trojan-secret");
    if (decoded.role !== "user" && decoded.role !== "admin") {
      return res.status(403).send("Access denied");
    }
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
});


app.get("/secure-download/:filename", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    jwt.verify(token, "trojan-secret");
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "pdfs", filename);
    if (!fs.existsSync(filePath)) return res.status(404).send("File not found");
    res.download(filePath);
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
});

app.get("/secure-pdf/:filename", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized access (no token)");

  try {
    // 🔍 Verify token
    jwt.verify(token, "trojan-secret"); // Use your real secret key

    const filename = req.params.filename;
    const filePath = path.join(__dirname, "pdfs", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    res.sendFile(filePath);
  } catch (err) {
    console.error("Token error:", err.message);
    res.status(403).send("Invalid or expired token");
  }
});


// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
