import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/recent-activity`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setRecentActivity(data.activity || []);
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'reviewed': return '#3b82f6';
      case 'responded': return '#10b981';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <i className="fas fa-chart-line"></i>
          </div>
          <h2>DAIC Admin</h2>
          <p>{admin?.username}</p>
        </div>
        <nav className="admin-nav">
          <a href="/admin/dashboard" className="active">
            <i className="fas fa-home"></i>
            Dashboard
          </a>
          <a href="/admin/contacts">
            <i className="fas fa-envelope"></i>
            Contacts
          </a>
          <a href="/admin/applications">
            <i className="fas fa-file-alt"></i>
            Applications
          </a>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <div className="header-content">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back, {admin?.username}</p>
            </div>
            <div className="header-actions">
              <button className="refresh-btn" onClick={() => { fetchStats(); fetchRecentActivity(); }}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="stat-content">
              <h3>Total Contacts</h3>
              <p className="stat-number">{stats?.contactCount || 0}</p>
              <span className="stat-change">+{stats?.contactCount || 0} total</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="stat-content">
              <h3>Total Applications</h3>
              <p className="stat-number">{stats?.applicationCount || 0}</p>
              <span className="stat-change">+{stats?.applicationCount || 0} total</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3>Pending Contacts</h3>
              <p className="stat-number">{stats?.pendingContacts || 0}</p>
              <span className="stat-change pending">Needs attention</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-clock"></i>
            </div>
            <div className="stat-content">
              <h3>Pending Applications</h3>
              <p className="stat-number">{stats?.pendingApplications || 0}</p>
              <span className="stat-change pending">Needs review</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="recent-activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.length === 0 ? (
                <p className="no-activity">No recent activity</p>
              ) : (
                recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <i className={`fas ${activity.type === 'contact' ? 'fa-envelope' : 'fa-file-alt'}`}></i>
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">
                        {activity.type === 'contact' ? 'New Contact' : 'New Application'}
                      </p>
                      <p className="activity-description">
                        {activity.type === 'contact' 
                          ? `${activity.first_name} ${activity.last_name} sent a message`
                          : `${activity.first_name} ${activity.last_name} applied for ${activity.position}`
                        }
                      </p>
                      <p className="activity-time">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="activity-status" style={{ backgroundColor: getStatusColor(activity.status) }}>
                      {activity.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button onClick={() => navigate('/admin/contacts')} className="action-btn">
                <i className="fas fa-envelope"></i>
                View Contacts
              </button>
              <button onClick={() => navigate('/admin/applications')} className="action-btn">
                <i className="fas fa-file-alt"></i>
                View Applications
              </button>
              <button onClick={() => { fetchStats(); fetchRecentActivity(); }} className="action-btn">
                <i className="fas fa-sync-alt"></i>
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
