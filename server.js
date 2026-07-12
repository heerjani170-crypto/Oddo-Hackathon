import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assetflow';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    seedInitialEmployees();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['Admin', 'Asset Manager', 'Department Head', 'Employee'] 
  },
  status: { type: String, default: 'Active' },
  customFields: { type: Map, of: String, default: {} }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Initial Employee Seeding
const INITIAL_EMPLOYEES = [
  { id: 'EMP-100', name: 'Alex Johnson', email: 'admin@assetflow.com', department: 'Engineering', role: 'Admin', status: 'Active' },
  { id: 'EMP-101', name: 'Alice Vance', email: 'alice@assetflow.com', department: 'Engineering', role: 'Department Head', status: 'Active' },
  { id: 'EMP-102', name: 'Bob Dylan', email: 'bob@assetflow.com', department: 'Product Management', role: 'Department Head', status: 'Active' },
  { id: 'EMP-103', name: 'Raj Kumar', email: 'raj@assetflow.com', department: 'Engineering', role: 'Employee', status: 'Active' },
  { id: 'EMP-104', name: 'Priya Sharma', email: 'priya@assetflow.com', department: 'Product Management', role: 'Employee', status: 'Active' },
  { id: 'EMP-105', name: 'Devon Miller', email: 'devon@assetflow.com', department: 'Hardware & Infrastructure', role: 'Asset Manager', status: 'Active' },
  { id: 'EMP-106', name: 'Sarah Connor', email: 'sarah@assetflow.com', department: 'Quality Assurance', role: 'Employee', status: 'Active' }
];

async function seedInitialEmployees() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial employees database...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      const seededUsers = INITIAL_EMPLOYEES.map(emp => ({
        ...emp,
        password: hashedPassword
      }));
      
      await User.insertMany(seededUsers);
      console.log('Database seeding completed successfully. Default password is "password123".');
    } else {
      console.log('Database already has users. Skipping seeding.');
    }
  } catch (error) {
    console.error('Failed to seed database:', error.message);
  }
}

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, department, role, customFields } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate EMP ID
    const count = await User.countDocuments();
    const empId = `EMP-${100 + count + 1}`;
    
    // Create new User
    const newUser = new User({
      id: empId,
      name,
      email,
      password: hashedPassword,
      department: department || 'Engineering',
      role: role || 'Employee',
      customFields: customFields || {}
    });
    
    await newUser.save();
    
    res.status(201).json({
      message: 'Signup successful!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        department: newUser.department,
        role: newUser.role,
        status: newUser.status,
        customFields: newUser.customFields
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user.', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password.' });
    }
    
    // Match Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    
    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        role: user.role,
        status: user.status,
        customFields: user.customFields
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user.', error: error.message });
  }
});

// Employee Management Routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await User.find({}, '-password');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees.', error: error.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, department, role, status, customFields } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Employee with this email already exists.' });
    }
    
    const defaultHashedPassword = await bcrypt.hash('password123', 10);
    const count = await User.countDocuments();
    const empId = `EMP-${100 + count + 1}`;
    
    const newEmp = new User({
      id: empId,
      name,
      email,
      password: defaultHashedPassword,
      department: department || 'Engineering',
      role: role || 'Employee',
      status: status || 'Active',
      customFields: customFields || {}
    });
    
    await newEmp.save();
    
    res.status(201).json({
      id: newEmp.id,
      name: newEmp.name,
      email: newEmp.email,
      department: newEmp.department,
      role: newEmp.role,
      status: newEmp.status,
      customFields: newEmp.customFields
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee.', error: error.message });
  }
});

// Promoting Role API endpoint
app.put('/api/employees/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findOneAndUpdate({ id: req.params.id }, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee role.', error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
