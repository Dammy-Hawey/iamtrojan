const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const userData = {
    name,
    email,
    password,
    createdAt: new Date()
  };

  const fileName = `${Date.now()}-${name.replace(/\s/g, '_')}.json`;
  const filePath = path.join(__dirname, 'users', fileName);
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));

  res.send('<h2 style="color:#00f0ff;">Account created successfully!</h2><a href="/">Go Back</a>');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});