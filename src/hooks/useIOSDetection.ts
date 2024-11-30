import { useEffect, useState } from 'react';

export function useIOSDetection() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkIsIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    setIsIOS(checkIsIOS());
  }, []);

  return isIOS;
}