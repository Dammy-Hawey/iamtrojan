const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail', // For now, using Gmail. Change this for SendGrid/Mailgun later
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (toEmail, name) => {
  const mailOptions = {
    from: `"iam÷TroJan Security Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "👋 Welcome to iam÷TroJan - Secure Your Cyber World",
    html: `
    <div style="background:#f7f7f7; padding:40px; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:auto; background:white; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
        <div style="background:#000; padding:20px; text-align:center;">
          <img src="https://raw.githubusercontent.com/Dammy-Hawey/iamtrojan/main/public/assets/images/Trojanlogo.png" alt="iam÷TroJan Logo" width="100" />
          <h1 style="color:#00f0ff; margin-top:10px;">Welcome to iam÷TroJan</h1>
        </div>
        <div style="padding:30px; color:#333;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>We're thrilled to welcome you to the <strong>iam÷TroJan</strong> Cybersecurity community.</p>
          <p>
            You're now part of a growing network of individuals who are passionate about protecting our digital world. Whether you're here to learn, explore, or collaborate, you're in the right place.
          </p>
          <h3 style="color:#00f0ff;">Here's What You Can Do Next:</h3>
          <ul style="line-height:1.7;">
            <li>🧠 Access cybersecurity awareness lessons</li>
            <li>🛡️ Learn to avoid phishing, social engineering, and malware threats</li>
            <li>📜 Earn digital certificates of participation</li>
            <li>👨‍💼 Contribute as a user or admin</li>
          </ul>
          <p style="margin-top:20px;">👉 Start your journey here: <a href="https://iamtrojan.onrender.com" style="color:#00f0ff;">iamtrojan.onrender.com</a></p>
          <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
          <p style="font-size:14px; color:#666;">
            This email was automatically sent to <strong>${toEmail}</strong> upon successful registration.<br>
            If you have questions, reply directly or email <a href="mailto:iamtrojan.com@gmail.com">iamtrojan.com@gmail.com</a>.
          </p>
        </div>
        <div style="background:#000; padding:15px; text-align:center; color:#ccc;">
          &copy; ${new Date().getFullYear()} iam÷TroJan | Secure Today, Lead Tomorrow.
        </div>
      </div>
    </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
