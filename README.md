# VaxSafe - Vaccination Management System

VaxSafe is a comprehensive vaccination management system built with Spring Boot and React. It provides a platform for managing vaccination centers, appointments, and vaccine records efficiently.

## 🚀 Features

- User authentication and authorization
- Appointment scheduling and management
- Vaccination center management
- Vaccine inventory tracking
- Role-based access control
- User profile management
- Responsive design for all devices

## 🛠 Technology Stack

### Backend
- Java Spring Boot
- Maven
- Spring Security
- Spring Data JPA

### Frontend
- React
- Vite
- Redux for state management
- Axios for API calls
- SCSS for styling

## 📦 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- npm/yarn
- Maven

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mhieu100/vaxsafe-monolithic.git
   cd vaxsafe-monolithic
   ```

2. **Backend Setup**
   ```bash
   cd backend
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```
   The backend server will start at `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend development server will start at `http://localhost:5173`

## 📁 Project Structure

```
├── backend/              # Spring Boot backend
│   ├── src/             # Source files
│   ├── pom.xml          # Maven dependencies
│   └── assets/          # Uploaded files
├── frontend/            # React frontend
│   ├── src/            
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── config/     # API configurations
│   │   └── redux/      # Redux store and slices
│   └── public/         # Static assets
```

## 🔐 Environment Variables

### Backend
Create `application.properties` in `backend/src/main/resources/`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Frontend
Create `.env` in the frontend directory:
```env
VITE_API_URL=http://localhost:8080/api
```