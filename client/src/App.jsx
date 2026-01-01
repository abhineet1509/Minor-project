import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Onboarding from './pages/Onboarding';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import DietPlan from './pages/DietPlan';
import MealDetails from './pages/MealDetails';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';
import Chat from './pages/Chat';
import HealthHub from './pages/HealthHub';
import BMICalculator from './pages/BMICalculator';
import Yoga from './pages/Yoga';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminDietUpload from './pages/Admin/AdminDietUpload';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminRoute from './components/AdminRoute';
import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import Disclaimer from './pages/Legal/Disclaimer';
import WorkoutPlanner from './pages/WorkoutPlanner';
import ExerciseLibrary from './pages/ExerciseLibrary';
import WorkoutLogger from './pages/WorkoutLogger';
import Analytics from './pages/Analytics';
import FoodRecognition from './pages/FoodRecognition';
import Community from './pages/Community';
import TestAuth from './pages/TestAuth';

import ProtectedRoute from './components/ProtectedRoute'; // Add this import

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/diet-plan" element={<DietPlan />} />
              <Route path="/workout-planner" element={<WorkoutPlanner />} />
              <Route path="/exercise-library" element={<ExerciseLibrary />} />
              <Route path="/workout-logger" element={<WorkoutLogger />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/food-recognition" element={<FoodRecognition />} />
              <Route path="/community" element={<Community />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/yoga" element={<Yoga />} />
            </Route>
          </Route>

          {/* Public/Non-Protected Routes wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/health" element={<HealthHub />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Legal Routes */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Route>

          {/* Admin Routes - Protected */}
          <Route element={<AdminRoute />}>
            <Route element={<Layout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/upload-diet" element={<AdminDietUpload />} />
            </Route>
          </Route>

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
