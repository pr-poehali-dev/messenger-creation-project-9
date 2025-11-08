# 🚀 Новые возможности мессенджера

## ✅ Реализованные функции

### 📞 Видео и аудио звонки (WebRTC)

**Компоненты:**
- `CallWindow.tsx` - UI для видео/аудио звонков
- `src/lib/webrtc.ts` - API для управления звонками

**Использование:**
```tsx
import CallWindow from '@/components/CallWindow';
import { webrtcApi } from '@/lib/webrtc';

// Инициировать звонок
const callId = await webrtcApi.initiateCall(userId, 'video'); // или 'audio'

// Показать окно звонка
<CallWindow
  callType="video"
  isOutgoing={true}
  otherUser={{ id: 2, name: "Иван" }}
  onEndCall={() => webrtcApi.endCall(callId)}
/>
```

### 🎤 Голосовые сообщения

**Компонент:** `VoiceRecorder.tsx`

**Использование:**
```tsx
import VoiceRecorder from '@/components/VoiceRecorder';

<VoiceRecorder
  onRecordingComplete={(audioBlob, duration) => {
    // Загрузить голосовое сообщение
    const reader = new FileReader();
    reader.onload = async () => {
      await chatsApi.uploadMedia(
        messageId, 
        'audio', 
        reader.result as string, 
        duration
      );
    };
    reader.readAsDataURL(audioBlob);
  }}
  onCancel={() => console.log('Запись отменена')}
/>
```

### 📎 Медиа-сообщения

**Типы:** видео, аудио, изображения, стикеры

**Компонент:** `MediaMessage.tsx`

**Использование:**
```tsx
import MediaMessage from '@/components/MediaMessage';

<MediaMessage message={message} />
```

**API:**
```tsx
// Загрузить медиа
await chatsApi.uploadMedia(messageId, mediaType, mediaData, duration);
```

### 😊 Реакции на сообщения

**Компонент:** `MessageReactions.tsx`

**Использование:**
```tsx
import MessageReactions from '@/components/MessageReactions';

<MessageReactions
  reactions={message.reactions || []}
  onAddReaction={(reaction) => chatsApi.addReaction(message.id, reaction)}
  onRemoveReaction={(reactionId) => chatsApi.removeReaction(reactionId)}
  currentUserId={currentUser.id}
/>
```

**API:**
```tsx
// Добавить реакцию
await chatsApi.addReaction(messageId, '❤️');

// Удалить реакцию
await chatsApi.removeReaction(reactionId);
```

### 🗑️ Удаление сообщений

**Функция:** Удаление без возврата (permanent delete)

**API:**
```tsx
// Удалить сообщение навсегда
await chatsApi.deleteMessage(messageId);
```

**Особенности:**
- Сообщение помечается как удаленное в БД
- При загрузке сообщений удаленные автоматически фильтруются
- Удаление сохраняется даже после перезагрузки страницы

## 🗄️ База данных

**Новые таблицы:**

1. `media_messages` - хранение медиа-контента
   - message_id, message_type, media_url, media_duration, media_thumbnail

2. `message_reactions` - реакции на сообщения
   - message_id, user_id, reaction, created_at

3. `removed_messages` - удаленные сообщения
   - message_id, removed_by, removed_at

4. `calls` - история звонков
   - chat_id, caller_id, receiver_id, call_type, status, duration

## 🔧 Backend API

**Endpoint:** `https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17`

**Новые действия:**

- `add_reaction` - добавить реакцию
- `remove_reaction` - удалить реакцию
- `delete_message` - удалить сообщение
- `upload_media` - загрузить медиа-файл
- `initiate_call` - начать звонок
- `end_call` - завершить звонок
- `contacts` - получить список контактов

## 📝 Типы TypeScript

```typescript
type MessageReaction = {
  id: number;
  reaction: string;
  user_id: number;
  username: string;
};

type Message = {
  // ... существующие поля
  message_type?: 'text' | 'audio' | 'video' | 'image' | 'sticker';
  media_url?: string;
  media_duration?: number;
  media_thumbnail?: string;
  reactions?: MessageReaction[];
  is_removed?: number;
};

type Call = {
  id: number;
  chat_id: number;
  caller_id: number;
  receiver_id: number;
  call_type: 'video' | 'audio';
  status: 'pending' | 'active' | 'ended' | 'rejected';
  started_at: string;
  ended_at?: string;
  duration?: number;
};
```

## 🎯 Следующие шаги для интеграции

1. **Добавить кнопки звонков в чат:**
   - Видео звонок, аудио звонок в хедере чата

2. **Интегрировать VoiceRecorder в ввод сообщений:**
   - Кнопка микрофона рядом с кнопкой отправки

3. **Добавить загрузку файлов:**
   - Кнопка "прикрепить" для загрузки изображений/видео

4. **Показывать реакции под сообщениями:**
   - Интегрировать MessageReactions в компонент сообщения

5. **Добавить контекстное меню сообщения:**
   - Удалить, ответить, переслать, реакция

6. **Real-time обновления:**
   - WebSocket для мгновенного получения новых реакций и звонков
