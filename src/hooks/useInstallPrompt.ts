import { useState, useEffect } from 'react';
import { useIOSDetection } from './useIOSDetection';

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const isIOS = useIOSDetection();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowIOSPrompt(false);
    };

    // Show iOS prompt if not already installed
    if (isIOS && !window.navigator.standalone) {
      const hasShownPrompt = localStorage.getItem('iosInstallPromptShown');
      if (!hasShownPrompt) {
        setShowIOSPrompt(true);
        localStorage.setItem('iosInstallPromptShown', 'true');
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isIOS]);

  const promptToInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return {
    isInstallable: !!deferredPrompt,
    isIOS,
    showIOSPrompt,
    promptToInstall,
    hideIOSPrompt: () => setShowIOSPrompt(false),
  };
}