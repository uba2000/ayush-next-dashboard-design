import { useEffect, useState } from 'react';

const usePaypal = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');

    script.src =
      'https://www.paypal.com/sdk/js?client-id=AUHn0tc5ZcfkO7czdWxAqEFyvZpHNb1j-jmxYOl-E-mPrXOalTcEAzM4lzLA9Bd3rj8dEmtMWta20Ktg';

    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPaypalScript();
  });

  return { scriptLoaded };
};

export default usePaypal;
