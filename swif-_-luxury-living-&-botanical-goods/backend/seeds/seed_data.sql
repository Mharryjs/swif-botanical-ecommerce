-- ====================================================================
-- Swif Luxury E-Commerce Platform
-- Initial Development / Demo Seed Data
-- ====================================================================

-- 1. Insert Initial Categories
INSERT INTO categories (id, name, slug, description, image_url) VALUES
('b1a0a520-2c70-4f91-8b01-52a1d0f50001', 'Fine Botanical Fragrance', 'fine-fragrance', 'Cold-pressed wild flora, resinous woods, and golden amber extractions bottled in fluted glass.', 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'),
('b1a0a520-2c70-4f91-8b01-52a1d0f50002', 'Artisanal Living & Ceramics', 'artisanal-living', 'Wheel-thrown stoneware, satin-glazed vessels, and cast brass accents for calm sanctuaries.', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80'),
('b1a0a520-2c70-4f91-8b01-52a1d0f50003', 'Organic Herbarium Skincare', 'organic-skincare', 'Small-batch lipid serums, chamomile balms, and wild sage botanical distillates.', 'https://images.unsplash.com/photo-1608248597359-52e6973ce207?auto=format&fit=crop&w=1000&q=80'),
('b1a0a520-2c70-4f91-8b01-52a1d0f50004', 'Pure Linen & Loomed Wool', 'pure-textiles', 'Washed European flax, unbleached organic cotton throws, and sage-dyed heirloom textiles.', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Initial Catalog Products
INSERT INTO products (
    id, name, slug, sku, brand, short_description, description, price, compare_at_price, currency, stock_quantity, category_id, status, main_image, featured, new_arrival, best_seller, specifications
) VALUES
(
    'c2b1b631-3d81-5a02-9c12-63b2e1a60001',
    'No. 07 Vert Ambre Botanical Eau de Parfum',
    'vert-ambre-botanical-eau-de-parfum',
    'SWF-FRG-007',
    'Swif Botanicals',
    'Wild highland clary sage, sparkling bergamot peel, and sunlit amber resin.',
    'Crafted using traditional hydro-distillation in Grasse. Opens with crisp alpine sage before settling into a warm base of golden labdanum and sustainably harvested cedarwood. Housed in heavy fluted Italian glass with a brushed brass collar.',
    185.00,
    210.00,
    'USD',
    18,
    'b1a0a520-2c70-4f91-8b01-52a1d0f50001',
    'active',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    TRUE,
    TRUE,
    TRUE,
    '{"Volume": "50ml / 1.7 fl oz", "Origin": "Grasse, France", "Packaging": "Fluted Italian glass"}'::jsonb
),
(
    'c2b1b631-3d81-5a02-9c12-63b2e1a60002',
    'Satin Glazed Sage Stoneware Pitcher',
    'satin-glazed-sage-stoneware-pitcher',
    'SWF-LIV-014',
    'Swif Atelier',
    'Hand-thrown stoneware with soft celadon sage glaze and balanced pouring lip.',
    'Individually thrown by master ceramists in Kyoto using iron-rich stoneware clay. The exterior is coated in a matte mineral sage glaze that develops soft tactile warmth with age.',
    135.00,
    NULL,
    'USD',
    12,
    'b1a0a520-2c70-4f91-8b01-52a1d0f50002',
    'active',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85',
    TRUE,
    FALSE,
    TRUE,
    '{"Capacity": "1.2 Liters / 40 oz", "Origin": "Kyoto, Japan", "Finish": "Celadon ash glaze"}'::jsonb
),
(
    'c2b1b631-3d81-5a02-9c12-63b2e1a60003',
    'Nourishing Sea Buckthorn & Marula Face Nectar',
    'sea-buckthorn-marula-face-nectar',
    'SWF-SKN-003',
    'Swif Botanicals',
    'Cold-pressed virgin seed oils rich in Omegas 3, 6, 7 & 9 for luminous barrier support.',
    'An undiluted lipid infusion formulated to replenish depleted skin. Golden Himalayan sea buckthorn fruit oil combines with cold-filtered Kalahari marula seed oil and botanical squalane.',
    92.00,
    110.00,
    'USD',
    24,
    'b1a0a520-2c70-4f91-8b01-52a1d0f50003',
    'active',
    'https://images.unsplash.com/photo-1608248597359-52e6973ce207?auto=format&fit=crop&w=1200&q=85',
    TRUE,
    TRUE,
    FALSE,
    '{"Volume": "30ml / 1.0 fl oz", "Certification": "Certified Organic", "Origin": "Provence, France"}'::jsonb
)
ON CONFLICT (sku) DO NOTHING;

-- 3. Initial Administrator User (For production setup)
INSERT INTO users (
    id, full_name, email, password_hash, role
) VALUES
(
    'd3c2c742-4e92-6b13-0d23-74c3f2b70001',
    'Swif Master Administrator',
    'sswiftsite@gmail.com',
    '$2b$12$K1r.mQyq3P5l7Y9U0u9u1.QzL5tLhW.eJk6B1gY0uJ9u1.QzL5tLh', -- Bcrypt hashed password
    'admin'
)
ON CONFLICT (email) DO NOTHING;
