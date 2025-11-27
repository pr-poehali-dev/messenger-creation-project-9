import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

console.log('[Peeky] App starting...');

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: any, info: any) {
    console.error('React Error:', error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>Произошла ошибка</h1>
          <p>Пожалуйста, обновите страницу</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '10px' }}>
            Обновить
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('[Peeky] Checking root element...');

try {
  const root = document.getElementById('root');
  if (!root) {
    console.error('[Peeky] Root element not found!');
    throw new Error('Root element not found');
  }
  
  console.log('[Peeky] Root found, creating React app...');
  
  createRoot(root).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log('[Peeky] React app mounted successfully!');
} catch (error) {
  console.error('[Peeky] Failed to mount app:', error);
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif; background: white; min-height: 100vh;"><h1 style="color: #7c3aed;">Ошибка загрузки Peeky</h1><p>Попробуйте обновить страницу или проверьте консоль разработчика (F12)</p><button onclick="location.reload()" style="padding: 10px 20px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;">Обновить</button></div>';
}