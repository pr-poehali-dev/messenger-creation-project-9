const PUBLIC_VAPID_KEY = 'BNxWF_nSSh7u3mF_JKvD5y3h8VTSqZE4F8Hx7m9P4WzJ3dK2vN5tR8wQ1bC6fG9hL2kM4nP7rS0uV3xY6zA9B';

export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Push notification permission denied');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      return existingSubscription;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await savePushSubscription(subscription);
    
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
}

async function savePushSubscription(subscription: PushSubscription): Promise<void> {
  const token = localStorage.getItem('chat_auth');
  if (!token) return;

  const authData = JSON.parse(token);
  
  try {
    await fetch('https://functions.poehali.dev/349e57c3-d568-47bc-9b6a-3d8bcefee4d7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authData.token
      },
      body: JSON.stringify({
        action: 'subscribe',
        subscription: subscription.toJSON()
      })
    });
  } catch (error) {
    console.error('Failed to save push subscription:', error);
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function unsubscribeFromPushNotifications(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
    }
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
  }
}