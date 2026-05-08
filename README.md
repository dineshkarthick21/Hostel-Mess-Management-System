# Hostel Management System

A comprehensive MERN stack application designed for efficient hostel and mess management. This system streamlines student registration, attendance tracking, invoice management, and complaint handling.

## Features

### Admin Panel
- [x] Student Registration & Management
- [x] Attendance Marking with Charts
- [x] Complaint Handling & Resolution
- [x] Mess Management & MessOff Requests
- [x] Invoice Generation & Tracking
- [x] Suggestion & Feedback Management
- [x] Hostel Settings & Configuration
- [x] Student Analytics & Reports

### Student Panel
- [x] View Attendance Records
- [x] Request Mess Off
- [x] View Invoices & Payment Status
- [x] File Complaints
- [x] Submit Suggestions
- [x] View Profile & Settings

### Public Features
- [x] Landing Page with Hostel Information
- [x] About Page with Hostel Details
- [x] Contact Form (Email Integration)
- [x] Authentication (Admin & Student)

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [EmailJS Account](https://www.emailjs.com/) (for contact form)

## Installation

### 1. Clone Repository
```sh
git clone https://github.com/dineshkarthick21/Hostel-Mess-Management-System.git
cd Hostel-MERN
```

### 2. Install Dependencies

#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../client
npm install
```

#### Root
```sh
cd ..
npm install
```

## Configuration

### 1. Environment Setup

Create a `.env` file in the `backend` folder:
```
MONGO_URI="mongodb://127.0.0.1:27017/hostel"
JWT_SECRET="Anappleadaykeepsthedoctoraway"
```

### 2. Database Setup
- Create a MongoDB database named `hostel`
- Import sample data from `mongoCollections/` folder:
  - Import `hostel.users.json` as `users` collection
  - Import `hostel.students.json` as `students` collection
  - Import `hostel.hostels.json` as `hostels` collection
  - Import other JSON files for remaining collections

### 3. EmailJS Setup (Contact Form)
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Create a new Email Service (Gmail recommended)
3. Create an Email Template with the following variables:
   - `to_email` - Recipient email address
   - `from_email` - Sender email
   - `subject` - Email subject
   - `message` - Email body
4. Update `Contact.jsx` with your credentials:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {...}, 'YOUR_PUBLIC_KEY')
   ```

## Running the Application

### Development Mode

#### Option 1: Run Both Servers Separately
Terminal 1 - Backend (runs on port 3000):
```sh
cd backend
npm start
```

Terminal 2 - Frontend (runs on port 5174):
```sh
cd client
npm run dev
```

#### Option 2: Run Concurrently (from root)
```sh
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3000

## Default Login Credentials

### Admin Account
- **Email**: muhammaddanish14@gmail.com
- **Password**: 123456789

### Student Account
- **Email**: ahad@gmail.com
- **Password**: 12345678

## Project Structure

```
Hostel-MERN/
├── backend/
│   ├── controllers/       # Business logic
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Helper functions
│   ├── constants/        # Constants
│   └── index.js          # Server entry point
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── assets/       # Images & static files
│   │   ├── utils/        # Utility functions
│   │   └── main.jsx      # Entry point
│   └── vite.config.js    # Vite configuration
├── mongoCollections/     # Sample data exports
└── package.json         # Root dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Students
- `GET /api/student/get-all-students` - Fetch all students
- `POST /api/student/register` - Register new student
- `PUT /api/student/:id` - Update student
- `DELETE /api/student/:id` - Delete student

### Attendance
- `GET /api/attendance/` - Get attendance records
- `POST /api/attendance/mark` - Mark attendance

### Admin
- `GET /api/admin/hostel` - Get hostel details
- `PUT /api/admin/hostel` - Update hostel details

### Complaints
- `GET /api/complaint/` - Get all complaints
- `POST /api/complaint/` - File new complaint

### Invoices
- `GET /api/invoice/` - Get invoices
- `POST /api/invoice/` - Create invoice

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Recharts (for analytics)
- EmailJS (for emails)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Contributing

Contributions are always welcome! 😊

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email ssdineshkarthick@gmail.com or open an issue in the repository.

---

**Last Updated**: May 2026  
**Status**: Active Development




