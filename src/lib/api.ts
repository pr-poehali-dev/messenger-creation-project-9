const AUTH_URL = 'https://functions.poehali.dev/6fa55cf5-f8a6-4405-9007-73fbfdd881e0';
const GAME_URL = 'https://functions.poehali.dev/15f7b5a9-a4ea-41e1-9209-ae5076802636';

export async function register(username: string, email: string, password: string) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'register', username, email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка регистрации');
  }
  
  return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', username, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка входа');
  }
  
  return response.json();
}

export async function getGameState(playerId: string) {
  const response = await fetch(`${GAME_URL}?action=state`, {
    headers: { 'X-Player-Id': playerId }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка загрузки состояния');
  }
  
  return response.json();
}

export async function getBuildingTypes(playerId: string) {
  const response = await fetch(`${GAME_URL}?action=building_types`, {
    headers: { 'X-Player-Id': playerId }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка загрузки типов зданий');
  }
  
  return response.json();
}

export async function buildBuilding(playerId: string, buildingTypeId: number, x: number, y: number) {
  const response = await fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Player-Id': playerId
    },
    body: JSON.stringify({ action: 'build', building_type_id: buildingTypeId, x, y })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка строительства');
  }
  
  return response.json();
}

export async function collectResources(playerId: string, buildingId: number) {
  const response = await fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Player-Id': playerId
    },
    body: JSON.stringify({ action: 'collect', building_id: buildingId })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка сбора ресурсов');
  }
  
  return response.json();
}

export async function completeBuilding(playerId: string, buildingId: number) {
  const response = await fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Player-Id': playerId
    },
    body: JSON.stringify({ action: 'complete_building', building_id: buildingId })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка завершения строительства');
  }
  
  return response.json();
}
