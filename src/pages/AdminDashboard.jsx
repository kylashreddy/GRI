import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');
  const [sentNotifications, setSentNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('notifications');
  const { addNotification, notifications } = useNotifications();
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const userRole = localStorage.getItem('userRole')?.trim();
    if (userRole !== 'admin') {
      navigate('/login');
    }
    
    // Fetch notifications from Firestore
    fetchNotifications();
    // Fetch users from Firestore
    fetchUsers();
    // Fetch contacts from Firestore
    fetchContacts();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const contactsCollection = collection(db, 'contact_us');
      const snapshot = await getDocs(contactsCollection);
      const contactsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsList);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: 'admin' });
      fetchUsers();
      alert('User promoted to admin!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const removeAdmin = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: 'user' });
      fetchUsers();
      alert('Admin privileges removed!');
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await deleteDoc(doc(db, 'contact_us', contactId));
      fetchContacts();
      alert('Contact deleted!');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  // Update sent notifications when notifications change
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      try {
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole')?.trim();
        
        if (!userId || userRole !== 'admin') {
          alert('You do not have permission to send notifications.');
          return;
        }

        // Create notification in Firestore
        const notificationRef = await addDoc(collection(db, 'notifications'), {
          message: message.trim(),
          adminId: userId,
          createdAt: serverTimestamp(),
          read: false
        });

        // Add to notification context
        addNotification({
          message: message.trim(),
        });

        // Create new notification for display
        const newNotification = {
          id: notificationRef.id,
          message,
          timestamp: new Date().toISOString()
        };

        // Save to sent notifications
        const updatedNotifications = [newNotification, ...sentNotifications];
        setSentNotifications(updatedNotifications);

        // Clear form
        setMessage('');

        // Refresh notifications list
        fetchNotifications();

        // Show success message
        alert('Notification sent successfully!');
      } catch (error) {
        console.error('Error sending notification:', error);
        alert('Failed to send notification. Error: ' + error.message);
      }
    }
  };

  const fetchNotifications = async () => {
    try {
      const notificationsCollection = collection(db, 'notifications');
      const snapshot = await getDocs(notificationsCollection);
      const notificationsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSentNotifications(notificationsList);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'notifications' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={activeTab === 'users' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={activeTab === 'contacts' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('contacts')}
        >
          Contact Forms ({contacts.length})
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'notifications' && (
          <>
            <div className="send-notification-section">
              <h3>Send New Notification</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="message">Notification Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4"
                    placeholder="Enter notification message..."
                  />
                </div>
                <button
                  type="submit"
                  className="send-button"
                >
                  SEND NOTIFICATION
                </button>
              </form>
            </div>
            
            <div className="sent-notifications-section">
              <h3>Sent Notifications</h3>
              {sentNotifications.length === 0 ? (
                <p>No notifications sent yet.</p>
              ) : (
                <div className="sent-notifications-list">
                  {sentNotifications.map(notification => (
                    <div key={notification.id} className="sent-notification-item">
                      <p>{notification.message}</p>
                      <small>Sent: {formatDate(notification.timestamp)}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h3>Manage Users</h3>
            {users.length === 0 ? (
              <p>No users yet.</p>
            ) : (
              <div className="users-list">
                {users.map(user => (
                  <div key={user.id} className="user-item">
                    <div className="user-info">
                      <p><strong>{user.email}</strong></p>
                      <p>Role: <span style={{ fontWeight: 'bold', color: user.role === 'admin' ? '#d9534f' : '#5cb85c' }}>
                        {user.role || 'user'}
                      </span></p>
                      <p>Created: {formatDate(user.createdAt?.toDate?.().toISOString() || user.createdAt)}</p>
                      <p>Last Login: {formatDate(user.lastLogin?.toDate?.().toISOString() || user.lastLogin)}</p>
                    </div>
                    <div className="user-actions">
                      {user.role === 'admin' ? (
                        <button 
                          onClick={() => removeAdmin(user.id)}
                          style={{ background: '#5cb85c', color: 'white' }}
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button 
                          onClick={() => makeAdmin(user.id)}
                          style={{ background: '#d9534f', color: 'white' }}
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="contacts-section">
            <h3>Contact Form Submissions</h3>
            {contacts.length === 0 ? (
              <p>No contact submissions yet.</p>
            ) : (
              <div className="contacts-list">
                {contacts.map(contact => (
                  <div key={contact.id} className="contact-item">
                    <div className="contact-info">
                      <p><strong>Name:</strong> {contact.name || 'N/A'}</p>
                      <p><strong>Email:</strong> {contact.email || 'N/A'}</p>
                      <p><strong>Subject:</strong> {contact.subject || 'N/A'}</p>
                      <p><strong>Message:</strong> {contact.message || 'N/A'}</p>
                      <p><strong>Submitted:</strong> {formatDate(contact.createdAt?.toDate?.().toISOString() || contact.createdAt)}</p>
                    </div>
                    <div className="contact-actions">
                      <button 
                        onClick={() => deleteContact(contact.id)}
                        style={{ background: '#d9534f', color: 'white' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;