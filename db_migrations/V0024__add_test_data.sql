-- Добавляем тестовые категории
INSERT INTO t_p59162637_messenger_creation_p.categories (name, slug, image_url) VALUES
('Электроника', 'electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Одежда', 'clothes', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'),
('Книги', 'books', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
('Дом и сад', 'home', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'),
('Спорт', 'sport', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'),
('Красота', 'beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400');

-- Добавляем тестовые товары
INSERT INTO t_p59162637_messenger_creation_p.products (name, slug, description, price, old_price, category_id, image_url, stock, rating, reviews_count) VALUES
('iPhone 15 Pro', 'iphone-15-pro', 'Новейший флагман Apple с титановым корпусом', 89999, 99999, 1, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500', 50, 4.8, 124),
('AirPods Pro 2', 'airpods-pro-2', 'Беспроводные наушники с активным шумоподавлением', 24990, NULL, 1, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', 120, 4.9, 89),
('MacBook Air M3', 'macbook-air-m3', 'Ультратонкий ноутбук с чипом M3', 119990, 129990, 1, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 30, 4.7, 56),
('Джинсы Levi''s 501', 'levis-501', 'Классические прямые джинсы', 7999, 9999, 2, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 200, 4.6, 234),
('Кроссовки Nike Air Max', 'nike-air-max', 'Удобные беговые кроссовки', 12999, NULL, 2, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 80, 4.8, 156),
('Футболка Uniqlo', 'uniqlo-tshirt', 'Базовая хлопковая футболка', 990, NULL, 2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 500, 4.5, 412),
('Атомные привычки', 'atomic-habits', 'Джеймс Клир - бестселлер о формировании привычек', 599, 799, 3, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500', 150, 4.9, 892),
('Гарри Поттер (комплект)', 'harry-potter-set', 'Полное собрание из 7 книг', 3999, NULL, 3, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 45, 4.9, 1234),
('Кофеварка DeLonghi', 'delonghi-coffee', 'Автоматическая кофемашина', 45999, 52999, 4, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500', 25, 4.7, 78),
('Пылесос Dyson V15', 'dyson-v15', 'Беспроводной пылесос с лазером', 54990, NULL, 4, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500', 18, 4.8, 145),
('Гантели 10кг (пара)', 'dumbbells-10kg', 'Разборные гантели для дома', 3499, NULL, 5, 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500', 60, 4.6, 89),
('Коврик для йоги', 'yoga-mat', 'Противоскользящий коврик 183x61см', 1990, 2490, 5, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', 100, 4.7, 234),
('Палетка теней Urban Decay', 'urban-decay-palette', 'Naked3 палетка из 12 оттенков', 4999, NULL, 6, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500', 35, 4.8, 567),
('Крем для лица CeraVe', 'cerave-cream', 'Увлажняющий крем с церамидами 340мл', 1299, NULL, 6, 'https://images.unsplash.com/photo-1556229010-aa574e6c4637?w=500', 200, 4.9, 892)