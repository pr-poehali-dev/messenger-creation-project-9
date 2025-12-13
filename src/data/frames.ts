export interface Frame {
  id: string;
  name: string;
  preview: string;
  cost: number;
  goldCost?: number;
  owned: boolean;
  style: {
    border?: string;
    boxShadow?: string;
    background?: string;
    borderImage?: string;
    borderWidth?: string;
    borderRadius?: string;
  };
}

export const FRAMES: Frame[] = [
  {
    id: 'frame-none',
    name: 'Без рамки',
    preview: '⭕',
    cost: 0,
    owned: true,
    style: {},
  },
  {
    id: 'frame-1',
    name: 'Золотое сияние',
    preview: '✨',
    cost: 50000,
    owned: false,
    style: {
      border: '6px solid',
      borderImage: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700) 1',
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)',
    },
  },
  {
    id: 'frame-2',
    name: 'Кристальный лёд',
    preview: '❄️',
    cost: 100000,
    owned: false,
    style: {
      border: '5px solid',
      borderImage: 'linear-gradient(135deg, #00FFFF, #0080FF, #00FFFF) 1',
      boxShadow: '0 0 40px rgba(0, 255, 255, 0.9), inset 0 0 25px rgba(0, 255, 255, 0.4)',
    },
  },
  {
    id: 'frame-3',
    name: 'Огненный шторм',
    preview: '🔥',
    cost: 150000,
    owned: false,
    style: {
      border: '7px solid',
      borderImage: 'linear-gradient(90deg, #FF0000, #FF6600, #FF0000, #FF6600) 1',
      boxShadow: '0 0 50px rgba(255, 69, 0, 1), inset 0 0 30px rgba(255, 140, 0, 0.5)',
    },
  },
  {
    id: 'frame-4',
    name: 'Радужная мечта',
    preview: '🌈',
    cost: 0,
    goldCost: 500,
    owned: false,
    style: {
      border: '8px solid',
      borderImage: 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3) 1',
      boxShadow: '0 0 60px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)',
    },
  },
  {
    id: 'frame-5',
    name: 'Изумрудный лес',
    preview: '🌿',
    cost: 200000,
    owned: false,
    style: {
      border: '6px solid',
      borderImage: 'linear-gradient(180deg, #00FF00, #008000, #00FF00) 1',
      boxShadow: '0 0 35px rgba(0, 255, 0, 0.7), inset 0 0 20px rgba(0, 128, 0, 0.4)',
    },
  },
  {
    id: 'frame-6',
    name: 'Королевский пурпур',
    preview: '👑',
    cost: 0,
    goldCost: 800,
    owned: false,
    style: {
      border: '10px solid',
      borderImage: 'linear-gradient(45deg, #800080, #FF00FF, #800080, #FF00FF) 1',
      boxShadow: '0 0 70px rgba(128, 0, 128, 1), inset 0 0 40px rgba(255, 0, 255, 0.5)',
    },
  },
  {
    id: 'frame-7',
    name: 'Звёздная пыль',
    preview: '⭐',
    cost: 300000,
    owned: false,
    style: {
      border: '5px solid transparent',
      background: 'linear-gradient(#1a1a2e, #1a1a2e) padding-box, linear-gradient(90deg, #FFD700, #FFFFFF, #FFD700) border-box',
      boxShadow: '0 0 50px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 215, 0, 0.6)',
    },
  },
  {
    id: 'frame-8',
    name: 'Неоновый киберпанк',
    preview: '⚡',
    cost: 0,
    goldCost: 1200,
    owned: false,
    style: {
      border: '8px solid',
      borderImage: 'linear-gradient(45deg, #FF00FF, #00FFFF, #FF00FF, #00FFFF) 1',
      boxShadow: '0 0 80px rgba(255, 0, 255, 1), 0 0 60px rgba(0, 255, 255, 0.8), inset 0 0 40px rgba(255, 0, 255, 0.4)',
    },
  },
  {
    id: 'frame-9',
    name: 'Лунное затмение',
    preview: '🌙',
    cost: 400000,
    owned: false,
    style: {
      border: '7px solid',
      borderImage: 'linear-gradient(135deg, #4A5568, #CBD5E0, #4A5568) 1',
      boxShadow: '0 0 45px rgba(203, 213, 224, 0.9), inset 0 0 25px rgba(74, 85, 104, 0.5)',
    },
  },
  {
    id: 'frame-10',
    name: 'Алмазная грань',
    preview: '💎',
    cost: 0,
    goldCost: 2000,
    owned: false,
    style: {
      border: '12px solid transparent',
      background: 'linear-gradient(#1a1a2e, #1a1a2e) padding-box, linear-gradient(90deg, #FFFFFF, #00FFFF, #FFFFFF, #FF00FF, #FFFFFF) border-box',
      boxShadow: '0 0 100px rgba(255, 255, 255, 1), 0 0 80px rgba(0, 255, 255, 0.8), inset 0 0 50px rgba(255, 255, 255, 0.3)',
    },
  },
];
