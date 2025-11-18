// Скрипт для генерации VAPID ключей
// Запустите: node generate-vapid-keys.js

const crypto = require('crypto');

function urlBase64(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateVAPIDKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'prime256v1',
    publicKeyEncoding: {
      type: 'spki',
      format: 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der'
    }
  });

  const publicKeyBase64 = urlBase64(publicKey);
  const privateKeyBase64 = urlBase64(privateKey);

  return {
    publicKey: publicKeyBase64,
    privateKey: privateKeyBase64
  };
}

const keys = generateVAPIDKeys();

console.log('\n=================================');
console.log('VAPID КЛЮЧИ СГЕНЕРИРОВАНЫ');
console.log('=================================\n');

console.log('📋 Public Key (Публичный ключ):');
console.log(keys.publicKey);
console.log('\n📋 Private Key (Приватный ключ):');
console.log(keys.privateKey);

console.log('\n=================================');
console.log('ЧТО ДЕЛАТЬ ДАЛЬШЕ:');
console.log('=================================');
console.log('1. Скопируйте Public Key');
console.log('2. Вставьте его в поле VAPID_PUBLIC_KEY');
console.log('3. Скопируйте Private Key');
console.log('4. Вставьте его в поле VAPID_PRIVATE_KEY');
console.log('=================================\n');
