# Smart Nutrition & Fitness AI

A comprehensive health platform that leverages AI to simplify nutrition tracking, meal planning, and workout management. The application provides personalized diet plans, real-time meal analysis via computer vision, and an interactive AI health assistant.

**Live Website:** [minor-project-1-gl4t.onrender.com](https://minor-project-1-gl4t.onrender.com)

---

## 🚀 Features

### 🥗 AI Nutrition & Diet
- **Personalized Diet Plans**: Generates custom weekly menus based on user metrics (BMR, activity level, health goals).
- **Macro Distribution**: Automatic calculation of Protein, Carbs, and Fats split.
- **Recipe Discovery**: Detailed instructions and ingredient lists for across various cuisines.

### 📸 AI Vision Scanner
- **Meal Recognition**: Upload images of meals to get instant nutritional estimates using AI vision.
- **Portion Analysis**: Identifies ingredients and estimates calorie density from photos.

### 💬 AI Health Assistant
- **Interactive Chat**: A specialized bot to answer nutrition queries, suggest meal replacements, and provide fitness tips.

### 🏋️ Fitness Tracking
- **Workout Planner**: AI-generated routines tailored to user goals (Gym, Home, or Bodyweight).
- **Workout Logger**: Seamlessly track sets, reps, and volume to monitor progressive overload.
- **Mass Trajectory**: Interactive charts to visualize weight trends and "Mass Delta" changes.

---

## 💻 Tech Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Recharts** (Data Visualization)
- **Lucide React** (Iconography)
- **Axios** (API Communication)

### Backend
- **Node.js** & **Express**
- **MongoDB** with **Mongoose** (Database)
- **JWT** (Authentication)
- **Cookie-Parser** (Secure session management)
- **Multer** & **Cloudinary** (Image handling)

---

## 🛠️ Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/abhineet1509/Minor-project.git
cd Minor-project
```

### 2. Backend Configuration
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Configuration
Navigate to the `client` directory and install dependencies:
```bash
cd ../client
npm install
```
Start the frontend:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

