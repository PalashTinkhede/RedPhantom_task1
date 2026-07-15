import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import './App.css';

// Lazy-load the main dashboard for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Placeholder pages
import {
  UsersPage,
  ProjectsPage,
  TasksPage,
  AnalyticsPage,
  NotificationsPage,
  SettingsPage,
} from './pages/PlaceholderPages';

// Fallback spinner while lazy pages load
const PageLoader = () => (
  <div className="spinner-overlay" role="status" aria-label="Loading page">
    <div className="spinner" />
  </div>
);

// Protect dashboard routes — redirect to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Redirect authenticated users away from login
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public: Login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Public: Forgot Password placeholder */}
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#94a3b8', flexDirection: 'column', gap: '12px' }}>
              <h1 style={{ fontSize: '1.5rem', color: '#f1f5f9' }}>Forgot Password</h1>
              <p>Reset your password here.</p>
            </div>
          </PublicRoute>
        }
      />

      {/* Public: Sign Up placeholder */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#94a3b8', flexDirection: 'column', gap: '12px' }}>
              <h1 style={{ fontSize: '1.5rem', color: '#f1f5f9' }}>Sign Up</h1>
              <p>Create a new account here.</p>
            </div>
          </PublicRoute>
        }
      />

      {/* Protected: Dashboard layout with nested routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all: redirect to dashboard if logged in, login if not */}
      <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
