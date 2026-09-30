const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
    origin: [
        'https://daic-tech-website.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173'
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite Database
const db = new Database(path.join(__dirname, 'database.sqlite'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT DEFAULT 'pending'
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    message TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    resume_filename TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

// Create default admin user if not exists
const defaultAdmin = db.prepare('SELECT * FROM admin_users WHERE email = ?').get('admin@daictech.com');
if (!defaultAdmin) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const adminId = uuidv4();
  db.prepare('INSERT INTO admin_users (id, username, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(adminId, 'admin', 'admin@daictech.com', hashedPassword, new Date().toISOString());
  console.log('Default admin user created: admin@daictech.com / admin123');
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// API Routes

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Create contact record in database
    const contactId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO contacts (id, first_name, last_name, email, message, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(contactId, firstName, lastName, email, message, new Date().toISOString(), 'pending');

    // TODO: Send email notification using SendGrid/Mailgun
    console.log('Contact form submission:', { contactId, firstName, lastName, email });

    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      contactId
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Career Application Endpoint
app.post('/api/careers/apply', upload.single('resume'), (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, message } = req.body;
    const resumeFile = req.file;

    // Validation
    if (!firstName || !lastName || !email || !position || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Create application record in database
    const applicationId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO job_applications (id, first_name, last_name, email, phone, position, message, resume_url, resume_filename, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      applicationId,
      firstName,
      lastName,
      email,
      phone || '',
      position,
      message,
      `/uploads/${resumeFile.filename}`,
      resumeFile.originalname,
      'pending',
      new Date().toISOString()
    );

    // TODO: Send email notification using SendGrid/Mailgun
    console.log('Job application submission:', { applicationId, firstName, lastName, email, position });

    res.status(200).json({
      success: true,
      message: 'Thank you for your application. We will review it and get back to you within 24-48 hours.',
      applicationId
    });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Admin Authentication Endpoints

// Login
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const admin = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(email);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Admin Dashboard Endpoints

// Get all contacts
app.get('/api/admin/contacts', verifyToken, (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.status(200).json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Update contact status
app.put('/api/admin/contacts/:id', verifyToken, (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const stmt = db.prepare('UPDATE contacts SET status = ? WHERE id = ?');
    stmt.run(status, id);

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully'
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Delete contact
app.delete('/api/admin/contacts/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;

    const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
    stmt.run(id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Get all job applications
app.get('/api/admin/applications', verifyToken, (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM job_applications ORDER BY created_at DESC').all();
    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Update application status
app.put('/api/admin/applications/:id', verifyToken, (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const stmt = db.prepare('UPDATE job_applications SET status = ? WHERE id = ?');
    stmt.run(status, id);

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully'
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Delete application
app.delete('/api/admin/applications/:id', verifyToken, (req, res) => {
  try {
    const { id } = req.params;

    // Get application to delete resume file
    const application = db.prepare('SELECT * FROM job_applications WHERE id = ?').get(id);
    if (application) {
      const resumePath = path.join(__dirname, application.resume_url);
      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }
    }

    const stmt = db.prepare('DELETE FROM job_applications WHERE id = ?');
    stmt.run(id);

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Get dashboard stats
app.get('/api/admin/stats', verifyToken, (req, res) => {
  try {
    const contactCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;
    const applicationCount = db.prepare('SELECT COUNT(*) as count FROM job_applications').get().count;
    const pendingContacts = db.prepare('SELECT COUNT(*) as count FROM contacts WHERE status = ?').get('pending').count;
    const pendingApplications = db.prepare('SELECT COUNT(*) as count FROM job_applications WHERE status = ?').get('pending').count;

    res.status(200).json({
      success: true,
      stats: {
        contactCount,
        applicationCount,
        pendingContacts,
        pendingApplications
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Get recent activity
app.get('/api/admin/recent-activity', verifyToken, (req, res) => {
  try {
    const recentContacts = db.prepare(`
      SELECT 'contact' as type, first_name, last_name, email, created_at, status
      FROM contacts
      ORDER BY created_at DESC
      LIMIT 5
    `).all();

    const recentApplications = db.prepare(`
      SELECT 'application' as type, first_name, last_name, email, position, created_at, status
      FROM job_applications
      ORDER BY created_at DESC
      LIMIT 5
    `).all();

    // Combine and sort by date
    const allActivity = [...recentContacts, ...recentApplications]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      activity: allActivity
    });
  } catch (error) {
    console.error('Get recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
