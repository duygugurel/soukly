-- ============================================================
-- Soukly – Demo Seed Data
-- ============================================================
-- Adds 10 realistic UAE pre-loved listings to your database.
--
-- HOW TO RUN:
--   1. Open Supabase → SQL Editor
--   2. Paste this entire file and click Run
--   3. Re-open the Soukly app – products will appear
--
-- REQUIREMENT: You must have signed up / signed in on the app
--   at least once before running this, so a profile row exists.
-- ============================================================

DO $$
DECLARE
  seller_id uuid;
  pid       uuid;
BEGIN

  -- Use the first profile in the DB (your account)
  SELECT id INTO seller_id
  FROM   profiles
  ORDER  BY created_at ASC
  LIMIT  1;

  IF seller_id IS NULL THEN
    RAISE EXCEPTION
      'No profiles found. Sign up on the app first, then run this seed.';
  END IF;

  -- ── 1. Zara Floral Midi Dress ─────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Zara Floral Midi Dress', 'Woman', 165, 'Like new',
     'Shipping', 'Dubai Marina',
     'Stunning midi dress in soft floral print, size S. Worn once to a garden brunch. Dry-cleaned and ready to ship. No stains or damage.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Zara');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#zara'),(pid,'#dress'),(pid,'#summerstyle');

  -- ── 2. Mango Linen Blazer ─────────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Mango Linen Blazer – Camel', 'Woman', 220, 'New with tags',
     'Shipping', 'JLT',
     'Brand new, original tags still attached. Size M. Never worn – bought during sale but does not fit. Perfect office or brunch look.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Mango');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#mango'),(pid,'#blazer'),(pid,'#newtags');

  -- ── 3. Nike Air Max 270 ───────────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Nike Air Max 270 – White/Gold', 'Shoes&Bags', 280, 'Like new',
     'Shipping or hand delivery', 'JBR',
     'Size UK 7 / EU 40.5. Worn only 2-3 times indoors. Sole has no visible wear. Original box and extra laces included.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Nike');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#nike'),(pid,'#airmax'),(pid,'#sneakers');

  -- ── 4. Dyson Airwrap Complete ─────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Dyson Airwrap Complete Styler', 'Beauty', 950, 'Like new',
     'Shipping', 'Downtown Dubai',
     'All original attachments, storage case, and box included. Lightly used – selling because I upgraded to the newer Airwrap model. Works flawlessly.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Dyson');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#dyson'),(pid,'#airwrap'),(pid,'#hairtools');

  -- ── 5. Coach Tabby Shoulder Bag ──────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Coach Tabby Shoulder Bag – Tan', 'Shoes&Bags', 620, 'Like new',
     'Shipping', 'DIFC',
     'Authentic Coach Tabby 26 in tan pebbled leather. Minimal signs of use, no scratches or marks. Comes with original dust bag and authenticity card.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Coach');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#coach'),(pid,'#bag'),(pid,'#luxury');

  -- ── 6. Sunday Riley Good Genes ───────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Sunday Riley Good Genes Serum', 'Beauty', 95, 'Sealed',
     'Shipping', 'Jumeirah',
     'Sealed and unopened. Expiry 2026. Received as a gift but I already own one. Perfect condition, stored away from heat.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Sunday Riley');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#sundayriley'),(pid,'#serum'),(pid,'#sealed');

  -- ── 7. Lululemon Align Leggings ──────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Lululemon Align Leggings – Black 25"', 'Sports', 175, 'Like new',
     'Shipping', 'Dubai Marina',
     'Size 6. Washed once, no pilling, no fading. The buttery-soft feel is still perfect. Great for yoga, pilates, or everyday wear.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Lululemon');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#lululemon'),(pid,'#yoga'),(pid,'#activewear');

  -- ── 8. Swarovski Crystal Earrings ────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'Swarovski Crystal Stud Earrings', 'Accessories', 130, 'Like new',
     'Shipping', 'Palm Jumeirah',
     'Classic round crystal studs in silver setting. Barely worn – only twice. Original gift box and pouch included. No tarnishing.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'Swarovski');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#swarovski'),(pid,'#earrings'),(pid,'#jewellery');

  -- ── 9. H&M Quilted Jacket ────────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'H&M Premium Quilted Jacket – Navy', 'Man', 110, 'Good',
     'Shipping or hand delivery', 'Al Barsha',
     'Size L. Good condition, freshly washed. No stains, tears, or damage. Great for cooler UAE evenings or travel. Selling because it no longer fits my style.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'H&M');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#hm'),(pid,'#jacket'),(pid,'#menswear');

  -- ── 10. IKEA KALLAX Shelf ─────────────────────────────────
  INSERT INTO products
    (seller_profile_id, title, category, price_aed, condition, delivery, location, description)
  VALUES
    (seller_id, 'IKEA KALLAX 4×4 Shelf – White', 'Home', 180, 'Good',
     'Hand delivery', 'Business Bay',
     '4×4 KALLAX unit in white. Slight scuff on one side panel, otherwise structurally solid. Moving out and cannot take it. Buyer must arrange own transport.')
  RETURNING id INTO pid;
  INSERT INTO product_brands   (product_id, brand_name) VALUES (pid, 'IKEA');
  INSERT INTO product_hashtags (product_id, hashtag)    VALUES (pid,'#ikea'),(pid,'#homedecor'),(pid,'#kallax');

  RAISE NOTICE '✅ Seed complete. 10 demo products added under profile: %', seller_id;

END $$;
