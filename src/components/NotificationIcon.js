import React from 'react';

const NotificationIcon = ({ overdueCount, dueCount }) => {
  const totalNotifications = overdueCount + dueCount;

  return (
    <div className="notification-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="icon">
        <path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6V7a6 6 0 1 0-12 0v9l-2 2v1h16v-1l-2-2z"></path>
      </svg>
      {totalNotifications > 0 && (
        <div className="notification-badge">
          {totalNotifications}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
