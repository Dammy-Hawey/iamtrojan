const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // 👈 Needed to parse JSON for login

// ✅ Registration route (already there)
app.post('/register', (req, res) => {
  const { name, email, password, message } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const userData = {
    name,
    email,
    password: hashedPassword,
    message,
    createdAt: new Date()
  };

  const fileName = `${Date.now()}-${name.replace(/\s/g, '_')}.json`;
  const filePath = path.join(__dirname, 'users', fileName);
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.send('<h2 style="color:#00f0ff;">Thanks for registering with sincerity!</h2><a href="/">Go Back</a>');
});

// ✅ 🔐 New: Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const usersFolder = path.join(__dirname, 'users');
  const userFiles = fs.readdirSync(usersFolder);

  const matchedFile = userFiles.find(file => {
    const content = JSON.parse(fs.readFileSync(path.join(usersFolder, file)));
    return content.email === email;
  });

  if (!matchedFile) {
    return res.json({ success: false, message: 'User not found' });
  }

  const user = JSON.parse(fs.readFileSync(path.join(usersFolder, matchedFile)));

  if (!bcrypt.compareSync(password, user.password)) {
    return res.json({ success: false, message: 'Incorrect password' });
  }

  // For now: just return a simple token
  const token = `${user.name}-${Date.now()}`;
  res.json({ success: true, token });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
