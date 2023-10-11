import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(4);
  const [showPrivate, setShowPrivate] = useState(false);

  useEffect(() => {
    fetch('/notifications.json')
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: notification.id === id ? true : notification.read,
    }));

    if (id === 4) {
      setShowPrivate(!showPrivate);
    }

    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter((notification) => !notification.read).length);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 text-veryDarkGray">
      <div className="note max-w-[730px] mx-auto bg-white rounded-2xl shadow p-6">
        <div className='flex justify-between'>
          <div className='flex gap-[11px]'>
            <h1 className="text-xl md:text-2xl font-[800]">Notifications</h1>
            <div className="flex mt-1 justify-center bg-blueBg w-[32px] h-[25px] text-white rounded-md">
              {unreadCount}
            </div>
          </div>
          
          <button
            onClick={markAllAsRead}
            className="text-blue py-2 px-4 rounded-lg mb-4 text-[14px] md:text-[16px] font-[500]"
          >
            Mark all as read
          </button>
        </div>
        
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`${
                notification.read ? 'bg-white' : 'bg-snow'
              } hover:bg-snow p-4 mb-2 rounded-lg`}
              onClick={() => handleNotificationClick(notification.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className='flex gap-2 md:gap-6 py-2'>
                <img src={notification.image} className='w-[39px] h-[39px] md:w-[45px] md:h-[45px] ' alt="profile picture" />
                <div className='flex-col text-[14px] md:text-[16px]'>
                  <div className="md:flex items-center">
                    <span className="font-[800]">{notification.name}</span>
                    <span className='px-2'>{notification.message}</span>
                    {notification.id === 5 ? (
                      <img src={notification.image2} className='w-[39px] h-[39px] md:ml-32' alt="" />
                    ) : null}
                    
                    {notification.id === 1 ? (
                      <span className='font-[800] text-blue'>{notification.details}</span>
                    ) : null}
                    {notification.id === 6 ? (
                      <span className='font-[800] text-darkGray hidden'>{notification.detail1}</span>
                    ) : null}
                    {notification.id === 6 ? (
                      <span className='font-[800] text-darkGray md:hidden'>{notification.detail1} {notification.detail2}</span>
                    ) : null}
                    <span className='text-blue font-[800] px-1'>{notification.group}</span>
                    
                    {notification.read ? (
                      ""
                    ) : (
                      <button className="w-2 h-2 rounded-full bg-red-500 mr-2 md:mr-4" />
                    )}
                    
                    
                  </div>
                  {notification.id === 6 ? (
                    <span className='font-[800] text-darkGray hidden'>{notification.detail2}</span>
                  ) : null}
                  <span className='text-grayBlue text-[13px] md:text-[16px]'>{notification.time}</span>
                  {notification.id === 4 ? (
                    <p className={`px-3 md:px-5 py-4 bg-lightGray mt-2 w-[240px] md:w-[566px] md:h-[97px] ${showPrivate ? 'block' : 'hidden'}`}>
                      {notification.private}
                    </p>
                  ) : null}  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
