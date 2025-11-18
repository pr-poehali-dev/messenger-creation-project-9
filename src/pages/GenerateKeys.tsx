import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function GenerateKeys() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

  const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const generateKeys = async () => {
    setLoading(true);
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'ECDSA',
          namedCurve: 'P-256'
        },
        true,
        ['sign', 'verify']
      );

      const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
      const privateKeyBuffer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

      const publicKeyBase64 = arrayBufferToBase64Url(publicKeyBuffer);
      const privateKeyBase64 = arrayBufferToBase64Url(privateKeyBuffer);

      setPublicKey(publicKeyBase64);
      setPrivateKey(privateKeyBase64);
    } catch (error) {
      alert('Ошибка генерации ключей: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'public' | 'private') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'public') {
        setCopiedPublic(true);
        setTimeout(() => setCopiedPublic(false), 2000);
      } else {
        setCopiedPrivate(true);
        setTimeout(() => setCopiedPrivate(false), 2000);
      }
    } catch (error) {
      alert('Не удалось скопировать');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Icon name="Key" size={32} className="text-primary" />
            Генератор VAPID ключей
          </CardTitle>
          <CardDescription className="text-base">
            Для настройки push-уведомлений в Peeky
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Button
            onClick={generateKeys}
            disabled={loading}
            className="w-full text-lg py-6"
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                Генерация...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={20} className="mr-2" />
                Сгенерировать ключи
              </>
            )}
          </Button>

          {publicKey && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-center text-5xl mb-4">
                ✅
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                  <Icon name="KeyRound" size={16} />
                  Public Key (Публичный ключ)
                </div>
                <div className="bg-white p-3 rounded border font-mono text-xs break-all text-slate-700">
                  {publicKey}
                </div>
                <Button
                  onClick={() => copyToClipboard(publicKey, 'public')}
                  variant={copiedPublic ? "default" : "secondary"}
                  className="w-full"
                >
                  {copiedPublic ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Icon name="Copy" size={16} className="mr-2" />
                      Скопировать
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                  <Icon name="Lock" size={16} />
                  Private Key (Приватный ключ)
                </div>
                <div className="bg-white p-3 rounded border font-mono text-xs break-all text-slate-700">
                  {privateKey}
                </div>
                <Button
                  onClick={() => copyToClipboard(privateKey, 'private')}
                  variant={copiedPrivate ? "default" : "secondary"}
                  className="w-full"
                >
                  {copiedPrivate ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Icon name="Copy" size={16} className="mr-2" />
                      Скопировать
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} />
                  Что делать дальше:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-amber-900">
                  <li>Нажмите <strong>"Скопировать"</strong> под Public Key</li>
                  <li>Вставьте его в поле <strong>VAPID_PUBLIC_KEY</strong> в настройках</li>
                  <li>Нажмите <strong>"Скопировать"</strong> под Private Key</li>
                  <li>Вставьте его в поле <strong>VAPID_PRIVATE_KEY</strong> в настройках</li>
                  <li>Готово! Push-уведомления заработают 🚀</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
