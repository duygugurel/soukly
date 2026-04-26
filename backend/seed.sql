insert into profiles (id, full_name, username, email, phone, city)
values
  ('11111111-1111-1111-1111-111111111111', 'Demo Seller', 'demoseller', 'seller@example.com', '+971500000001', 'Dubai'),
  ('22222222-2222-2222-2222-222222222222', 'Maya Noor', 'mayanoor', 'maya@example.com', '+971500000002', 'Dubai'),
  ('33333333-3333-3333-3333-333333333333', 'Lina Kareem', 'linakareem', 'lina@example.com', '+971500000003', 'Dubai')
on conflict do nothing;

insert into products (
  id, seller_profile_id, title, description, category, condition, delivery, location, price_aed, image_url
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Zara Satin Heels',
    'Soft champagne tone, worn once for an event, size 38.',
    'Shoes',
    'Like new',
    'Shipping or hand delivery',
    'Dubai Marina',
    120,
    null
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'Sealed Vitamin C Serum',
    'Unopened box, expiry date valid, ideal for resale-safe beauty category.',
    'Beauty',
    'Sealed',
    'Shipping',
    'JLT',
    65,
    null
  )
on conflict do nothing;

insert into product_brands (product_id, brand_name)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Zara'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sunday Riley')
on conflict do nothing;

insert into product_hashtags (product_id, hashtag)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '#zara'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '#heels'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '#beauty'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '#sealed')
on conflict do nothing;

insert into favorites (profile_id, product_id)
values
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
on conflict do nothing;

insert into product_offers (id, product_id, buyer_profile_id, amount_aed, message, status)
values
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '22222222-2222-2222-2222-222222222222',
    100,
    'Can pick up this weekend.',
    'pending'
  )
on conflict do nothing;

insert into product_comments (id, product_id, author_profile_id, body, like_count)
values
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '33333333-3333-3333-3333-333333333333',
    'Is size 38 true to size?',
    2
  )
on conflict do nothing;

insert into conversations (id, product_id, seller_profile_id, buyer_profile_id)
values
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
  )
on conflict do nothing;

insert into messages (conversation_id, sender_profile_id, recipient_profile_id, body, is_read)
values
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Hi, is this still available?',
    false
  )
on conflict do nothing;

insert into notifications (profile_id, type, title, body, related_product_id, related_offer_id)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'offer_pending',
    'New offer received',
    'Maya Noor sent a 100 AED offer for Zara Satin Heels.',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
  )
on conflict do nothing;
