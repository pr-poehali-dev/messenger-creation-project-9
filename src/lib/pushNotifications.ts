const NOTIFICATIONS_API = 'https://functions.poehali.dev/73a408ce-5dac-4c29-a3ed-0ea01ac6aedd';

export async function requestNotificationPermission(): Promise<string | null> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return null;
  }

  if (Notification.permission === 'granted') {
    return await getFirebaseToken();
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await getFirebaseToken();
    }
  }

  return null;
}

async function getFirebaseToken(): Promise<string | null> {
  try {
    const { getMessaging, getToken } = await import('firebase/messaging');
    const { initializeApp } = await import('firebase/app');

    const firebaseConfig = {
      apiKey: "AIzaSyBqxL-example",
      authDomain: "messenger-example.firebaseapp.com",
      projectId: "messenger-example",
      storageBucket: "messenger-example.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456"
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY_HERE'
    });

    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export async function registerPushToken(authToken: string): Promise<boolean> {
  const pushToken = await requestNotificationPermission();
  
  if (!pushToken) {
    return false;
  }

  try {
    const response = await fetch(`${NOTIFICATIONS_API}?action=register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken
      },
      body: JSON.stringify({ push_token: pushToken })
    });

    return response.ok;
  } catch (error) {
    console.error('Error registering push token:', error);
    return false;
  }
}

export async function togglePushNotifications(authToken: string, enabled: boolean): Promise<boolean> {
  try {
    const response = await fetch(`${NOTIFICATIONS_API}?action=toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken
      },
      body: JSON.stringify({ enabled })
    });

    return response.ok;
  } catch (error) {
    console.error('Error toggling push notifications:', error);
    return false;
  }
}

export function listenToMessages(onMessage: (payload: any) => void) {
  if (!('Notification' in window)) {
    return;
  }

  import('firebase/messaging').then(({ getMessaging, onMessage: onFCMMessage }) => {
    import('firebase/app').then(({ initializeApp }) => {
      const firebaseConfig = {
        apiKey: "AIzaSyBqxL-example",
        authDomain: "messenger-example.firebaseapp.com",
        projectId: "messenger-example",
        storageBucket: "messenger-example.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456"
      };

      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      onFCMMessage(messaging, (payload) => {
        onMessage(payload);
      });
    });
  });
}
