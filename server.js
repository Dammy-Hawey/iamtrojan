const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


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
