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
    script.onload = () => {
      setScriptLoaded(true);
      addPaypalButton();
    };
    document.body.appendChild(script);
  };

  const addPaypalButton = () => {
    window.paypal
      .Buttons({
        createOrder: function () {
          return fetch('/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [
                {
                  id: 1,
                  quantity: 2,
                },
                { id: 2, quantity: 3 },
              ],
            }),
          })
            .then((res) => {
              if (res.ok) return res.json();
              return res.json().then((json) => Promise.reject(json));
            })
            .then(({ id }) => {
              return id;
            })
            .catch((e) => {
              console.error(e.error);
            });
        },
        onApprove: function (data, actions) {
          return actions.order.capture();
        },
      })
      .render('#paypal');
  };

  useEffect(() => {
    addPaypalScript();
  });

  return { scriptLoaded };
};

export default usePaypal;
