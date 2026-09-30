import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import WhyChooseUs from './pages/WhyChooseUs'
import CaseStudies from './pages/CaseStudies'
import Careers from './pages/Careers'
import CaseStudyDataMigration from './pages/case-studies/CaseStudyDataMigration'
import CaseStudyDataIntegration from './pages/case-studies/CaseStudyDataIntegration'
import CaseStudyAIML from './pages/case-studies/CaseStudyAIML'
import CaseStudyDataWarehouse from './pages/case-studies/CaseStudyDataWarehouse'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminContacts from './pages/admin/AdminContacts'
import AdminApplications from './pages/admin/AdminApplications'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth()
  
  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

function App() {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/why-choose-us" element={<><Navbar /><WhyChooseUs /></>} />
              <Route path="/case-studies" element={<><Navbar /><CaseStudies /></>} />
              <Route path="/careers" element={<><Navbar /><Careers /></>} />
              <Route path="/case-studies/data-migration" element={<><Navbar /><CaseStudyDataMigration /></>} />
              <Route path="/case-studies/data-integration" element={<><Navbar /><CaseStudyDataIntegration /></>} />
              <Route path="/case-studies/ai-ml" element={<><Navbar /><CaseStudyAIML /></>} />
              <Route path="/case-studies/data-warehouse" element={<><Navbar /><CaseStudyDataWarehouse /></>} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/contacts" 
                element={
                  <ProtectedRoute>
                    <AdminContacts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/applications" 
                element={
                  <ProtectedRoute>
                    <AdminApplications />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AdminAuthProvider>
    </ThemeProvider>
  )
}

export default App
