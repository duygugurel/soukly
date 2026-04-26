# Backend Setup Dummy

Bu dosya, projeyi gercek backend'e baglarken kullanabilecegin ornek yapiyi verir. Buradaki tum anahtarlar ve URL'ler dummy'dir.

## Onerilen yapi

- Auth: Supabase Auth
- Database: PostgreSQL
- Message persistence: `messages` ve `conversations` tablolari
- Notification state: `notifications` tablosu

## Hazir dosyalar

- [.env.example](/C:/Users/DuyguYilmaz/Desktop/dolap%20benzeri%20uygulama/.env.example)
- [backend/dummy-backend-config.json](/C:/Users/DuyguYilmaz/Desktop/dolap%20benzeri%20uygulama/backend/dummy-backend-config.json)
- [backend/schema.sql](/C:/Users/DuyguYilmaz/Desktop/dolap%20benzeri%20uygulama/backend/schema.sql)
- [backend/seed.sql](/C:/Users/DuyguYilmaz/Desktop/dolap%20benzeri%20uygulama/backend/seed.sql)

## Bu ne ise yarar

- `schema.sql`: gercek tablolarin dummy versiyonu
- `seed.sql`: demo seller, buyer, offer, comment, message, notification verisi
- `.env.example`: gercek projede dolduracagin environment alanlari
- `dummy-backend-config.json`: auth, db, message ve notification kurgusunun tek yerde ozeti

## Gercek sisteme gecerken

1. Supabase projesi ac
2. `schema.sql` calistir
3. Istersen `seed.sql` ile demo veri bas
4. `.env.example` icindeki alanlari gercek degerlerle doldurup `.env.local` olustur
5. Frontend'deki local state mantigini Supabase query ve auth akisina bagla

## Not

Bu dosyalar calisan production backend degil, ama gercek backend kurulumuna gecmek icin duzenli bir baslangic iskeletidir.
