import type { Reel, ReelComment } from '@/types/chat';

const REELS_API = 'https://functions.poehali.dev/be729727-b22e-457b-a30e-437f3fabd840';

function getToken(): string | null {
  return localStorage.getItem('token');
}

function getUserId(): string | null {
  return localStorage.getItem('user_id');
}

export async function getReelsFeed(limit: number = 20, offset: number = 0): Promise<Reel[]> {
  const response = await fetch(`${REELS_API}?action=feed&limit=${limit}&offset=${offset}`, {
    headers: {
      'X-User-Id': getUserId() || '',
      'X-Auth-Token': getToken() || ''
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch reels');
  }
  
  const data = await response.json();
  return data.reels;
}

export async function createReel(videoUrl: string, thumbnailUrl?: string, description?: string): Promise<number> {
  const response = await fetch(`${REELS_API}?action=create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': getUserId() || '',
      'X-Auth-Token': getToken() || ''
    },
    body: JSON.stringify({
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
      description
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to create reel');
  }
  
  const data = await response.json();
  return data.id;
}

export async function toggleReelLike(reelId: number): Promise<{ is_liked: boolean; likes_count: number }> {
  const response = await fetch(`${REELS_API}?action=like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': getUserId() || '',
      'X-Auth-Token': getToken() || ''
    },
    body: JSON.stringify({ reel_id: reelId })
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }
  
  return response.json();
}

export async function addReelComment(reelId: number, content: string): Promise<number> {
  const response = await fetch(`${REELS_API}?action=comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': getUserId() || '',
      'X-Auth-Token': getToken() || ''
    },
    body: JSON.stringify({
      reel_id: reelId,
      content
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  
  const data = await response.json();
  return data.id;
}

export async function getReelComments(reelId: number): Promise<ReelComment[]> {
  const response = await fetch(`${REELS_API}?action=comments&reel_id=${reelId}`, {
    headers: {
      'X-User-Id': getUserId() || '',
      'X-Auth-Token': getToken() || ''
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  const data = await response.json();
  return data.comments;
}

export async function recordReelView(reelId: number): Promise<void> {
  await fetch(`${REELS_API}?action=view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reel_id: reelId })
  });
}
