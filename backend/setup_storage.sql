-- ============================================================
-- Soukly – Storage Policies for product-images bucket
-- ============================================================
-- Run AFTER creating the "product-images" bucket in Supabase
-- Storage dashboard (set it as PUBLIC).
-- ============================================================

-- Anyone can read / view images (public CDN)
create policy "Public can read product images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

-- Signed-in users can upload images
create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );

-- Signed-in users can delete their own uploads
create policy "Authenticated users can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'authenticated'
  );
