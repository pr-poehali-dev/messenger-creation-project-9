export default function Test() {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  const screenInfo = typeof window !== 'undefined' ? {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  } : {};

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif',
      background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3, #eff6ff)',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#7c3aed', fontSize: '24px', marginBottom: '20px' }}>
        ✅ Peeky загружен успешно!
      </h1>
      
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#7c3aed' }}>
          Информация об устройстве:
        </h2>
        <pre style={{ 
          fontSize: '12px', 
          overflow: 'auto', 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '6px' 
        }}>
          {JSON.stringify({ userAgent, screenInfo }, null, 2)}
        </pre>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#7c3aed' }}>
          Статус:
        </h2>
        <p style={{ color: '#10b981', fontWeight: 600, fontSize: '16px' }}>
          ✓ React загружен
        </p>
        <p style={{ color: '#10b981', fontWeight: 600, fontSize: '16px' }}>
          ✓ Роутинг работает
        </p>
        <p style={{ color: '#10b981', fontWeight: 600, fontSize: '16px' }}>
          ✓ Компоненты рендерятся
        </p>
      </div>

      <a 
        href="/" 
        style={{ 
          display: 'inline-block',
          marginTop: '20px',
          padding: '12px 24px',
          background: '#7c3aed',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600
        }}
      >
        Перейти на главную →
      </a>
    </div>
  );
}
