export interface StoryPromotion {
  id: string;
  sellerId: string;
  sellerName: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired';
  paid: boolean;
  price: number;
  views: number;
  clicks: number;
}

const STORIES_KEY = 'peeky_story_promotions';

export const getStoryPromotions = (): StoryPromotion[] => {
  const data = localStorage.getItem(STORIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getActiveStoryPromotions = (): StoryPromotion[] => {
  const promotions = getStoryPromotions();
  const now = new Date();
  return promotions.filter(p => 
    p.status === 'active' && 
    p.paid && 
    new Date(p.endDate) > now
  );
};

export const getSellerStoryPromotions = (sellerId: string): StoryPromotion[] => {
  return getStoryPromotions().filter(p => p.sellerId === sellerId);
};

export const createStoryPromotion = (promotion: Omit<StoryPromotion, 'id' | 'status' | 'views' | 'clicks'>): string => {
  const promotions = getStoryPromotions();
  const newPromotion: StoryPromotion = {
    ...promotion,
    id: `story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    views: 0,
    clicks: 0
  };
  
  promotions.push(newPromotion);
  localStorage.setItem(STORIES_KEY, JSON.stringify(promotions));
  return newPromotion.id;
};

export const payForStoryPromotion = (promotionId: string): boolean => {
  const promotions = getStoryPromotions();
  const index = promotions.findIndex(p => p.id === promotionId);
  
  if (index === -1) return false;
  
  promotions[index] = {
    ...promotions[index],
    paid: true,
    status: 'active'
  };
  
  localStorage.setItem(STORIES_KEY, JSON.stringify(promotions));
  return true;
};

export const deleteStoryPromotion = (promotionId: string): boolean => {
  const promotions = getStoryPromotions();
  const filtered = promotions.filter(p => p.id !== promotionId);
  
  if (filtered.length === promotions.length) return false;
  
  localStorage.setItem(STORIES_KEY, JSON.stringify(filtered));
  return true;
};

export const incrementStoryViews = (promotionId: string): void => {
  const promotions = getStoryPromotions();
  const index = promotions.findIndex(p => p.id === promotionId);
  
  if (index !== -1) {
    promotions[index].views++;
    localStorage.setItem(STORIES_KEY, JSON.stringify(promotions));
  }
};

export const incrementStoryClicks = (promotionId: string): void => {
  const promotions = getStoryPromotions();
  const index = promotions.findIndex(p => p.id === promotionId);
  
  if (index !== -1) {
    promotions[index].clicks++;
    localStorage.setItem(STORIES_KEY, JSON.stringify(promotions));
  }
};

export const STORY_PRICES = {
  '1day': 500,
  '3days': 1200,
  '7days': 2500,
  '14days': 4500,
  '30days': 8000
};

export const getStoryDuration = (days: number): string => {
  if (days === 1) return '1 день';
  if (days <= 4) return `${days} дня`;
  return `${days} дней`;
};
