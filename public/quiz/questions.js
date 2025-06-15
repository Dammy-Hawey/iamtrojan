// questions.js
const allCyberQuestions = {
  beginner: [
    {
      q: "1. What does HTTPS stand for?",
      options: [
        "Hyper Transfer Protocol Secure",
        "High Transfer Protocol Speed",
        "HyperText Transfer Protocol Secure",
        "Hack Transfer Protocol Shield"
      ],
      answer: "HyperText Transfer Protocol Secure"
    },
    {
      q: "2. Which of the following is a strong password?",
      options: ["123456", "admin", "P@ssw0rd!", "qwerty"],
      answer: "P@ssw0rd!"
    },
    // ...add all beginner questions here
    {
    q: "3. What is cybersecurity?",
    options: [
      "A way to secure your smartphone",
      "The practice of protecting systems and networks from attacks",
      "Using antivirus only",
      "Resetting your password often"
    ],
    answer: "The practice of protecting systems and networks from attacks"
  },
  {
    q: "4. Which of the following is an example of a strong password?",
    options: [
      "123456",
      "password",
      "Welcome123",
      "L@yer$2024!"
    ],
    answer: "L@yer$2024!"
  },
  {
    q: "5. What does the lock icon in a web browser’s address bar mean?",
    options: [
      "Site is under maintenance",
      "Connection is secure using HTTPS",
      "The website is trusted by the government",
      "There are no images on the website"
    ],
    answer: "Connection is secure using HTTPS"
  },
  {
    q: "6. What is phishing?",
    options: [
      "A type of fish",
      "A hacking technique using fake emails or websites",
      "A game about catching malware",
      "A device security setting"
    ],
    answer: "A hacking technique using fake emails or websites"
  },
  {
    q: "7. Which of these is a good cybersecurity habit?",
    options: [
      "Writing passwords on paper",
      "Using the same password everywhere",
      "Installing software from trusted sources",
      "Clicking all links in emails"
    ],
    answer: "Installing software from trusted sources"
  },
  {
    q: "8. What is malware?",
    options: [
      "A secure system tool",
      "An antivirus update",
      "A type of malicious software",
      "A data compression format"
    ],
    answer: "A type of malicious software"
  },
  {
    q: "9. Which device is vulnerable to cyberattacks?",
    options: [
      "Smartphones",
      "Computers",
      "IoT Devices (like Smart TVs)",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    q: "10. What should you do when you get a suspicious email attachment?",
    options: [
      "Open it and check",
      "Delete it or report as spam",
      "Forward it to a friend",
      "Download it later"
    ],
    answer: "Delete it or report as spam"
  },
  {
    q: "11. What is the safest place to store your password?",
    options: [
      "In your notebook",
      "Inside your email inbox",
      "In a password manager",
      "On a sticky note"
    ],
    answer: "In a password manager"
  },
  {
    q: "12. What does 2FA mean?",
    options: [
      "Two-Firewall Access",
      "Two-Factor Authentication",
      "Twice-Formed Application",
      "Two-Faced Authorization"
    ],
    answer: "Two-Factor Authentication"
  },

  // ➕ Now continuing from 11 to 40...

  {
    q: "13. What does antivirus software do?",
    options: [
      "Makes your computer faster",
      "Protects against viruses and malware",
      "Cleans your desktop",
      "Improves internet speed"
    ],
    answer: "Protects against viruses and malware"
  },
  {
    q: "14. What is the main goal of a firewall?",
    options: [
      "Speed up the internet",
      "Filter network traffic and block threats",
      "Encrypt hard drives",
      "Back up files"
    ],
    answer: "Filter network traffic and block threats"
  },
  {
    q: "15. What’s an example of personal identifiable information (PII)?",
    options: [
      "Your favorite color",
      "Your dog’s name",
      "Your phone number",
      "The movies you watch"
    ],
    answer: "Your phone number"
  },
  {
    q: "16. Which is a secure way to connect to a public Wi-Fi?",
    options: [
      "Connect without password",
      "Use VPN while connected",
      "Always accept terms and conditions",
      "Disable firewall"
    ],
    answer: "Use VPN while connected"
  },
  {
    q: "17. What’s the best way to keep your software safe?",
    options: [
      "Update regularly",
      "Never update",
      "Use old versions",
      "Install cracked versions"
    ],
    answer: "Update regularly"
  },
  {
    q: "18. Which of the following can protect you from phishing?",
    options: [
      "Using dark mode",
      "Enabling pop-ups",
      "Double-checking sender email",
      "Downloading attachments"
    ],
    answer: "Double-checking sender email"
  },
  {
    q: "19. What is ransomware?",
    options: [
      "A type of cleaning software",
      "A harmless application",
      "A malware that locks files for ransom",
      "A password manager"
    ],
    answer: "A malware that locks files for ransom"
  },
  {
    q: "20. If a site says 'Not Secure' in the browser, what should you do?",
    options: [
      "Enter your password anyway",
      "Ignore the warning",
      "Close the site or avoid logging in",
      "Click on ads"
    ],
    answer: "Close the site or avoid logging in"
  },
//   {
//     q: "21. Which of these is a secure password example?",
//     options: [
//       "hello123",
//       "Damola2020",
//       "adminadmin",
//       "9$Tr0j@nH@wkeye!2"
//     ],
//     answer: "9$Tr0j@nH@wkeye!2"
//   },
//   {
//     q: "22. What is a good reason to use a VPN?",
//     options: [
//       "To increase computer brightness",
//       "To access public Wi-Fi safely",
//       "To download faster",
//       "To block phone calls"
//     ],
//     answer: "To access public Wi-Fi safely"
//   },

//   // Questions 21 to 40...

//   {
//     q: "23. What is social engineering?",
//     options: [
//       "Using social media responsibly",
//       "Manipulating people to give up confidential info",
//       "Creating online profiles",
//       "Hacking using code"
//     ],
//     answer: "Manipulating people to give up confidential info"
//   },
//   {
//     q: "24. When should you change your password?",
//     options: [
//       "Every 10 years",
//       "Only when asked by friend",
//       "Regularly or after a breach",
//       "Never"
//     ],
//     answer: "Regularly or after a breach"
//   },
//   {
//     q: "25. Which of the following is NOT a cyber threat?",
//     options: [
//       "Phishing",
//       "Malware",
//       "Sunlight",
//       "Ransomware"
//     ],
//     answer: "Sunlight"
//   },
//   {
//     q: "26. What is a good way to verify a suspicious email?",
//     options: [
//       "Ask your friends",
//       "Click the link",
//       "Call the sender using official contact",
//       "Reply to ask for more info"
//     ],
//     answer: "Call the sender using official contact"
//   },
//   {
//     q: "27. Cookies on a website are used to:",
//     options: [
//       "Track your browsing activity",
//       "Cook online meals",
//       "Boost your PC speed",
//       "Clean your browser"
//     ],
//     answer: "Track your browsing activity"
//   },
//   {
//     q: "28. Which app type is often targeted in phishing scams?",
//     options: [
//       "Gaming apps",
//       "Email apps",
//       "Drawing apps",
//       "Weather apps"
//     ],
//     answer: "Email apps"
//   },
//   {
//     q: "29. Why is using 'admin' as a username risky?",
//     options: [
//       "It's too short",
//       "It's a default and common target",
//       "It's hard to pronounce",
//       "It uses 5 characters"
//     ],
//     answer: "It's a default and common target"
//   },
//   {
//     q: "30. A secure password should contain:",
//     options: [
//       "Only letters",
//       "Only numbers",
//       "Symbols, numbers, and upper/lower case letters",
//       "Your date of birth"
//     ],
//     answer: "Symbols, numbers, and upper/lower case letters"
//   },
//   {
//     q: "31. A keylogger is:",
//     options: [
//       "A digital keyboard",
//       "Software that records keystrokes",
//       "A music player",
//       "A typing tutor"
//     ],
//     answer: "Software that records keystrokes"
//   },
//   {
//     q: "32. The best way to identify a secure website is:",
//     options: [
//       "It loads fast",
//       "It uses bold colors",
//       "It starts with https:// and shows a padlock icon",
//       "It has images"
//     ],
//     answer: "It starts with https:// and shows a padlock icon"
//   }
  ],

  intermediate: [
    {
      q: "1. What port is used by HTTPS?",
      options: ["443", "80", "21", "22"],
      answer: "443"
    },
    {
      q: "2. Which tool is commonly used for packet capturing?",
      options: ["Wireshark", "Nmap", "Burp Suite", "Nikto"],
      answer: "Wireshark"
    },
    // ...add all intermediate questions here
    {
    q: "3. What does a firewall do in a network?",
    options: [
      "Boost internet speed",
      "Filters traffic and blocks unauthorized access",
      "Cleans your computer",
      "Provides antivirus scanning"
    ],
    answer: "Filters traffic and blocks unauthorized access"
  },
  {
    q: "4. Which port is commonly used for HTTPS traffic?",
    options: [
      "20",
      "80",
      "443",
      "22"
    ],
    answer: "443"
  },
  {
    q: "5. What is the principle of least privilege?",
    options: [
      "Giving users maximum access for efficiency",
      "Granting users only the access necessary to perform their jobs",
      "Blocking all users",
      "Sharing passwords to increase trust"
    ],
    answer: "Granting users only the access necessary to perform their jobs"
  },
  {
    q: "6. What is the function of a VPN?",
    options: [
      "To block websites",
      "To create a secure tunnel over an insecure network",
      "To increase download speed",
      "To manage passwords"
    ],
    answer: "To create a secure tunnel over an insecure network"
  },
  {
    q: "7. What does hashing ensure?",
    options: [
      "Data is encrypted and reversible",
      "Data integrity and non-reversibility",
      "Faster internet",
      "Higher download speed"
    ],
    answer: "Data integrity and non-reversibility"
  },
  {
    q: "8. Which algorithm is a hashing function?",
    options: [
      "AES",
      "RSA",
      "SHA-256",
      "3DES"
    ],
    answer: "SHA-256"
  },
  {
    q: "9. Which of these is a social engineering technique?",
    options: [
      "SQL injection",
      "Brute force",
      "Phishing",
      "Sniffing"
    ],
    answer: "Phishing"
  },
  {
    q: "10. A man-in-the-middle (MITM) attack:",
    options: [
      "Intercepts communication between two parties",
      "Shuts down a server",
      "Floods a network",
      "Encrypts user data"
    ],
    answer: "Intercepts communication between two parties"
  },
  {
    q: "11. What is a honeypot?",
    options: [
      "A secure login system",
      "A deceptive system meant to lure attackers",
      "A data warehouse",
      "A browser extension"
    ],
    answer: "A deceptive system meant to lure attackers"
  },
  {
    q: "12. What’s the role of a Security Information and Event Management (SIEM) system?",
    options: [
      "Backup files",
      "Encrypt user data",
      "Monitor, detect, and respond to security incidents",
      "Clean up malware"
    ],
    answer: "Monitor, detect, and respond to security incidents"
  },
  {
    q: "13. What is brute force attack?",
    options: [
      "Trying multiple passwords until one works",
      "Using fake emails to attack",
      "Guessing usernames only",
      "Injecting SQL code into websites"
    ],
    answer: "Trying multiple passwords until one works"
  },
  {
    q: "14. What is penetration testing?",
    options: [
      "Analyzing user interface",
      "Testing how vulnerable a system is to attack",
      "Installing new antivirus",
      "Writing Python scripts"
    ],
    answer: "Testing how vulnerable a system is to attack"
  },
  {
    q: "15. Which of these is NOT a common access control model?",
    options: [
      "MAC (Mandatory Access Control)",
      "DAC (Discretionary Access Control)",
      "PAC (Physical Access Control)",
      "RBAC (Role-Based Access Control)"
    ],
    answer: "PAC (Physical Access Control)"
  },
  {
    q: "16. In cybersecurity, what is CIA triad?",
    options: [
      "Cyber, Intelligence, Access",
      "Confidentiality, Integrity, Availability",
      "Code, Infrastructure, Application",
      "Connect, Inspect, Archive"
    ],
    answer: "Confidentiality, Integrity, Availability"
  },
  {
    q: "17. Why are default passwords dangerous?",
    options: [
      "They’re long",
      "They’re encrypted",
      "They’re known to attackers",
      "They block updates"
    ],
    answer: "They’re known to attackers"
  },
  {
    q: "18. What is the function of a DDoS attack?",
    options: [
      "Steal files from a server",
      "Make systems unavailable by flooding traffic",
      "Encrypt passwords",
      "Update software remotely"
    ],
    answer: "Make systems unavailable by flooding traffic"
  },
  {
    q: "19. Which of the following is a valid authentication factor?",
    options: [
      "Something you eat",
      "Something you know",
      "Something you imagine",
      "Something you download"
    ],
    answer: "Something you know"
  },
  {
    q: "20. What does the term 'zero-day vulnerability' mean?",
    options: [
      "A vulnerability with known patch",
      "A public bug",
      "A newly discovered vulnerability with no fix yet",
      "A type of firewall rule"
    ],
    answer: "A newly discovered vulnerability with no fix yet"
  },
  {
    q: "21. What does endpoint protection target?",
    options: [
      "Only web apps",
      "Only network devices",
      "Individual user devices like laptops and phones",
      "Server-side applications"
    ],
    answer: "Individual user devices like laptops and phones"
  },
  {
    q: "22. Which of the following is an example of malware?",
    options: [
      "Firewall",
      "Trojan horse",
      "Patch file",
      "Virtual machine"
    ],
    answer: "Trojan horse"
  },
  {
    q: "23. How does ransomware typically spread?",
    options: [
      "Physical USB only",
      "Through water",
      "Phishing emails and exploit kits",
      "Online games"
    ],
    answer: "Phishing emails and exploit kits"
  },
  {
    q: "24. Which protocol is used to securely transfer files?",
    options: [
      "FTP",
      "SFTP",
      "HTTP",
      "SMTP"
    ],
    answer: "SFTP"
  },
  {
    q: "25. What is spoofing?",
    options: [
      "Replacing hardware",
      "Pretending to be another device or user",
      "Installing malware",
      "Hiding files"
    ],
    answer: "Pretending to be another device or user"
  },
  {
    q: "26. Which tool helps monitor network traffic?",
    options: [
      "Wireshark",
      "Photoshop",
      "PowerPoint",
      "VS Code"
    ],
    answer: "Wireshark"
  },
  {
    q: "27. Which type of scan checks for vulnerabilities?",
    options: [
      "Disk defragment",
      "Network ping",
      "Vulnerability scan",
      "Zoom test"
    ],
    answer: "Vulnerability scan"
  },
  {
    q: "28. What’s a botnet?",
    options: [
      "An encrypted file",
      "A browser plugin",
      "A network of compromised computers",
      "A machine learning model"
    ],
    answer: "A network of compromised computers"
  },
  {
    q: "29. What’s multi-factor authentication?",
    options: [
      "Using multiple usernames",
      "Combining multiple passwords",
      "Using more than one method to verify identity",
      "Creating multiple accounts"
    ],
    answer: "Using more than one method to verify identity"
  },
  {
    q: "30. Which is a way to prevent brute-force attacks?",
    options: [
      "Unlimited login attempts",
      "Using strong rate limits and CAPTCHA",
      "Enabling popups",
      "Using shared passwords"
    ],
    answer: "Using strong rate limits and CAPTCHA"
  },
  {
    q: "31. What is the purpose of access logs?",
    options: [
      "Track user activity and detect anomalies",
      "Speed up your website",
      "Compress system files",
      "Increase memory space"
    ],
    answer: "Track user activity and detect anomalies"
  },
  {
    q: "32. What does a patch do?",
    options: [
      "Decorates your website",
      "Fixes security vulnerabilities in software",
      "Deletes old files",
      "Changes your screen color"
    ],
    answer: "Fixes security vulnerabilities in software"
  }
  ],

  advanced: [
    
    // ...add all advanced questions here
    {
    q: "1. What is the purpose of a buffer overflow exploit?",
    options: [
      "To speed up memory usage",
      "To crash the system intentionally",
      "To inject malicious code by overwriting memory",
      "To compress data packets"
    ],
    answer: "To inject malicious code by overwriting memory"
  },
  {
    q: "2. What is the difference between symmetric and asymmetric encryption?",
    options: [
      "Symmetric uses two keys, asymmetric uses one",
      "Symmetric uses public key only",
      "Asymmetric uses public/private key pairs; symmetric uses one key",
      "They are identical in function"
    ],
    answer: "Asymmetric uses public/private key pairs; symmetric uses one key"
  },
  {
    q: "3. What is the role of a certificate authority (CA)?",
    options: [
      "Store credentials in memory",
      "Authenticate IP addresses",
      "Issue and verify digital certificates",
      "Scan open ports"
    ],
    answer: "Issue and verify digital certificates"
  },
  {
    q: "4. What is LDAP used for in security?",
    options: [
      "Firewall policy setting",
      "Managing files",
      "Directory access and authentication",
      "Blocking IPs"
    ],
    answer: "Directory access and authentication"
  },
  {
    q: "5. What does the CVE system provide?",
    options: [
      "Vulnerability tracking and identifiers",
      "User login logs",
      "Data encryption",
      "Coding standards"
    ],
    answer: "Vulnerability tracking and identifiers"
  },
  {
    q: "6. What type of attack is Kerberoasting?",
    options: [
      "Phishing via Kerberos",
      "Cracking encrypted Kerberos service tickets",
      "Flooding Kerberos with requests",
      "Man-in-the-middle on ticket granting"
    ],
    answer: "Cracking encrypted Kerberos service tickets"
  },
  {
    q: "7. What is the purpose of a reverse shell?",
    options: [
      "To protect network logs",
      "To allow attacker control from inside out",
      "To shut down a web server",
      "To install antivirus"
    ],
    answer: "To allow attacker control from inside out"
  },
  {
    q: "8. What is DNS spoofing?",
    options: [
      "Replacing a domain’s IP with a fake one",
      "Clearing browser history",
      "Encrypting DNS queries",
      "Blocking web addresses"
    ],
    answer: "Replacing a domain’s IP with a fake one"
  },
  {
    q: "9. What does the tool 'Burp Suite' primarily do?",
    options: [
      "Manages server logs",
      "Intercepts and manipulates HTTP/S traffic for security testing",
      "Scans malware",
      "Compresses web files"
    ],
    answer: "Intercepts and manipulates HTTP/S traffic for security testing"
  },
  {
    q: "10. Which hashing algorithm is now considered broken and insecure?",
    options: [
      "SHA-512",
      "SHA-256",
      "SHA-1",
      "Blake2"
    ],
    answer: "SHA-1"
  },
  {
    q: "11. What does EDR stand for in cybersecurity?",
    options: [
      "External Device Reboot",
      "Endpoint Detection and Response",
      "Encryption Data Reset",
      "Edge Domain Routing"
    ],
    answer: "Endpoint Detection and Response"
  },
  {
    q: "12. Which port does DNS run on by default?",
    options: [
      "25",
      "53",
      "110",
      "443"
    ],
    answer: "53"
  },
  {
    q: "13. What is an SSRF vulnerability?",
    options: [
      "Server-Side Request Forgery",
      "Session Spoofing and Replay Function",
      "Static Script Routing Filter",
      "Secure Server Relay Framework"
    ],
    answer: "Server-Side Request Forgery"
  },
  {
    q: "14. What does the OWASP Top 10 list provide?",
    options: [
      "Encryption standards",
      "Common network ports",
      "Top web app vulnerabilities",
      "ISO policies"
    ],
    answer: "Top web app vulnerabilities"
  },
  {
    q: "15. What does the command `nmap -sS` perform?",
    options: [
      "A full UDP scan",
      "A stealth TCP SYN scan",
      "A brute force attempt",
      "A ping flood"
    ],
    answer: "A stealth TCP SYN scan"
  },
  {
    q: "16. What is a logic bomb?",
    options: [
      "Software that deletes logs",
      "Malicious code that activates when specific conditions are met",
      "A backup software",
      "A memory cleaner"
    ],
    answer: "Malicious code that activates when specific conditions are met"
  },
  {
    q: "17. What is the purpose of data exfiltration?",
    options: [
      "Importing large files",
      "Stealing and transmitting data from a target system",
      "Encrypting sensitive data",
      "Generating certificates"
    ],
    answer: "Stealing and transmitting data from a target system"
  },
  {
    q: "18. What kind of malware disguises itself as a legitimate program?",
    options: [
      "Rootkit",
      "Worm",
      "Trojan",
      "Backdoor"
    ],
    answer: "Trojan"
  },
  {
    q: "19. What tool is often used for wireless packet sniffing?",
    options: [
      "Nikto",
      "Hydra",
      "Aircrack-ng",
      "OpenVAS"
    ],
    answer: "Aircrack-ng"
  },
  {
    q: "20. Which HTTP header helps prevent cross-site scripting (XSS)?",
    options: [
      "Content-Type",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Content-Security-Policy"
    ],
    answer: "Content-Security-Policy"
  },
  {
    q: "21. What is a rainbow table used for?",
    options: [
      "Encrypting data",
      "Speeding up DNS",
      "Cracking hashed passwords",
      "Managing keys"
    ],
    answer: "Cracking hashed passwords"
  },
  {
    q: "22. What is the main purpose of a DMZ in network architecture?",
    options: [
      "To isolate internal systems from public-facing services",
      "To backup files",
      "To allow unrestricted access",
      "To load-balance requests"
    ],
    answer: "To isolate internal systems from public-facing services"
  },
  {
    q: "23. What is the key benefit of asymmetric encryption?",
    options: [
      "Speed",
      "One key usage",
      "Key exchange without sharing secret keys",
      "Less storage use"
    ],
    answer: "Key exchange without sharing secret keys"
  },
  {
    q: "24. What is a side-channel attack?",
    options: [
      "An attack using encrypted messages",
      "Using unintended physical signals like timing or power usage to gather data",
      "Scanning firewalls",
      "Bypassing SQL filters"
    ],
    answer: "Using unintended physical signals like timing or power usage to gather data"
  },
  {
    q: "25. What is one use of a sandbox in malware analysis?",
    options: [
      "Storing logs",
      "Running suspicious files safely in an isolated environment",
      "Encrypting malware",
      "Connecting to VPN"
    ],
    answer: "Running suspicious files safely in an isolated environment"
  },
  {
    q: "26. What does TLS provide?",
    options: [
      "Secure, encrypted communication over the internet",
      "Data compression",
      "Firewall bypass",
      "Two-factor authentication"
    ],
    answer: "Secure, encrypted communication over the internet"
  },
  {
    q: "27. What is an APT (Advanced Persistent Threat)?",
    options: [
      "A quick hacking method",
      "A temporary error in the system",
      "A prolonged and targeted cyberattack",
      "A DDoS tool"
    ],
    answer: "A prolonged and targeted cyberattack"
  },
  {
    q: "28. What does tokenization do?",
    options: [
      "Converts data into fake coins",
      "Hides sensitive data by replacing it with random tokens",
      "Encrypts with keys",
      "Deletes passwords"
    ],
    answer: "Hides sensitive data by replacing it with random tokens"
  },
  {
    q: "29. What does the command `chmod 700 file.txt` do?",
    options: [
      "Allows read/write/execute for everyone",
      "Read/write for group only",
      "Full access to owner only",
      "Deletes the file"
    ],
    answer: "Full access to owner only"
  },
  {
    q: "30. What is spear phishing?",
    options: [
      "Generic spam message",
      "Phishing targeted at a specific individual or organization",
      "Physical card fraud",
      "Bank trojan software"
    ],
    answer: "Phishing targeted at a specific individual or organization"
  },
  {
      q: "31. What is the primary weakness exploited by buffer overflow attacks?",
      options: [
        "Authentication", 
        "Authorization", 
        "Memory management", 
        "Encryption"
    ],
      answer: "Memory management"
    },
    {
      q: "32. Which protocol is NOT encrypted by default?",
      options: [
        "HTTPS", 
        "SSH", 
        "Telnet", 
        "SFTP"
    ],
      answer: "Telnet"
    },
  ]
};
