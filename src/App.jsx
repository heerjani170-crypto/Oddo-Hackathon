import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Layers, 
  Users, 
  FolderTree, 
  UserCheck, 
  CalendarDays, 
  Wrench, 
  ClipboardCheck, 
  BarChart3, 
  History, 
  Bell, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRightLeft, 
  User, 
  Clock, 
  MapPin, 
  Download, 
  ShieldAlert 
} from 'lucide-react';

// ==========================================
// PRE-SEEDED MOCK DATA
// ==========================================

const INITIAL_DEPARTMENTS = [
  { id: 'DEP-1', name: 'Engineering', head: 'Alice Vance', parent: null, status: 'Active' },
  { id: 'DEP-2', name: 'Product Management', head: 'Bob Dylan', parent: null, status: 'Active' },
  { id: 'DEP-3', name: 'Hardware & Infrastructure', head: 'Charlie Brown', parent: 'DEP-1', status: 'Active' },
  { id: 'DEP-4', name: 'Design Studio', head: 'Diana Prince', parent: null, status: 'Active' },
  { id: 'DEP-5', name: 'Quality Assurance', head: 'Ethan Hunt', parent: 'DEP-1', status: 'Inactive' }
];

const INITIAL_CATEGORIES = [
  { id: 'CAT-1', name: 'Electronics', attributes: ['Warranty Period (Months)', 'Processor', 'RAM (GB)'] },
  { id: 'CAT-2', name: 'Furniture', attributes: ['Material', 'Ergonomic Certification'] },
  { id: 'CAT-3', name: 'Vehicles', attributes: ['License Plate', 'Last Service Date', 'Insurance Expiry'] },
  { id: 'CAT-4', name: 'Audio/Video Equipment', attributes: ['Resolution', 'Output Power'] }
];

const INITIAL_EMPLOYEES = [
  { id: 'EMP-101', name: 'Alice Vance', email: 'alice@assetflow.com', department: 'Engineering', role: 'Department Head', status: 'Active' },
  { id: 'EMP-102', name: 'Bob Dylan', email: 'bob@assetflow.com', department: 'Product Management', role: 'Department Head', status: 'Active' },
  { id: 'EMP-103', name: 'Raj Kumar', email: 'raj@assetflow.com', department: 'Engineering', role: 'Employee', status: 'Active' },
  { id: 'EMP-104', name: 'Priya Sharma', email: 'priya@assetflow.com', department: 'Product Management', role: 'Employee', status: 'Active' },
  { id: 'EMP-105', name: 'Devon Miller', email: 'devon@assetflow.com', department: 'Hardware & Infrastructure', role: 'Asset Manager', status: 'Active' },
  { id: 'EMP-106', name: 'Sarah Connor', email: 'sarah@assetflow.com', department: 'Quality Assurance', role: 'Employee', status: 'Active' }
];

const INITIAL_ASSETS = [
  { 
    tag: 'AF-0001', 
    name: 'MacBook Pro 16"', 
    category: 'Electronics', 
    serial: 'S/N-99882233', 
    cost: 2499, 
    date: '2025-01-15', 
    condition: 'Excellent', 
    location: 'Main HQ - Floor 3', 
    status: 'Allocated', 
    shared: false,
    assignedTo: 'Priya Sharma',
    expectedReturn: '2026-08-01',
    history: [
      { date: '2025-01-15', action: 'Asset Registered', user: 'Devon Miller' },
      { date: '2025-01-20', action: 'Allocated to Priya Sharma', user: 'Devon Miller' }
    ]
  },
  { 
    tag: 'AF-0002', 
    name: 'Dell UltraSharp 32" Monitor', 
    category: 'Electronics', 
    serial: 'S/N-44551122', 
    cost: 899, 
    date: '2025-02-10', 
    condition: 'Good', 
    location: 'Main HQ - Floor 3', 
    status: 'Available', 
    shared: false,
    history: [
      { date: '2025-02-10', action: 'Asset Registered', user: 'Devon Miller' }
    ]
  },
  { 
    tag: 'AF-0003', 
    name: 'Conference Room Alpha - Video Bar', 
    category: 'Audio/Video Equipment', 
    serial: 'S/N-AV-9911', 
    cost: 1500, 
    date: '2025-03-01', 
    condition: 'Good', 
    location: 'HQ Conference Room Alpha', 
    status: 'Reserved', 
    shared: true,
    history: [
      { date: '2025-03-01', action: 'Asset Registered', user: 'Devon Miller' }
    ]
  },
  { 
    tag: 'AF-0004', 
    name: 'Ergonomic Desk Chair V2', 
    category: 'Furniture', 
    serial: 'S/N-CH-5544', 
    cost: 450, 
    date: '2024-11-20', 
    condition: 'Fair', 
    location: 'Main HQ - Floor 1', 
    status: 'Available', 
    shared: false,
    history: [
      { date: '2024-11-20', action: 'Asset Registered', user: 'Devon Miller' },
      { date: '2025-05-10', action: 'Returned from Sarah Connor', user: 'Devon Miller' }
    ]
  },
  { 
    tag: 'AF-0005', 
    name: 'HQ Shuttle Van', 
    category: 'Vehicles', 
    serial: 'S/N-VH-8829', 
    cost: 35000, 
    date: '2024-05-15', 
    condition: 'Good', 
    location: 'Basement Parking Slot 4', 
    status: 'Available', 
    shared: true,
    history: [
      { date: '2024-05-15', action: 'Asset Registered', user: 'Devon Miller' }
    ]
  },
  { 
    tag: 'AF-0006', 
    name: 'ThinkPad X1 Carbon', 
    category: 'Electronics', 
    serial: 'S/N-99112233', 
    cost: 1800, 
    date: '2025-01-10', 
    condition: 'Good', 
    location: 'Main HQ - Floor 2', 
    status: 'Under Maintenance', 
    shared: false,
    assignedTo: 'Raj Kumar',
    expectedReturn: '2026-07-01', // Past date relative to local time (July 12, 2026) -> Overdue!
    history: [
      { date: '2025-01-10', action: 'Asset Registered', user: 'Devon Miller' },
      { date: '2025-01-15', action: 'Allocated to Raj Kumar', user: 'Devon Miller' },
      { date: '2026-07-10', action: 'Maintenance Ticket #1 Raised', user: 'Raj Kumar' }
    ]
  }
];

const INITIAL_TRANSFERS = [
  { id: 'TX-101', assetTag: 'AF-0001', currentHolder: 'Priya Sharma', requestedBy: 'Raj Kumar', reason: 'High-performance testing project', status: 'Pending Approval' }
];

const INITIAL_BOOKINGS = [
  { id: 'BK-101', resourceTag: 'AF-0003', resourceName: 'Conference Room Alpha - Video Bar', user: 'Bob Dylan', startTime: '09:00', endTime: '10:00', date: '2026-07-12', status: 'Upcoming' },
  { id: 'BK-102', resourceTag: 'AF-0005', resourceName: 'HQ Shuttle Van', user: 'Alice Vance', startTime: '11:00', endTime: '13:00', date: '2026-07-12', status: 'Ongoing' }
];

const INITIAL_MAINTENANCE = [
  { id: 'MT-101', assetTag: 'AF-0006', assetName: 'ThinkPad X1 Carbon', description: 'Screen flickering intensely during zoom calls', priority: 'High', status: 'Under Review', requester: 'Raj Kumar', technician: 'Pending Assignee' }
];

const INITIAL_AUDITS = [
  { 
    id: 'AD-201', 
    name: 'Q3 Electronics Audit - HQ Floor 3', 
    scope: 'Electronics', 
    date: '2026-07-15', 
    auditor: 'Devon Miller', 
    status: 'In Progress', 
    results: {
      'AF-0001': 'Verified',
      'AF-0002': 'Pending Verification',
      'AF-0006': 'Pending Verification'
    },
    reportGenerated: false 
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'warning', message: 'Asset AF-0006 (ThinkPad X1 Carbon) has exceeded its expected return date of 2026-07-01!', timestamp: '2 hours ago' },
  { id: 2, type: 'info', message: 'New transfer request raised by Raj Kumar for MacBook Pro (AF-0001).', timestamp: '1 hour ago' },
  { id: 3, type: 'success', message: 'Resource Booking #101 confirmed for Room Alpha.', timestamp: '3 hours ago' }
];

export default function App() {
  // Authentication & Role Swapping State
  const [currentRole, setCurrentRole] = useState('Employee'); // Admin, Asset Manager, Department Head, Employee
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState('login'); // login, signup
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', department: 'Engineering', role: 'Employee' });
  const [signupCustomFields, setSignupCustomFields] = useState([]);

  // App Master Database State
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [maintenance, setMaintenance] = useState(INITIAL_MAINTENANCE);
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState([
    { timestamp: '12:30 PM', role: 'Asset Manager', action: 'Registered new MacBook Pro 16" (AF-0001)' },
    { timestamp: '11:15 AM', role: 'Employee', action: 'Booked HQ Shuttle Van for 11:00 AM' },
    { timestamp: '09:00 AM', role: 'Department Head', action: 'Approved quarterly budget review' }
  ]);

  // UI Panel Navigation
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, org, assets, allocation, bookings, maintenance, audit, reports, notifications

  // Modals & Temp Inputs State
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Search & Filters
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [assetFilterCategory, setAssetFilterCategory] = useState('All');
  const [assetFilterStatus, setAssetFilterStatus] = useState('All');

  // Conflict state warning
  const [allocationConflict, setAllocationConflict] = useState(null);

  // Form states
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Electronics', serial: '', cost: '', date: '', condition: 'Excellent', location: '', shared: false });
  const [newAssetCustomVals, setNewAssetCustomVals] = useState({}); // Category-specific custom attributes
  const [newAllocation, setNewAllocation] = useState({ assetTag: '', assigneeType: 'Employee', assigneeId: '', returnDate: '' });
  const [newBooking, setNewBooking] = useState({ resourceTag: '', startTime: '09:00', endTime: '10:00', date: '2026-07-12' });
  const [newMaintenance, setNewMaintenance] = useState({ assetTag: '', description: '', priority: 'Medium' });
  const [newAudit, setNewAudit] = useState({ name: '', scope: 'Electronics', date: '', auditor: 'Devon Miller' });

  // Organization form state
  const [newDept, setNewDept] = useState({ name: '', head: '', parent: '', status: 'Active' });
  const [newCat, setNewCat] = useState({ name: '', attributes: '' });
  const [orgTab, setOrgTab] = useState('departments'); // departments, categories, directory
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', department: 'Engineering', role: 'Employee', status: 'Active' });
  const [newEmployeeCustomFields, setNewEmployeeCustomFields] = useState([]); // [{ key: '', value: '' }]

  // Toast Trigger Helper
  const [toasts, setToasts] = useState([]);
  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  // Helper log action
  const logAction = (action) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivityLogs(prev => [{ timestamp: time, role: currentRole, action }, ...prev]);
  };

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees');
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(emp => ({
          id: emp.id,
          name: emp.name,
          email: emp.email,
          department: emp.department,
          role: emp.role,
          status: emp.status,
          customFields: emp.customFields || {}
        }));
        setEmployees(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch employees from backend:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  // Auth form handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setCurrentRole(data.user.role);
        setIsLoggedIn(true);
        addToast('success', `Welcome back, ${data.user.name}!`);
        
        // Redirect based on role
        if (data.user.role === 'Admin') setActiveTab('org');
        else if (data.user.role === 'Department Head') setActiveTab('deptHead');
        else if (data.user.role === 'Employee') setActiveTab('employee');
        else setActiveTab('dashboard');
      } else {
        const errData = await res.json();
        addToast('danger', errData.message || 'Invalid email or password.');
      }
    } catch (err) {
      addToast('danger', 'Cannot connect to backend server. Make sure it is running on port 5000.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const customFieldsObj = {};
    signupCustomFields.forEach(f => {
      if (f.key.trim()) {
        customFieldsObj[f.key.trim()] = f.value;
      }
    });

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
          department: signupForm.department,
          role: signupForm.role,
          customFields: customFieldsObj
        })
      });

      if (res.ok) {
        addToast('success', 'Registration successful! You can now log in.');
        setAuthView('login');
        setSignupForm({ name: '', email: '', password: '', department: 'Engineering', role: 'Employee' });
        setSignupCustomFields([]);
      } else {
        const errData = await res.json();
        addToast('danger', errData.message || 'Error during sign up.');
      }
    } catch (err) {
      addToast('danger', 'Cannot connect to backend server.');
    }
  };

  // Asset allocation submit handler
  const handleAllocate = (e) => {
    e.preventDefault();
    const targetAsset = assets.find(a => a.tag === newAllocation.assetTag);
    if (!targetAsset) {
      addToast('danger', 'Asset Tag not found.');
      return;
    }

    // CONFLICT CHECK
    if (targetAsset.status === 'Allocated') {
      const currentHolder = targetAsset.assignedTo || 'another employee';
      setAllocationConflict({
        assetTag: targetAsset.tag,
        assetName: targetAsset.name,
        currentHolder: currentHolder,
        requestedBy: employees.find(e => e.id === newAllocation.assigneeId)?.name || 'Someone'
      });
      addToast('warning', `Conflict: ${targetAsset.name} is currently allocated to ${currentHolder}`);
      return;
    }

    // Success allocation
    setAssets(prev => prev.map(a => {
      if (a.tag === targetAsset.tag) {
        const assigneeName = employees.find(emp => emp.id === newAllocation.assigneeId)?.name || newAllocation.assigneeId;
        return {
          ...a,
          status: 'Allocated',
          assignedTo: assigneeName,
          expectedReturn: newAllocation.returnDate || null,
          history: [...a.history, { date: new Date().toISOString().split('T')[0], action: `Allocated to ${assigneeName}`, user: currentUser.name }]
        };
      }
      return a;
    }));

    logAction(`Allocated asset ${targetAsset.tag} to ${newAllocation.assigneeId}`);
    addToast('success', `Successfully allocated ${targetAsset.name}!`);
    setShowAllocateModal(false);
    setNewAllocation({ assetTag: '', assigneeType: 'Employee', assigneeId: '', returnDate: '' });
  };

  // Resolve transfer request trigger
  const triggerTransferRequest = (conflict) => {
    const newTx = {
      id: `TX-${Date.now().toString().slice(-3)}`,
      assetTag: conflict.assetTag,
      currentHolder: conflict.currentHolder,
      requestedBy: conflict.requestedBy,
      reason: 'Requested due to automatic allocation transfer request',
      status: 'Pending Approval'
    };
    setTransfers(prev => [...prev, newTx]);
    setNotifications(prev => [
      { id: Date.now(), type: 'info', message: `${conflict.requestedBy} requested a transfer for ${conflict.assetName} from ${conflict.currentHolder}`, timestamp: 'Just now' },
      ...prev
    ]);
    addToast('info', 'Transfer request successfully raised!');
    setAllocationConflict(null);
    setShowAllocateModal(false);
  };

  // Approve transfer
  const handleApproveTransfer = (txId) => {
    const tx = transfers.find(t => t.id === txId);
    if (!tx) return;

    setAssets(prev => prev.map(a => {
      if (a.tag === tx.assetTag) {
        return {
          ...a,
          assignedTo: tx.requestedBy,
          status: 'Allocated',
          history: [...a.history, { date: new Date().toISOString().split('T')[0], action: `Transferred to ${tx.requestedBy} (Approved)`, user: currentUser.name }]
        };
      }
      return a;
    }));

    setTransfers(prev => prev.map(t => t.id === txId ? { ...t, status: 'Approved' } : t));
    logAction(`Approved transfer of asset ${tx.assetTag} to ${tx.requestedBy}`);
    addToast('success', 'Transfer request approved and asset reassigned.');
  };

  // Asset return handler
  const handleReturnAsset = (tag) => {
    setAssets(prev => prev.map(a => {
      if (a.tag === tag) {
        return {
          ...a,
          status: 'Available',
          assignedTo: null,
          expectedReturn: null,
          history: [...a.history, { date: new Date().toISOString().split('T')[0], action: `Returned to storage`, user: currentUser.name }]
        };
      }
      return a;
    }));
    logAction(`Returned asset ${tag} to available inventory`);
    addToast('success', `Asset ${tag} is now available.`);
  };

  // Add Asset submit
  const handleAddAsset = (e) => {
    e.preventDefault();
    const tagVal = `AF-00${assets.length + 1}`;
    const item = {
      tag: tagVal,
      name: newAsset.name,
      category: newAsset.category,
      serial: newAsset.serial || `S/N-${Math.floor(100000 + Math.random() * 900000)}`,
      cost: Number(newAsset.cost) || 0,
      date: newAsset.date || new Date().toISOString().split('T')[0],
      condition: newAsset.condition,
      location: newAsset.location || 'Central Depot',
      status: 'Available',
      shared: newAsset.shared,
      customAttributes: { ...newAssetCustomVals },
      history: [{ date: new Date().toISOString().split('T')[0], action: 'Asset Registered', user: currentUser.name }]
    };
    setAssets(prev => [item, ...prev]);
    logAction(`Registered asset ${tagVal} (${newAsset.name})`);
    addToast('success', `Successfully registered ${newAsset.name}!`);
    setShowAddAssetModal(false);
    setNewAsset({ name: '', category: 'Electronics', serial: '', cost: '', date: '', condition: 'Excellent', location: '', shared: false });
    setNewAssetCustomVals({});
  };

  // Add Employee submit
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const customFieldsObj = {};
    newEmployeeCustomFields.forEach(f => {
      if (f.key.trim()) {
        customFieldsObj[f.key.trim()] = f.value;
      }
    });

    try {
      const res = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newEmployee.name,
          email: newEmployee.email,
          department: newEmployee.department,
          role: newEmployee.role,
          status: newEmployee.status,
          customFields: customFieldsObj
        })
      });

      if (res.ok) {
        addToast('success', `Successfully registered employee ${newEmployee.name}!`);
        logAction(`Registered employee (${newEmployee.name})`);
        setNewEmployee({ name: '', email: '', department: 'Engineering', role: 'Employee', status: 'Active' });
        setNewEmployeeCustomFields([]);
        fetchEmployees();
      } else {
        const errData = await res.json();
        addToast('danger', errData.message || 'Error registering employee.');
      }
    } catch (err) {
      addToast('danger', 'Backend connection error.');
    }
  };

  // Booking submit with validation
  const handleBooking = (e) => {
    e.preventDefault();
    const targetResource = assets.find(a => a.tag === newBooking.resourceTag);
    if (!targetResource) {
      addToast('danger', 'Resource tag not found.');
      return;
    }

    // OVERLAP CHECK
    const hasOverlap = bookings.some(b => {
      if (b.resourceTag === newBooking.resourceTag && b.date === newBooking.date && b.status !== 'Cancelled') {
        const startA = parseInt(b.startTime.replace(':', ''));
        const endA = parseInt(b.endTime.replace(':', ''));
        const startB = parseInt(newBooking.startTime.replace(':', ''));
        const endB = parseInt(newBooking.endTime.replace(':', ''));
        return (startB < endA && endB > startA);
      }
      return false;
    });

    if (hasOverlap) {
      addToast('danger', `Booking Conflict: ${targetResource.name} is already booked during this time window!`);
      return;
    }

    const item = {
      id: `BK-${Date.now().toString().slice(-3)}`,
      resourceTag: newBooking.resourceTag,
      resourceName: targetResource.name,
      user: currentUser.name,
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
      date: newBooking.date,
      status: 'Upcoming'
    };
    setBookings(prev => [item, ...prev]);
    logAction(`Booked resource ${newBooking.resourceTag} for ${newBooking.date}`);
    addToast('success', `Booking slot secured for ${targetResource.name}!`);
    setShowBookModal(false);
  };

  // Maintenance submit
  const handleMaintenance = (e) => {
    e.preventDefault();
    const targetAsset = assets.find(a => a.tag === newMaintenance.assetTag);
    if (!targetAsset) {
      addToast('danger', 'Asset Tag not found.');
      return;
    }

    const item = {
      id: `MT-${Date.now().toString().slice(-3)}`,
      assetTag: newMaintenance.assetTag,
      assetName: targetAsset.name,
      description: newMaintenance.description,
      priority: newMaintenance.priority,
      status: 'Under Review',
      requester: currentUser.name,
      technician: 'Pending Assignee'
    };
    setMaintenance(prev => [item, ...prev]);
    logAction(`Raised maintenance request for ${newMaintenance.assetTag}`);
    addToast('info', `Maintenance ticket raised for ${targetAsset.name}.`);
    setShowMaintenanceModal(false);
    setNewMaintenance({ assetTag: '', description: '', priority: 'Medium' });
  };

  // Update maintenance workflow states
  const updateMaintenanceStatus = (id, newStatus) => {
    setMaintenance(prev => prev.map(m => {
      if (m.id === id) {
        // Automatically flip asset state
        if (newStatus === 'Approved') {
          setAssets(assetsPrev => assetsPrev.map(a => a.tag === m.assetTag ? { 
            ...a, 
            status: 'Under Maintenance',
            history: [...a.history, { date: new Date().toISOString().split('T')[0], action: 'Maintenance Ticket Approved', user: currentUser.name }]
          } : a));
        } else if (newStatus === 'Resolved') {
          setAssets(assetsPrev => assetsPrev.map(a => a.tag === m.assetTag ? { 
            ...a, 
            status: 'Available',
            history: [...a.history, { date: new Date().toISOString().split('T')[0], action: 'Maintenance Ticket Resolved', user: currentUser.name }]
          } : a));
        }
        return { ...m, status: newStatus, technician: newStatus === 'Approved' ? 'Steve Jobs (Hardware Lab)' : m.technician };
      }
      return m;
    }));
    logAction(`Updated ticket ${id} status to ${newStatus}`);
    addToast('success', `Ticket ${id} is now ${newStatus}.`);
  };

  // Create Audit cycle
  const handleCreateAudit = (e) => {
    e.preventDefault();
    const auditAssets = assets.filter(a => a.category === newAudit.scope);
    const initialResults = {};
    auditAssets.forEach(a => {
      initialResults[a.tag] = 'Pending Verification';
    });

    const item = {
      id: `AD-${Date.now().toString().slice(-3)}`,
      name: newAudit.name,
      scope: newAudit.scope,
      date: newAudit.date || new Date().toISOString().split('T')[0],
      auditor: newAudit.auditor,
      status: 'In Progress',
      results: initialResults,
      reportGenerated: false
    };

    setAudits(prev => [item, ...prev]);
    logAction(`Created new audit cycle: ${newAudit.name}`);
    addToast('success', 'Audit cycle successfully created.');
    setShowAuditModal(false);
  };

  // Auditor action: verify item
  const handleVerifyAuditItem = (auditId, tag, decision) => {
    setAudits(prev => prev.map(aud => {
      if (aud.id === auditId) {
        return {
          ...aud,
          results: {
            ...aud.results,
            [tag]: decision
          }
        };
      }
      return aud;
    }));
  };

  // Close Audit and sync status
  const handleCloseAudit = (auditId) => {
    setAudits(prev => prev.map(aud => {
      if (aud.id === auditId) {
        // Sync states to database
        setAssets(assetsPrev => assetsPrev.map(a => {
          const itemAuditStatus = aud.results[a.tag];
          if (itemAuditStatus === 'Missing') {
            return { 
              ...a, 
              status: 'Lost',
              history: [...a.history, { date: new Date().toISOString().split('T')[0], action: 'Marked MISSING during Audit Cycle', user: currentUser.name }] 
            };
          } else if (itemAuditStatus === 'Damaged') {
            return {
              ...a,
              condition: 'Poor',
              history: [...a.history, { date: new Date().toISOString().split('T')[0], action: 'Reported DAMAGED during Audit Cycle', user: currentUser.name }]
            };
          }
          return a;
        }));

        return { ...aud, status: 'Completed', reportGenerated: true };
      }
      return aud;
    }));
    logAction(`Closed audit cycle ${auditId}`);
    addToast('success', `Locked audit results. System synced missing items to 'Lost'.`);
  };

  // Admin promotions directory action
  const handlePromoteRole = async (empId, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${empId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        logAction(`Promoted ${empId} to ${newRole}`);
        addToast('success', `Updated employee role to ${newRole}`);
        fetchEmployees();
      } else {
        addToast('danger', 'Error updating employee role.');
      }
    } catch (err) {
      addToast('danger', 'Backend connection error.');
    }
  };

  // Org Category add
  const handleAddCategory = (e) => {
    e.preventDefault();
    const attrs = newCat.attributes.split(',').map(s => s.trim()).filter(Boolean);
    const item = {
      id: `CAT-${categories.length + 1}`,
      name: newCat.name,
      attributes: attrs
    };
    setCategories(prev => [...prev, item]);
    logAction(`Created asset category ${newCat.name}`);
    addToast('success', `Created category ${newCat.name}`);
    setNewCat({ name: '', attributes: '' });
  };

  // Org Department add
  const handleAddDept = (e) => {
    e.preventDefault();
    const item = {
      id: `DEP-${departments.length + 1}`,
      name: newDept.name,
      head: newDept.head || 'TBD',
      parent: newDept.parent || null,
      status: newDept.status
    };
    setDepartments(prev => [...prev, item]);
    logAction(`Created department ${newDept.name}`);
    addToast('success', `Created department ${newDept.name}`);
    setNewDept({ name: '', head: '', parent: '', status: 'Active' });
  };

  // Dashboard Stats Calculations
  const totalAssets = assets.length;
  const availableAssets = assets.filter(a => a.status === 'Available').length;
  const allocatedAssets = assets.filter(a => a.status === 'Allocated').length;
  const maintenanceCount = assets.filter(a => a.status === 'Under Maintenance').length;
  const activeBookings = bookings.filter(b => b.status === 'Upcoming' || b.status === 'Ongoing').length;
  const activeTransfers = transfers.filter(t => t.status === 'Pending Approval').length;

  // Search filter implementations
  const filteredAssets = assets.filter(a => {
    const matchQuery = a.name.toLowerCase().includes(assetSearchQuery.toLowerCase()) || 
                       a.tag.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
                       a.serial.toLowerCase().includes(assetSearchQuery.toLowerCase());
    const matchCategory = assetFilterCategory === 'All' || a.category === assetFilterCategory;
    const matchStatus = assetFilterStatus === 'All' || a.status === assetFilterStatus;
    return matchQuery && matchCategory && matchStatus;
  });

  if (!isLoggedIn) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-deep)' }}>
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <Bell size={18} />
              <div>{toast.message}</div>
            </div>
          ))}
        </div>

        {authView === 'login' ? (
          <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '16px' }}>
                <path d="M16 2L2 10L16 18L30 10L16 2Z" fill="url(#grad1)" />
                <path d="M2 22L16 30L30 22" stroke="url(#grad2)" strokeWidth="3" strokeLinecap="round" />
                <path d="M2 16L16 24L30 16" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad1" x1="2" y1="2" x2="30" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="2" y1="22" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Welcome to AssetFlow</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Log in to access your enterprise dashboard</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={loginForm.email} 
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} 
                  placeholder="e.g. alice@assetflow.com" 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  required 
                  value={loginForm.password} 
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} 
                  placeholder="••••••••" 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Log In
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <span 
                style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }} 
                onClick={() => setAuthView('signup')}
              >
                Sign Up
              </span>
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Create Account</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Register your employee profile with AssetFlow</p>
            </div>

            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={signupForm.name} 
                  onChange={e => setSignupForm({ ...signupForm, name: e.target.value })} 
                  placeholder="e.g. John Doe" 
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={signupForm.email} 
                  onChange={e => setSignupForm({ ...signupForm, email: e.target.value })} 
                  placeholder="e.g. john@assetflow.com" 
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  required 
                  value={signupForm.password} 
                  onChange={e => setSignupForm({ ...signupForm, password: e.target.value })} 
                  placeholder="Create password" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Department</label>
                  <select 
                    className="form-control" 
                    value={signupForm.department} 
                    onChange={e => setSignupForm({ ...signupForm, department: e.target.value })}
                  >
                    {INITIAL_DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>System Role</label>
                  <select 
                    className="form-control" 
                    value={signupForm.role} 
                    onChange={e => setSignupForm({ ...signupForm, role: e.target.value })}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Asset Manager">Asset Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ margin: 0 }}>Custom Fields (Optional)</label>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{ padding: '2px 8px', fontSize: '0.75rem' }} 
                    onClick={() => setSignupCustomFields([...signupCustomFields, { key: '', value: '' }])}
                  >
                    + Add Field
                  </button>
                </div>
                {signupCustomFields.map((f, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ flex: 1, fontSize: '0.85rem' }} 
                      placeholder="Field Name" 
                      value={f.key} 
                      onChange={e => {
                        const updated = [...signupCustomFields];
                        updated[idx].key = e.target.value;
                        setSignupCustomFields(updated);
                      }} 
                    />
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ flex: 1, fontSize: '0.85rem' }} 
                      placeholder="Value" 
                      value={f.value} 
                      onChange={e => {
                        const updated = [...signupCustomFields];
                        updated[idx].value = e.target.value;
                        setSignupCustomFields(updated);
                      }} 
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-danger" 
                      style={{ padding: '2px 8px' }} 
                      onClick={() => setSignupCustomFields(signupCustomFields.filter((_, i) => i !== idx))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Sign Up
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <span 
                style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }} 
                onClick={() => setAuthView('login')}
              >
                Log In
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Toast Alert Popups */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <Bell size={18} />
            <div>{toast.message}</div>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 10L16 18L30 10L16 2Z" fill="url(#grad1)" />
            <path d="M2 22L16 30L30 22" stroke="url(#grad2)" strokeWidth="3" strokeLinecap="round" />
            <path d="M2 16L16 24L30 16" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="grad1" x1="2" y1="2" x2="30" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="grad2" x1="2" y1="22" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">AssetFlow</span>
        </div>

        <ul className="nav-links">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard className="nav-item-icon" /> Dashboard
          </li>
          
          {/* Role Protected Org Setup */}
          {currentRole === 'Admin' && (
            <li className={`nav-item ${activeTab === 'org' ? 'active' : ''}`} onClick={() => setActiveTab('org')}>
              <Building2 className="nav-item-icon" /> Org Setup
            </li>
          )}

          {/* Role Protected Portals */}
          {currentRole === 'Department Head' && (
            <li className={`nav-item ${activeTab === 'deptHead' ? 'active' : ''}`} onClick={() => setActiveTab('deptHead')}>
              <Building2 className="nav-item-icon" /> Dept Head Portal
            </li>
          )}

          {currentRole === 'Employee' && (
            <li className={`nav-item ${activeTab === 'employee' ? 'active' : ''}`} onClick={() => setActiveTab('employee')}>
              <User className="nav-item-icon" /> Employee Portal
            </li>
          )}

          <li className={`nav-item ${activeTab === 'assets' ? 'active' : ''}`} onClick={() => setActiveTab('assets')}>
            <Layers className="nav-item-icon" /> Asset Registry
          </li>

          <li className={`nav-item ${activeTab === 'allocation' ? 'active' : ''}`} onClick={() => setActiveTab('allocation')}>
            <ArrowRightLeft className="nav-item-icon" /> Allocations
          </li>

          <li className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <CalendarDays className="nav-item-icon" /> Bookings
          </li>

          <li className={`nav-item ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
            <Wrench className="nav-item-icon" /> Maintenance
          </li>

          <li className={`nav-item ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
            <ClipboardCheck className="nav-item-icon" /> Asset Audits
          </li>

          <li className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <BarChart3 className="nav-item-icon" /> Analytics
          </li>
        </ul>

        <div className="user-profile" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <div className="user-name">{currentUser?.name}</div>
            <div className="user-role-badge">{currentRole} Workspace</div>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem', justifyContent: 'center' }} 
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentUser(null);
              setCurrentRole('Employee');
              addToast('info', 'Successfully logged out.');
            }}
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="page-header">
          <div className="page-title">
            {activeTab === 'dashboard' && (
              <>
                <h1>Workspace Overview</h1>
                <p>Real-time operational snapshot of enterprise hardware and space allocations.</p>
              </>
            )}
            {activeTab === 'org' && (
              <>
                <h1>Organizational Setup</h1>
                <p>Configure departments, customized fields, and manage user elevations.</p>
              </>
            )}
            {activeTab === 'deptHead' && (
              <>
                <h1>Department Head Portal</h1>
                <p>Manage your department employees, allocate assets, approve transfer requests, and register staff.</p>
              </>
            )}
            {activeTab === 'employee' && (
              <>
                <h1>Employee Portal</h1>
                <p>View your profile, allocated assets, bookings, open tickets, or request repairs.</p>
              </>
            )}
            {activeTab === 'assets' && (
              <>
                <h1>Asset Directory</h1>
                <p>Query, track lifecycles, and edit inventory specifications.</p>
              </>
            )}
            {activeTab === 'allocation' && (
              <>
                <h1>Allocations & Transfers</h1>
                <p>Monitor assets allocated to departments/employees with conflict resolutions.</p>
              </>
            )}
            {activeTab === 'bookings' && (
              <>
                <h1>Shared Resource Calendar</h1>
                <p>Time-slot booking validation helper for shared assets.</p>
              </>
            )}
            {activeTab === 'maintenance' && (
              <>
                <h1>Maintenance Pipelines</h1>
                <p>Route repair authorization tasks directly to technician boards.</p>
              </>
            )}
            {activeTab === 'audit' && (
              <>
                <h1>Asset Audits</h1>
                <p>Initiate structured verify-and-report workflows.</p>
              </>
            )}
            {activeTab === 'reports' && (
              <>
                <h1>Reports & Analytics</h1>
                <p>Detailed performance summaries and heatmap distributions.</p>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {activeTab === 'assets' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
              <button className="btn btn-primary" onClick={() => setShowAddAssetModal(true)}>
                <Plus size={18} /> Register Asset
              </button>
            )}
            {activeTab === 'allocation' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
              <button className="btn btn-primary" onClick={() => setShowAllocateModal(true)}>
                <Plus size={18} /> Allocate Asset
              </button>
            )}
            {activeTab === 'bookings' && (
              <button className="btn btn-primary" onClick={() => setShowBookModal(true)}>
                <CalendarDays size={18} /> Book Resource
              </button>
            )}
            {activeTab === 'maintenance' && (
              <button className="btn btn-primary" onClick={() => setShowMaintenanceModal(true)}>
                <Plus size={18} /> Request Repair
              </button>
            )}
            {activeTab === 'audit' && currentRole === 'Admin' && (
              <button className="btn btn-primary" onClick={() => setShowAuditModal(true)}>
                <Plus size={18} /> Create Audit Cycle
              </button>
            )}
          </div>
        </header>

        {/* ==========================================
            VIEW: DASHBOARD
            ========================================== */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="glass-card kpi-card">
                <div className="kpi-details">
                  <h3>Assets Available</h3>
                  <div className="kpi-value">{availableAssets}</div>
                </div>
                <div className="kpi-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Layers size={24} />
                </div>
              </div>

              <div className="glass-card kpi-card">
                <div className="kpi-details">
                  <h3>Assets Allocated</h3>
                  <div className="kpi-value">{allocatedAssets}</div>
                </div>
                <div className="kpi-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                  <UserCheck size={24} />
                </div>
              </div>

              <div className="glass-card kpi-card">
                <div className="kpi-details">
                  <h3>Under Maintenance</h3>
                  <div className="kpi-value">{maintenanceCount}</div>
                </div>
                <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <Wrench size={24} />
                </div>
              </div>

              <div className="glass-card kpi-card">
                <div className="kpi-details">
                  <h3>Active Bookings</h3>
                  <div className="kpi-value">{activeBookings}</div>
                </div>
                <div className="kpi-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                  <CalendarDays size={24} />
                </div>
              </div>
            </div>

            {/* Main Dashboard Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
              {/* Left Column: Overdue and Quick Operations */}
              <div>
                <div className="glass-card" style={{ padding: '24px', marginBottom: '30px', borderLeft: '4px solid var(--color-danger)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171', marginBottom: '16px' }}>
                    <ShieldAlert /> Overdue Allocation Alerts
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {assets.filter(a => a.status === 'Allocated' && a.expectedReturn && new Date(a.expectedReturn) < new Date('2026-07-12')).map(a => (
                      <div key={a.tag} style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: '#fff' }}>{a.name}</strong> ({a.tag})
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Held by: <span style={{ color: 'var(--color-primary)' }}>{a.assignedTo}</span> • Expected: <span style={{ color: '#fca5a5' }}>{a.expectedReturn}</span>
                          </div>
                        </div>
                        {(currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                          <button className="btn btn-secondary btn-danger" onClick={() => handleReturnAsset(a.tag)}>Force Check-in</button>
                        )}
                      </div>
                    ))}
                    {assets.filter(a => a.status === 'Allocated' && a.expectedReturn && new Date(a.expectedReturn) < new Date('2026-07-12')).length === 0 && (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No overdue returns currently registered.</div>
                    )}
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Workspace Quick Actions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ marginBottom: '8px' }}>Register Assets</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Log newly purchased systems, appliances, or inventory tags.</p>
                      <button className="btn btn-secondary" onClick={() => { setActiveTab('assets'); setShowAddAssetModal(true); }}>Go to Registry</button>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ marginBottom: '8px' }}>Reserve Resource</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Book shuttle vans, projector gear, or boardrooms without overlap conflict.</p>
                      <button className="btn btn-secondary" onClick={() => { setActiveTab('bookings'); setShowBookModal(true); }}>Book Slots</button>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ marginBottom: '8px' }}>Submit Issue Log</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Submit malfunctioning machinery directly into repair status.</p>
                      <button className="btn btn-secondary" onClick={() => { setActiveTab('maintenance'); setShowMaintenanceModal(true); }}>File Ticket</button>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ marginBottom: '8px' }}>Audit Inventory</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Initiate physical verification cycle checkoffs for specific locations.</p>
                      <button className="btn btn-secondary" onClick={() => setActiveTab('audit')}>Check Cycles</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Logs Feed */}
              <div className="glass-card" style={{ padding: '24px', maxHeight: '550px', overflowY: 'auto' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <History size={18} /> Live Activity Log
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activityLogs.map((log, idx) => (
                    <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>{log.role}</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>{log.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: ORG SETUP (Admin only)
            ========================================== */}
        {activeTab === 'org' && currentRole === 'Admin' && (
          <div>
            <div className="tab-headers">
              <span className={`tab-header ${orgTab === 'departments' ? 'active' : ''}`} onClick={() => setOrgTab('departments')}>Departments</span>
              <span className={`tab-header ${orgTab === 'categories' ? 'active' : ''}`} onClick={() => setOrgTab('categories')}>Asset Categories</span>
              <span className={`tab-header ${orgTab === 'directory' ? 'active' : ''}`} onClick={() => setOrgTab('directory')}>Employee Directory</span>
            </div>

            {orgTab === 'departments' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Add Department</h3>
                  <form onSubmit={handleAddDept}>
                    <div className="form-group">
                      <label>Department Name</label>
                      <input type="text" className="form-control" required value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} placeholder="e.g. Sales, Marketing" />
                    </div>
                    <div className="form-group">
                      <label>Department Head</label>
                      <select className="form-control" value={newDept.head} onChange={e => setNewDept({...newDept, head: e.target.value})}>
                        <option value="">Select Department Head</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.name}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Parent Department (For Hierarchy)</label>
                      <select className="form-control" value={newDept.parent} onChange={e => setNewDept({...newDept, parent: e.target.value})}>
                        <option value="">None</option>
                        {departments.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select className="form-control" value={newDept.status} onChange={e => setNewDept({...newDept, status: e.target.value})}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Department</button>
                  </form>
                </div>

                <div className="glass-card table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Department ID</th>
                        <th>Name</th>
                        <th>Head</th>
                        <th>Hierarchy Tree</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map(d => (
                        <tr key={d.id}>
                          <td><code>{d.id}</code></td>
                          <td><strong>{d.name}</strong></td>
                          <td>{d.head}</td>
                          <td>{d.parent ? `Sub-dept of ${departments.find(p => p.id === d.parent)?.name}` : 'Root Department'}</td>
                          <td>
                            <span className={`badge ${d.status === 'Active' ? 'badge-available' : 'badge-lost'}`}>
                              {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {orgTab === 'categories' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Define Asset Category</h3>
                  <form onSubmit={handleAddCategory}>
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" className="form-control" required value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} placeholder="e.g. Server Racks" />
                    </div>
                    <div className="form-group">
                      <label>Category-Specific Fields (Comma Separated)</label>
                      <input type="text" className="form-control" value={newCat.attributes} onChange={e => setNewCat({...newCat, attributes: e.target.value})} placeholder="e.g. Rack Unit Height, Max KW Load" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register Category</button>
                  </form>
                </div>

                <div className="glass-card table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Category ID</th>
                        <th>Name</th>
                        <th>Attributes Defined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(c => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {c.attributes.map((attr, idx) => (
                                <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                  {attr}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {orgTab === 'directory' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                {/* Left: Add Employee Form */}
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Register Employee</h3>
                  <form onSubmit={handleAddEmployee}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" className="form-control" required value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})} placeholder="e.g. John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" className="form-control" required value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})} placeholder="e.g. john@assetflow.com" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className="form-group">
                        <label>Department</label>
                        <select className="form-control" value={newEmployee.department} onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}>
                          {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>System Role</label>
                        <select className="form-control" value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}>
                          <option value="Employee">Employee</option>
                          <option value="Department Head">Department Head</option>
                          <option value="Asset Manager">Asset Manager</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Employee Custom Fields */}
                    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label style={{ margin: 0 }}>Custom Fields</label>
                        <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setNewEmployeeCustomFields([...newEmployeeCustomFields, { key: '', value: '' }])}>+ Add Field</button>
                      </div>
                      
                      {newEmployeeCustomFields.map((f, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <input type="text" className="form-control" style={{ flex: 1, fontSize: '0.85rem' }} placeholder="Field Name" value={f.key} onChange={e => {
                            const updated = [...newEmployeeCustomFields];
                            updated[idx].key = e.target.value;
                            setNewEmployeeCustomFields(updated);
                          }} />
                          <input type="text" className="form-control" style={{ flex: 1, fontSize: '0.85rem' }} placeholder="Value" value={f.value} onChange={e => {
                            const updated = [...newEmployeeCustomFields];
                            updated[idx].value = e.target.value;
                            setNewEmployeeCustomFields(updated);
                          }} />
                          <button type="button" className="btn btn-secondary btn-danger" style={{ padding: '2px 8px' }} onClick={() => {
                            setNewEmployeeCustomFields(newEmployeeCustomFields.filter((_, i) => i !== idx));
                          }}>×</button>
                        </div>
                      ))}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register Employee</button>
                  </form>
                </div>

                {/* Right: Employee Directory Table */}
                <div className="glass-card table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>System Role</th>
                        <th>Status</th>
                        <th>Promote Staff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map(emp => (
                        <tr key={emp.id}>
                          <td><code>{emp.id}</code></td>
                          <td>
                            <strong>{emp.name}</strong>
                            {emp.customFields && Object.keys(emp.customFields).length > 0 && (
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                                {Object.entries(emp.customFields).map(([k, v]) => (
                                  <span key={k} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                                    {k}: {v}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td>{emp.email}</td>
                          <td>{emp.department}</td>
                          <td>
                            <span style={{ 
                              fontWeight: '600', 
                              color: emp.role === 'Admin' ? '#fb7185' : emp.role === 'Asset Manager' ? '#a78bfa' : emp.role === 'Department Head' ? '#67e8f9' : '#9ca3af'
                            }}>
                              {emp.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${emp.status === 'Active' ? 'badge-available' : 'badge-lost'}`}>
                              {emp.status}
                            </span>
                          </td>
                          <td>
                            <select 
                              className="form-control" 
                              style={{ width: '160px', padding: '4px 8px', fontSize: '0.85rem' }} 
                              value={emp.role} 
                              onChange={e => handlePromoteRole(emp.id, e.target.value)}
                            >
                              <option value="Employee">Employee</option>
                              <option value="Department Head">Department Head</option>
                              <option value="Asset Manager">Asset Manager</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            VIEW: ASSET DIRECTORY
            ========================================== */}
        {activeTab === 'assets' && (
          <div>
            {/* Filters Row */}
            <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '12px', flexGrow: 1, maxWidth: '600px' }}>
                <div style={{ position: 'relative', flexGrow: 1 }}>
                  <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ paddingLeft: '40px' }} 
                    placeholder="Search by Tag, Name, or Serial..." 
                    value={assetSearchQuery}
                    onChange={e => setAssetSearchQuery(e.target.value)}
                  />
                </div>
                <select className="form-control" style={{ width: '180px' }} value={assetFilterCategory} onChange={e => setAssetFilterCategory(e.target.value)}>
                  <option value="All">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <select className="form-control" style={{ width: '180px' }} value={assetFilterStatus} onChange={e => setAssetFilterStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Allocated">Allocated</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Lost">Lost</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
            </div>

            {/* Assets Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredAssets.map(a => (
                <div key={a.tag} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{a.category}</span>
                      <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>{a.name}</h3>
                    </div>
                    <span className={`badge badge-${a.status.toLowerCase().replace(' ', '')}`}>{a.status}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px', marginBottom: '16px' }}>
                    <div>Tag: <code style={{ color: '#fff' }}>{a.tag}</code></div>
                    <div>Serial: <span style={{ color: '#fff' }}>{a.serial}</span></div>
                    <div>Condition: <span style={{ color: '#fff' }}>{a.condition}</span></div>
                    <div>Location: <span style={{ color: '#fff' }}>{a.location}</span></div>
                    {a.customAttributes && Object.entries(a.customAttributes).map(([key, val]) => (
                      <div key={key}>{key}: <span style={{ color: '#fff' }}>{val}</span></div>
                    ))}
                    {a.status === 'Allocated' && (
                      <div style={{ gridColumn: 'span 2' }}>
                        Assigned: <strong style={{ color: 'var(--color-primary)' }}>{a.assignedTo}</strong>
                        {a.expectedReturn && <span> (Due: <span style={{ color: new Date(a.expectedReturn) < new Date('2026-07-12') ? 'var(--color-danger)' : 'inherit' }}>{a.expectedReturn}</span>)</span>}
                      </div>
                    )}
                  </div>

                  {/* Logged History */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <History size={12} /> Log Timeline
                    </div>
                    {a.history.slice(-2).map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>{h.action}</span>
                        <span>{h.date}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    {a.status === 'Allocated' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                      <button className="btn btn-secondary" onClick={() => handleReturnAsset(a.tag)}>Revert to Available</button>
                    )}
                    {a.status === 'Available' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => {
                        setNewAllocation({ ...newAllocation, assetTag: a.tag });
                        setShowAllocateModal(true);
                      }}>Allocate</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: ASSET ALLOCATION
            ========================================== */}
        {activeTab === 'allocation' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
              {/* Allocations and conflict warnings */}
              <div>
                <div className="glass-card" style={{ padding: '24px', marginBottom: '30px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Ongoing Allocations</h3>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Asset Tag</th>
                          <th>Asset Name</th>
                          <th>Holder</th>
                          <th>Expected Return</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.filter(a => a.status === 'Allocated' || a.status === 'Under Maintenance').map(a => (
                          <tr key={a.tag}>
                            <td><code>{a.tag}</code></td>
                            <td><strong>{a.name}</strong></td>
                            <td>{a.assignedTo}</td>
                            <td>{a.expectedReturn || 'No limit'}</td>
                            <td><span className={`badge badge-${a.status.toLowerCase().replace(' ', '')}`}>{a.status}</span></td>
                            <td>
                              {(currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                                <button className="btn btn-secondary btn-danger" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleReturnAsset(a.tag)}>Return Check-in</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Transfers Approval Pipeline */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <ArrowRightLeft size={18} /> Transfer Requests
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {transfers.map(tx => (
                    <div key={tx.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <span>Req: {tx.id}</span>
                        <span className={`badge ${tx.status === 'Approved' ? 'badge-available' : 'badge-maintenance'}`}>{tx.status}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                        Reassign <code style={{ color: 'var(--color-primary)' }}>{tx.assetTag}</code> from <strong>{tx.currentHolder}</strong> to <strong>{tx.requestedBy}</strong>.
                      </p>
                      {tx.status === 'Pending Approval' && (currentRole === 'Admin' || currentRole === 'Asset Manager' || currentRole === 'Department Head') && (
                        <button className="btn btn-success" style={{ width: '100%', padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => handleApproveTransfer(tx.id)}>Approve Transfer</button>
                      )}
                    </div>
                  ))}
                  {transfers.length === 0 && (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No pending transfer requests.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: RESOURCE BOOKINGS
            ========================================== */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
            {/* Calendar list */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Active bookings schedule</h3>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Resource</th>
                      <th>Booked By</th>
                      <th>Time Slot</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(bk => (
                      <tr key={bk.id}>
                        <td><code>{bk.id}</code></td>
                        <td><strong>{bk.resourceName}</strong> ({bk.resourceTag})</td>
                        <td>{bk.user}</td>
                        <td>{bk.date} • {bk.startTime} - {bk.endTime}</td>
                        <td>
                          <span className={`badge ${bk.status === 'Upcoming' ? 'badge-reserved' : bk.status === 'Ongoing' ? 'badge-available' : 'badge-lost'}`}>
                            {bk.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Guide Info Card */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3>Booking Rules</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
                Shared assets (Room Alpha, HQ Shuttle) are booked per calendar time slot. 
                Our engine automatically runs time overlap validation checks during booking submissions.
              </p>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '16px', borderRadius: 'var(--radius-md)', marginTop: '20px' }}>
                <h4 style={{ color: '#22d3ee', fontSize: '0.9rem', marginBottom: '6px' }}>Overlap Validation</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  If a resource is booked 09:00 - 10:00, a submission for 09:30 - 10:30 will be rejected by our state engine.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: MAINTENANCE MANAGEMENT
            ========================================== */}
        {activeTab === 'maintenance' && (
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '20px' }}>Maintenance Tickets</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Asset Tag</th>
                    <th>Name</th>
                    <th>Issue Description</th>
                    <th>Priority</th>
                    <th>Assigned Tech</th>
                    <th>Pipeline Status</th>
                    <th>Update Workflow</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenance.map(m => (
                    <tr key={m.id}>
                      <td><code>{m.id}</code></td>
                      <td><code>{m.assetTag}</code></td>
                      <td><strong>{m.assetName}</strong></td>
                      <td>{m.description}</td>
                      <td>
                        <span className={`badge ${m.priority === 'High' ? 'badge-lost' : 'badge-maintenance'}`}>{m.priority}</span>
                      </td>
                      <td>{m.technician}</td>
                      <td>
                        <span className={`badge ${m.status === 'Under Review' ? 'badge-maintenance' : m.status === 'Approved' ? 'badge-allocated' : 'badge-available'}`}>
                          {m.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {m.status === 'Under Review' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                            <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => updateMaintenanceStatus(m.id, 'Approved')}>Approve & Assign</button>
                          )}
                          {m.status === 'Approved' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                            <button className="btn btn-success" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => updateMaintenanceStatus(m.id, 'Resolved')}>Mark Resolved</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: AUDIT SCREEN
            ========================================== */}
        {activeTab === 'audit' && (
          <div>
            {audits.map(aud => (
              <div key={aud.id} className="glass-card" style={{ padding: '24px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                  <div>
                    <span className="badge badge-reserved" style={{ marginBottom: '8px' }}>Cycle: {aud.id}</span>
                    <h2>{aud.name}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Auditor: <strong>{aud.auditor}</strong> • Scope category: {aud.scope}
                    </p>
                  </div>
                  <div>
                    <span className={`badge ${aud.status === 'Completed' ? 'badge-available' : 'badge-maintenance'}`}>{aud.status}</span>
                  </div>
                </div>

                {/* Audit verify checklist */}
                <h4 style={{ marginBottom: '12px' }}>Verify Scope Assets Checklist</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {assets.filter(a => a.category === aud.scope).map(a => (
                    <div key={a.tag} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{a.name}</strong> ({a.tag})
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Condition: {a.condition} • Status: {a.status}</div>
                      </div>
                      
                      {aud.status === 'In Progress' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className={`btn ${aud.results[a.tag] === 'Verified' ? 'btn-success' : 'btn-secondary'}`}
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => handleVerifyAuditItem(aud.id, a.tag, 'Verified')}
                          >
                            Verified
                          </button>
                          <button 
                            className={`btn ${aud.results[a.tag] === 'Missing' ? 'btn-danger' : 'btn-secondary'}`}
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => handleVerifyAuditItem(aud.id, a.tag, 'Missing')}
                          >
                            Missing
                          </button>
                          <button 
                            className={`btn ${aud.results[a.tag] === 'Damaged' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => handleVerifyAuditItem(aud.id, a.tag, 'Damaged')}
                          >
                            Damaged
                          </button>
                        </div>
                      ) : (
                        <div>
                          <strong>Outcome:</strong> <span style={{ 
                            color: aud.results[a.tag] === 'Verified' ? '#10b981' : aud.results[a.tag] === 'Missing' ? '#ef4444' : '#f59e0b'
                          }}>{aud.results[a.tag]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {aud.status === 'In Progress' && (currentRole === 'Admin' || currentRole === 'Asset Manager') && (
                  <button className="btn btn-primary" onClick={() => handleCloseAudit(aud.id)}>
                    Lock Cycle & Sync System States
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: REPORTS
            ========================================== */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              {/* Category Breakdown (SVG Doughnut Chart) */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3>Category distribution</h3>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
                    {/* Hardcoded visual represent segments for clean dashboard look */}
                    <circle cx="100" cy="100" r="80" fill="transparent" stroke="var(--color-primary)" strokeWidth="20" strokeDasharray="300 502" strokeDashoffset="0" />
                    <circle cx="100" cy="100" r="80" fill="transparent" stroke="var(--color-info)" strokeWidth="20" strokeDasharray="120 502" strokeDashoffset="-300" />
                    <circle cx="100" cy="100" r="80" fill="transparent" stroke="var(--color-success)" strokeWidth="20" strokeDasharray="80 502" strokeDashoffset="-420" />
                  </svg>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                  <div><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-primary)', marginRight: '6px' }}></span>Electronics (60%)</div>
                  <div><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-info)', marginRight: '6px' }}></span>A/V Equipment (24%)</div>
                  <div><span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--color-success)', marginRight: '6px' }}></span>Vehicles (16%)</div>
                </div>
              </div>

              {/* Maintenance Frequency (SVG Bar Chart) */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <h3>Asset utilization rating</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', margin: '30px 0', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                  {/* Visual bars */}
                  <div style={{ width: '40px', background: 'var(--color-primary)', height: '80%', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>80%</div>
                  <div style={{ width: '40px', background: 'var(--color-info)', height: '45%', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>45%</div>
                  <div style={{ width: '40px', background: 'var(--color-success)', height: '95%', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>95%</div>
                  <div style={{ width: '40px', background: 'var(--color-warning)', height: '20%', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>20%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Laptops</span>
                  <span>Monitors</span>
                  <span>Vehicles</span>
                  <span>Projectors</span>
                </div>
              </div>
            </div>

            {/* Heatmap Booking Matrix */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3>Resource booking intensity matrix</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Peak usage density indicators across calendar workweeks.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {Array.from({ length: 28 }).map((_, idx) => {
                  const intensities = ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.6)', 'rgba(139, 92, 246, 0.9)'];
                  const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
                  return (
                    <div key={idx} style={{ height: '40px', background: randomIntensity, borderRadius: '4px' }} />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: DEPARTMENT HEAD PORTAL
            ========================================== */}
        {activeTab === 'deptHead' && (
          <div>
            {/* KPI Cards */}
            {(() => {
              const deptObj = departments.find(d => d.head === currentUser.name) || { name: 'Engineering' };
              const deptName = deptObj.name;
              const deptEmployees = employees.filter(emp => emp.department === deptName);
              const deptAssets = assets.filter(a => {
                if (a.status !== 'Allocated' && a.status !== 'Under Maintenance') return false;
                const assignee = employees.find(emp => emp.name === a.assignedTo);
                return assignee && assignee.department === deptName;
              });
              const deptTransfers = transfers.filter(tx => {
                const assetObj = assets.find(a => a.tag === tx.assetTag);
                const assignee = employees.find(emp => emp.name === assetObj?.assignedTo);
                return assignee && assignee.department === deptName;
              });

              return (
                <>
                  <div className="kpi-grid" style={{ marginBottom: '30px' }}>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>Department Employees</h3>
                        <div className="kpi-value">{deptEmployees.length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <Users size={24} />
                      </div>
                    </div>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>Department Assets</h3>
                        <div className="kpi-value">{deptAssets.length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                        <Layers size={24} />
                      </div>
                    </div>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>Pending Transfers</h3>
                        <div className="kpi-value">{deptTransfers.filter(t => t.status === 'Pending Approval').length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <ArrowRightLeft size={24} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
                    {/* Left Column: Register Employee Form for this department */}
                    <div className="glass-card" style={{ padding: '24px' }}>
                      <h3 style={{ marginBottom: '16px' }}>Register Department Staff</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Add a new employee directly to the <strong>{deptName}</strong> department.
                      </p>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const targetEmail = newEmployee.email;
                        if (employees.some(emp => emp.email.toLowerCase() === targetEmail.toLowerCase())) {
                          addToast('danger', 'Employee with this email already exists.');
                          return;
                        }
                        const empId = `EMP-${100 + employees.length + 1}`;
                        const customFieldsObj = {};
                        newEmployeeCustomFields.forEach(f => {
                          if (f.key.trim()) {
                            customFieldsObj[f.key.trim()] = f.value;
                          }
                        });

                        const item = {
                          id: empId,
                          name: newEmployee.name,
                          email: targetEmail,
                          department: deptName,
                          role: newEmployee.role,
                          status: newEmployee.status,
                          customFields: customFieldsObj
                        };

                        setEmployees(prev => [...prev, item]);
                        logAction(`Registered employee ${empId} (${newEmployee.name})`);
                        addToast('success', `Successfully registered employee ${newEmployee.name}!`);
                        setNewEmployee({ name: '', email: '', department: 'Engineering', role: 'Employee', status: 'Active' });
                        setNewEmployeeCustomFields([]);
                      }}>
                        <div className="form-group">
                          <label>Full Name</label>
                          <input type="text" className="form-control" required value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})} placeholder="e.g. Jane Doe" />
                        </div>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input type="email" className="form-control" required value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})} placeholder="e.g. jane@company.com" />
                        </div>
                        <div className="form-group">
                          <label>System Role</label>
                          <select className="form-control" value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}>
                            <option value="Employee">Employee</option>
                            <option value="Asset Manager">Asset Manager</option>
                            <option value="Department Head">Department Head</option>
                          </select>
                        </div>
                        
                        {/* Dynamic Fields */}
                        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ margin: 0 }}>Custom Fields</label>
                            <button type="button" className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setNewEmployeeCustomFields([...newEmployeeCustomFields, { key: '', value: '' }])}>+ Add Field</button>
                          </div>
                          {newEmployeeCustomFields.map((f, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                              <input type="text" className="form-control" style={{ flex: 1, fontSize: '0.85rem' }} placeholder="Field Name" value={f.key} onChange={e => {
                                const updated = [...newEmployeeCustomFields];
                                updated[idx].key = e.target.value;
                                setNewEmployeeCustomFields(updated);
                              }} />
                              <input type="text" className="form-control" style={{ flex: 1, fontSize: '0.85rem' }} placeholder="Value" value={f.value} onChange={e => {
                                const updated = [...newEmployeeCustomFields];
                                updated[idx].value = e.target.value;
                                setNewEmployeeCustomFields(updated);
                              }} />
                              <button type="button" className="btn btn-secondary btn-danger" style={{ padding: '2px 8px' }} onClick={() => {
                                setNewEmployeeCustomFields(newEmployeeCustomFields.filter((_, i) => i !== idx));
                              }}>×</button>
                            </div>
                          ))}
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register Employee</button>
                      </form>
                    </div>

                    {/* Right Column: Department Employees List & Transfer Approvals */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      {/* Directory */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>{deptName} Team Directory</h3>
                        <div className="table-container">
                          <table className="custom-table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {deptEmployees.map(emp => (
                                <tr key={emp.id}>
                                  <td><code>{emp.id}</code></td>
                                  <td>
                                    <strong>{emp.name}</strong>
                                    {emp.customFields && Object.keys(emp.customFields).length > 0 && (
                                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                                        {Object.entries(emp.customFields).map(([k, v]) => (
                                          <span key={k} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                                            {k}: {v}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </td>
                                  <td>{emp.email}</td>
                                  <td>{emp.role}</td>
                                  <td>
                                    <span className={`badge ${emp.status === 'Active' ? 'badge-available' : 'badge-lost'}`}>
                                      {emp.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Transfer approvals for the department */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Pending Team Transfers</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {deptTransfers.map(tx => (
                            <div key={tx.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                  <span className={`badge ${tx.status === 'Approved' ? 'badge-available' : 'badge-maintenance'}`}>{tx.status}</span>
                                  <code style={{ fontSize: '0.85rem' }}>{tx.id}</code>
                                </div>
                                <p style={{ fontSize: '0.9rem' }}>
                                  Reassign asset <strong>{tx.assetTag}</strong> from <strong>{tx.currentHolder}</strong> to <strong>{tx.requestedBy}</strong>.
                                </p>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                  Reason: {tx.reason}
                                </div>
                              </div>
                              {tx.status === 'Pending Approval' && (
                                <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => handleApproveTransfer(tx.id)}>
                                  Approve
                                </button>
                              )}
                            </div>
                          ))}
                          {deptTransfers.length === 0 && (
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No transfer approvals pending for your department.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ==========================================
            VIEW: EMPLOYEE PORTAL
            ========================================== */}
        {activeTab === 'employee' && (
          <div>
            {/* KPI Cards */}
            {(() => {
              const myAssets = assets.filter(a => a.assignedTo === currentUser.name);
              const myBookings = bookings.filter(b => b.user === currentUser.name && b.status !== 'Cancelled');
              const myTickets = maintenance.filter(m => m.requester === currentUser.name && m.status !== 'Resolved');
              return (
                <>
                  <div className="kpi-grid" style={{ marginBottom: '30px' }}>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>My Allocated Assets</h3>
                        <div className="kpi-value">{myAssets.length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                        <Layers size={24} />
                      </div>
                    </div>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>My Resource Bookings</h3>
                        <div className="kpi-value">{myBookings.length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                        <CalendarDays size={24} />
                      </div>
                    </div>
                    <div className="glass-card kpi-card">
                      <div className="kpi-details">
                        <h3>Active Repair Tickets</h3>
                        <div className="kpi-value">{myTickets.length}</div>
                      </div>
                      <div className="kpi-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <Wrench size={24} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
                    {/* Left: Employee Info Card & Quick Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                          <div style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)', padding: '12px', borderRadius: '50%', display: 'flex' }}>
                            <User size={32} />
                          </div>
                          <div>
                            <h2 style={{ fontSize: '1.4rem' }}>{currentUser.name}</h2>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                          {(() => {
                            const empDetails = employees.find(e => e.name === currentUser.name);
                            if (!empDetails) return null;
                            return (
                              <>
                                <div>Department: <span style={{ color: '#fff', fontWeight: '600' }}>{empDetails.department}</span></div>
                                <div>Role: <span style={{ color: '#fff', fontWeight: '600' }}>{empDetails.role}</span></div>
                                <div>Status: <span className="badge badge-available">{empDetails.status}</span></div>
                                {empDetails.customFields && Object.keys(empDetails.customFields).length > 0 && (
                                  <div style={{ marginTop: '8px' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Metadata:</div>
                                    {Object.entries(empDetails.customFields).map(([k, v]) => (
                                      <div key={k} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{k}: <span style={{ color: '#fff' }}>{v}</span></div>
                                    ))}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Quick Portal Action Buttons */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Quick Request</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setShowBookModal(true)}>
                            <CalendarDays size={18} /> Book Space/Vehicle
                          </button>
                          <button className="btn btn-secondary" style={{ justifyContent: 'center' }} onClick={() => setShowMaintenanceModal(true)}>
                            <Wrench size={18} /> Request Gear Repair
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Allocated Assets List & Booking / Maintenance Lists */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                      {/* My Assets */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>My Allocated Assets</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                          {myAssets.map(a => (
                            <div key={a.tag} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                <div>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{a.category}</span>
                                  <h4 style={{ fontSize: '1.1rem', marginTop: '2px' }}>{a.name}</h4>
                                </div>
                                <span className={`badge badge-${a.status.toLowerCase().replace(' ', '')}`}>{a.status}</span>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                <div>Tag: <code style={{ color: '#fff' }}>{a.tag}</code></div>
                                <div>Serial: <span style={{ color: '#fff' }}>{a.serial}</span></div>
                                {a.expectedReturn && <div>Due: <span style={{ color: 'var(--color-warning)' }}>{a.expectedReturn}</span></div>}
                                {a.customAttributes && Object.entries(a.customAttributes).map(([k, v]) => (
                                  <div key={k}>{k}: <span style={{ color: '#fff' }}>{v}</span></div>
                                ))}
                              </div>
                              <button className="btn btn-secondary" style={{ width: '100%', padding: '6px 12px', fontSize: '0.8rem', justifyContent: 'center' }} onClick={() => {
                                setNewMaintenance({ ...newMaintenance, assetTag: a.tag });
                                setShowMaintenanceModal(true);
                              }}>
                                Report Malfunction
                              </button>
                            </div>
                          ))}
                          {myAssets.length === 0 && (
                            <div style={{ gridColumn: 'span 2', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '12px 0' }}>No assets currently allocated to you.</div>
                          )}
                        </div>
                      </div>

                      {/* My Bookings Schedule */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>My Bookings Schedule</h3>
                        <div className="table-container">
                          <table className="custom-table">
                            <thead>
                              <tr>
                                <th>Resource</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {myBookings.map(bk => (
                                <tr key={bk.id}>
                                  <td><strong>{bk.resourceName}</strong> ({bk.resourceTag})</td>
                                  <td>{bk.date}</td>
                                  <td>{bk.startTime} - {bk.endTime}</td>
                                  <td><span className={`badge ${bk.status === 'Upcoming' ? 'badge-reserved' : 'badge-available'}`}>{bk.status}</span></td>
                                </tr>
                              ))}
                              {myBookings.length === 0 && (
                                <tr>
                                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No scheduled resource bookings.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* My Maintenance Tickets */}
                      <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>My Repair Tickets</h3>
                        <div className="table-container">
                          <table className="custom-table">
                            <thead>
                              <tr>
                                <th>Ticket</th>
                                <th>Asset</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {myTickets.map(tk => (
                                <tr key={tk.id}>
                                  <td><code>{tk.id}</code></td>
                                  <td>{tk.assetName} ({tk.assetTag})</td>
                                  <td>{tk.description}</td>
                                  <td><span className="badge badge-maintenance">{tk.priority}</span></td>
                                  <td><span className="badge badge-reserved">{tk.status}</span></td>
                                </tr>
                              ))}
                              {myTickets.length === 0 && (
                                <tr>
                                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No active maintenance tickets.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </main>

      {/* ==========================================
          PERSISTENT FLOATING ROLE HUD FOR JUDGES
          ========================================== */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        background: 'rgba(11, 15, 25, 0.9)',
        border: '1px solid var(--color-primary)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 24px',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -10px 40px -10px rgba(139, 92, 246, 0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a78bfa', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <History size={16} /> Hackathon Judge Assistant
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Use this panel to instantly hot-swap user permissions to test core ERP flow rules.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {['Admin', 'Asset Manager', 'Department Head', 'Employee'].map(r => (
            <button 
              key={r} 
              className={`btn ${currentRole === r ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => {
                setCurrentRole(r);
                if (r === 'Admin') {
                  setCurrentUser({ name: 'Alex Johnson', email: 'admin@assetflow.com', role: 'Admin', department: 'Engineering' });
                  setActiveTab('org');
                } else if (r === 'Department Head') {
                  setCurrentUser({ name: 'Alice Vance', email: 'alice@assetflow.com', role: 'Department Head', department: 'Engineering' });
                  setActiveTab('deptHead');
                } else if (r === 'Employee') {
                  setCurrentUser({ name: 'Raj Kumar', email: 'raj@assetflow.com', role: 'Employee', department: 'Engineering' });
                  setActiveTab('employee');
                } else {
                  setCurrentUser({ name: 'Devon Miller', email: 'devon@assetflow.com', role: 'Asset Manager', department: 'Hardware & Infrastructure' });
                  setActiveTab('dashboard');
                }
                addToast('info', `Swapped workspace permissions to ${r}`);
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          MODAL: CONFLICT RESOLUTION
          ========================================== */}
      {allocationConflict && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ border: '1px solid var(--color-danger)' }}>
            <button className="modal-close" onClick={() => setAllocationConflict(null)}>×</button>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '50%' }}>
                <AlertTriangle size={32} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Double-Allocation Prevented</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.5' }}>
                  You cannot allocate <strong>{allocationConflict.assetName} ({allocationConflict.assetTag})</strong> because it is currently assigned to <strong>{allocationConflict.currentHolder}</strong>.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary" onClick={() => triggerTransferRequest(allocationConflict)}>
                    Raise Transfer Request
                  </button>
                  <button className="btn btn-secondary" onClick={() => setAllocationConflict(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: REGISTER ASSET
          ========================================== */}
      {showAddAssetModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button className="modal-close" onClick={() => setShowAddAssetModal(false)}>×</button>
            <div className="modal-header">
              <h2>Register New Asset</h2>
            </div>
            <form onSubmit={handleAddAsset}>
              <div className="form-group">
                <label>Asset Name</label>
                <input type="text" className="form-control" required value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} placeholder="e.g. Dell Latitude 7420" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={newAsset.category} onChange={e => {
                    setNewAsset({...newAsset, category: e.target.value});
                    setNewAssetCustomVals({});
                  }}>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Serial Number (Optional)</label>
                  <input type="text" className="form-control" value={newAsset.serial} onChange={e => setNewAsset({...newAsset, serial: e.target.value})} placeholder="S/N-..." />
                </div>
              </div>
              {/* Category-Specific Dynamic Custom Attributes */}
              {(() => {
                const catObj = categories.find(c => c.name === newAsset.category);
                if (catObj && catObj.attributes && catObj.attributes.length > 0) {
                  return (
                    <div style={{ margin: '12px 0', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)' }}>
                      <h4 style={{ fontSize: '0.85rem', marginBottom: '8px', color: 'var(--color-primary)' }}>Category Specific Fields</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {catObj.attributes.map(attr => (
                          <div className="form-group" key={attr} style={{ marginBottom: 0 }}>
                            <label style={{ fontSize: '0.75rem' }}>{attr}</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              value={newAssetCustomVals[attr] || ''} 
                              onChange={e => setNewAssetCustomVals({ ...newAssetCustomVals, [attr]: e.target.value })} 
                              placeholder={`Enter ${attr}...`} 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Acquisition Cost ($)</label>
                  <input type="number" className="form-control" value={newAsset.cost} onChange={e => setNewAsset({...newAsset, cost: e.target.value})} placeholder="2000" />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select className="form-control" value={newAsset.condition} onChange={e => setNewAsset({...newAsset, condition: e.target.value})}>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Storage Location</label>
                <input type="text" className="form-control" value={newAsset.location} onChange={e => setNewAsset({...newAsset, location: e.target.value})} placeholder="e.g. IT Lab Room 4" />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <input type="checkbox" id="shared" checked={newAsset.shared} onChange={e => setNewAsset({...newAsset, shared: e.target.checked})} />
                <label htmlFor="shared" style={{ margin: 0 }}>Mark as Shared Bookable Resource</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Register into Inventory</button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: ALLOCATE ASSET
          ========================================== */}
      {showAllocateModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button className="modal-close" onClick={() => setShowAllocateModal(false)}>×</button>
            <div className="modal-header">
              <h2>Allocate Asset</h2>
            </div>
            <form onSubmit={handleAllocate}>
              <div className="form-group">
                <label>Select Asset</label>
                <select className="form-control" required value={newAllocation.assetTag} onChange={e => setNewAllocation({...newAllocation, assetTag: e.target.value})}>
                  <option value="">Choose Asset...</option>
                  {assets.map(a => (
                    <option key={a.tag} value={a.tag}>{a.tag} - {a.name} ({a.status})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Assign To Employee</label>
                <select className="form-control" required value={newAllocation.assigneeId} onChange={e => setNewAllocation({...newAllocation, assigneeId: e.target.value})}>
                  <option value="">Select Employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Expected Return Date (Optional)</label>
                <input type="date" className="form-control" value={newAllocation.returnDate} onChange={e => setNewAllocation({...newAllocation, returnDate: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Confirm Allocation</button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: BOOK RESOURCE
          ========================================== */}
      {showBookModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button className="modal-close" onClick={() => setShowBookModal(false)}>×</button>
            <div className="modal-header">
              <h2>Book Shared Resource</h2>
            </div>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>Select Resource</label>
                <select className="form-control" required value={newBooking.resourceTag} onChange={e => setNewBooking({...newBooking, resourceTag: e.target.value})}>
                  <option value="">Choose resource...</option>
                  {assets.filter(a => a.shared).map(a => (
                    <option key={a.tag} value={a.tag}>{a.name} ({a.tag})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" required value={newBooking.date} onChange={e => setNewBooking({...newBooking, date: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Start Time</label>
                  <input type="time" className="form-control" required value={newBooking.startTime} onChange={e => setNewBooking({...newBooking, startTime: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input type="time" className="form-control" required value={newBooking.endTime} onChange={e => setNewBooking({...newBooking, endTime: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Reserve Time Slot</button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: REQUEST MAINTENANCE
          ========================================== */}
      {showMaintenanceModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button className="modal-close" onClick={() => setShowMaintenanceModal(false)}>×</button>
            <div className="modal-header">
              <h2>Log Maintenance Request</h2>
            </div>
            <form onSubmit={handleMaintenance}>
              <div className="form-group">
                <label>Select Asset</label>
                <select className="form-control" required value={newMaintenance.assetTag} onChange={e => setNewMaintenance({...newMaintenance, assetTag: e.target.value})}>
                  <option value="">Choose asset...</option>
                  {assets.map(a => (
                    <option key={a.tag} value={a.tag}>{a.tag} - {a.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Priority Level</label>
                <select className="form-control" value={newMaintenance.priority} onChange={e => setNewMaintenance({...newMaintenance, priority: e.target.value})}>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description of Issue</label>
                <textarea className="form-control" style={{ height: '100px' }} required value={newMaintenance.description} onChange={e => setNewMaintenance({...newMaintenance, description: e.target.value})} placeholder="Describe what needs servicing or repairs..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Submit Repair Request</button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CREATE AUDIT
          ========================================== */}
      {showAuditModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <button className="modal-close" onClick={() => setShowAuditModal(false)}>×</button>
            <div className="modal-header">
              <h2>Create Audit Cycle</h2>
            </div>
            <form onSubmit={handleCreateAudit}>
              <div className="form-group">
                <label>Audit Name</label>
                <input type="text" className="form-control" required value={newAudit.name} onChange={e => setNewAudit({...newAudit, name: e.target.value})} placeholder="e.g. Q3 Server Room verification" />
              </div>
              <div className="form-group">
                <label>Audit Scope Category</label>
                <select className="form-control" value={newAudit.scope} onChange={e => setNewAudit({...newAudit, scope: e.target.value})}>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Date Scheduled</label>
                <input type="date" className="form-control" value={newAudit.date} onChange={e => setNewAudit({...newAudit, date: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Initialize Cycle</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
