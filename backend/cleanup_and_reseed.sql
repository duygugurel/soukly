-- ============================================================
-- Soukly – Clean Slate + Re-seed
-- ============================================================
-- Bu script önce tüm ürünleri siler (test ve eski veriler),
-- ardından 10 temiz demo ürünü ekler.
--
-- ⚠️ UYARI: Bu script tüm ürünleri siler.
--    Gerçek müşteri verisi varsa kullanma.
-- ============================================================

-- 1. Tüm ürün verilerini temizle (CASCADE ile ilgili tablolar da temizlenir)
DELETE FROM product_hashtags;
DELETE FROM product_brands;
DELETE FROM product_comments;
DELETE FROM product_offers;
DELETE FROM product_ratings;
DELETE FROM products;

-- 2. Temiz seed verisi ekle
DO $$
DECLARE
  seller_id uuid;
  pid       uuid;
BEGIN

  SELECT id INTO seller_id
  FROM   profiles
  ORDER  BY created_at ASC
  LIMIT  1;

  IF seller_id IS NULL THEN
    RAISE EXCEPTION 'No profiles found. Sign up on the app first.';
  END IF;

  -- 1. Zara Floral Midi Dress
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Zara Floral Midi Dress', 'Woman', 165, 'Like new', 'Courier', 'Dubai Marina',
    'Stunning midi dress in soft floral print, size S. Worn once to a garden brunch. Dry-cleaned and ready to ship. No stains or damage.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Zara');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#zara');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#dress');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#summerstyle');

  -- 2. Mango Linen Blazer
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Mango Linen Blazer – Camel', 'Woman', 220, 'New with tags', 'Courier', 'JLT',
    'Brand new, original tags still attached. Size M. Never worn – bought during sale but does not fit. Perfect office or brunch look.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Mango');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#mango');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#blazer');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#newtags');

  -- 3. Nike Air Max 270
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Nike Air Max 270 – White/Gold', 'Shoes&Bags', 280, 'Like new', 'Courier or hand delivery', 'JBR',
    'Size UK 7 / EU 40.5. Worn only 2-3 times indoors. No visible wear on sole. Original box and extra laces included.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Nike');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#nike');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#airmax');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#sneakers');

  -- 4. Dyson Airwrap
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Dyson Airwrap Complete Styler', 'Beauty', 950, 'Like new', 'Courier', 'Downtown Dubai',
    'All original attachments, storage case, and box included. Lightly used – selling because I upgraded to the newer Airwrap model. Works flawlessly.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Dyson');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#dyson');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#airwrap');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#hairtools');

  -- 5. Coach Tabby Bag
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Coach Tabby Shoulder Bag – Tan', 'Shoes&Bags', 620, 'Like new', 'Courier', 'DIFC',
    'Authentic Coach Tabby 26 in tan pebbled leather. Minimal signs of use. Comes with original dust bag and authenticity card.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Coach');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#coach');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#bag');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#luxury');

  -- 6. Sunday Riley Serum
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Sunday Riley Good Genes Serum', 'Beauty', 95, 'Sealed', 'Courier', 'Jumeirah',
    'Sealed and unopened. Expiry 2026. Received as a gift but already have one. Stored away from heat.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Sunday Riley');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#sundayriley');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#serum');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#sealed');

  -- 7. Lululemon Leggings
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Lululemon Align Leggings – Black 25"', 'Sports', 175, 'Like new', 'Courier', 'Dubai Marina',
    'Size 6. Washed once, no pilling, no fading. Buttery-soft feel still perfect. Great for yoga or pilates.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Lululemon');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#lululemon');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#yoga');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#activewear');

  -- 8. Swarovski Earrings
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'Swarovski Crystal Stud Earrings', 'Accessories', 130, 'Like new', 'Courier', 'Palm Jumeirah',
    'Classic round crystal studs in silver setting. Barely worn – only twice. Original gift box and pouch included. No tarnishing.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'Swarovski');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#swarovski');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#earrings');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#jewellery');

  -- 9. H&M Jacket
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'H&M Premium Quilted Jacket – Navy', 'Man', 110, 'Good', 'Courier or hand delivery', 'Al Barsha',
    'Size L. Good condition, freshly washed. No stains or damage. Great for cooler UAE evenings or travel.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'H&M');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#hm');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#jacket');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#menswear');

  -- 10. IKEA KALLAX
  INSERT INTO products (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES (seller_id, 'IKEA KALLAX 4x4 Shelf – White', 'Home', 180, 'Good', 'Hand delivery', 'Business Bay',
    '4x4 KALLAX unit in white. Slight scuff on one side, otherwise solid. Moving out – buyer must arrange own transport.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   VALUES (gen_random_uuid(), pid, 'IKEA');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#ikea');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#homedecor');
  INSERT INTO product_hashtags VALUES (gen_random_uuid(), pid, '#kallax');

  RAISE NOTICE '✅ Done. 10 clean demo products added under profile: %', seller_id;

END $$;
