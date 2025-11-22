-- Таблица категорий товаров
CREATE TABLE t_p59162637_messenger_creation_p.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id INTEGER REFERENCES t_p59162637_messenger_creation_p.categories(id),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица товаров
CREATE TABLE t_p59162637_messenger_creation_p.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    category_id INTEGER REFERENCES t_p59162637_messenger_creation_p.categories(id),
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица изображений товаров
CREATE TABLE t_p59162637_messenger_creation_p.product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES t_p59162637_messenger_creation_p.products(id),
    image_url TEXT NOT NULL,
    position INTEGER DEFAULT 0
);

-- Таблица корзины
CREATE TABLE t_p59162637_messenger_creation_p.cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p59162637_messenger_creation_p.users(id),
    product_id INTEGER REFERENCES t_p59162637_messenger_creation_p.products(id),
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Таблица заказов
CREATE TABLE t_p59162637_messenger_creation_p.orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p59162637_messenger_creation_p.users(id),
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица товаров в заказе
CREATE TABLE t_p59162637_messenger_creation_p.order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES t_p59162637_messenger_creation_p.orders(id),
    product_id INTEGER REFERENCES t_p59162637_messenger_creation_p.products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Индексы для быстрого поиска
CREATE INDEX idx_products_category ON t_p59162637_messenger_creation_p.products(category_id);
CREATE INDEX idx_products_price ON t_p59162637_messenger_creation_p.products(price);
CREATE INDEX idx_products_rating ON t_p59162637_messenger_creation_p.products(rating);
CREATE INDEX idx_cart_user ON t_p59162637_messenger_creation_p.cart(user_id);
CREATE INDEX idx_orders_user ON t_p59162637_messenger_creation_p.orders(user_id);