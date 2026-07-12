# AssetFlow

AssetFlow is a full-stack Enterprise Asset and Resource Management System designed to help organizations efficiently manage physical assets and shared resources through a centralized platform. The application streamlines asset registration, allocation, maintenance, auditing, and resource booking while providing secure role-based access control and operational insights.

## Overview

Organizations often rely on manual spreadsheets and paper-based processes to manage assets, resulting in inefficient tracking, allocation conflicts, and limited visibility. AssetFlow addresses these challenges by providing a scalable and user-friendly solution that enables real-time asset monitoring and lifecycle management.

## Key Features

- Secure Authentication and Role-Based Access Control (RBAC)
- Department and Employee Management
- Asset Registration and Lifecycle Tracking
- Asset Allocation and Transfer Management
- Shared Resource Booking with Conflict Validation
- Maintenance Request and Approval Workflow
- Asset Audit and Discrepancy Tracking
- Dashboard with Real-Time Analytics
- Notifications and Activity Logs
- Responsive User Interface with Light and Dark Mode Support

## Technology Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- shadcn/ui
- React Router
- Recharts

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MongoDB Atlas
- Mongoose

### Development Tools
- Git & GitHub
- Postman
- Vercel
- Render

## User Roles

- **Administrator**
  - Manage departments, asset categories, employees, and organizational settings.

- **Asset Manager**
  - Register assets, manage allocations, approve transfers, and oversee maintenance requests.

- **Department Head**
  - Monitor departmental assets and approve allocation and transfer requests.

- **Employee**
  - View assigned assets, book shared resources, and submit maintenance requests.

## Core Modules

- Authentication
- Dashboard
- Organization Setup
- Asset Registration
- Asset Allocation and Transfer
- Resource Booking
- Maintenance Management
- Asset Audit
- Reports and Analytics
- Notifications and Activity Logs

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/AssetFlow.git
```

Install dependencies:

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

Run the application:

```bash
# Frontend
cd client
npm run dev

# Backend
cd server
npm run dev
```

## Project Structure

```
AssetFlow/
├── client/
├── server/
├── docs/
└── README.md
```

## Future Enhancements

- QR Code-based Asset Tracking
- Barcode Scanning Support
- Email and Push Notifications
- Advanced Analytics Dashboard
- Mobile Application
- Cloud Storage Integration

## License

This project was developed for educational and hackathon purposes. It may be extended and modified for future academic or commercial use.
