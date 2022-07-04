import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const [connection, updateConnection] = useState(getConnection());
  const [isOnline, setIsOnline] = useState(!!getConnection().rtt);

  const getConnection = () => {
    return (
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection
    );
  };

  useEffect(() => {
    const updateStatus = () => {
      updateConnection(getConnection());
      setIsOnline(!!getConnection().rtt);
    };

    connection.addEventListener('change', updateStatus);
    return () => connection.removeEventListener('change', updateStatus);
  }, connection);

  return [isOnline, connection];
};
