import { useEffect, useState } from 'react';

export function useAndroidDetection() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const checkIsAndroid = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /android/.test(userAgent);
    };

    setIsAndroid(checkIsAndroid());
  }, []);

  return isAndroid;
}