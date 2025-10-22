import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';

// Create the notification context
export const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotifications = () => useContext(NotificationContext);

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isUserAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();

    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Load notifications from Firestore only if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const setupRealtimeListener = () => {
      try {
        const notificationsCollection = collection(db, 'notifications');

        // Set up real-time listener
        const unsubscribe = onSnapshot(notificationsCollection, (snapshot) => {
          const firestoreNotifications = snapshot.docs.map(doc => ({
            id: doc.id,
            read: false,
            ...doc.data(),
            timestamp: doc.data().createdAt?.toDate?.().toISOString() || doc.data().createdAt
          }));

          // Sort by newest first
          firestoreNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          setNotifications(firestoreNotifications);

          // Count unread notifications
          const unread = firestoreNotifications.filter(notification => !notification.read).length;
          setUnreadCount(unread);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error setting up notifications listener:', error);
        return null;
      }
    };

    const unsubscribe = setupRealtimeListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated]);
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update unread count
    const unread = notifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
  }, [notifications]);
  
  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount,
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        deleteNotification,
        clearAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};