# Tesla Model Y — Next.js + Tailwind CSS

Tesla landing page-ийг Next.js App Router болон Tailwind CSS v4 дээр хэрэгжүүлсэн хувилбар. `Test Drive` товч Cal.com цаг захиалгыг, `Order Now` товч сервер талын BYL checkout-ийг нээнэ.

## Ашигласан бүтэц

- `app/page.js` — үндсэн landing page
- `app/styleguide/page.js` — Home UI foundation болон component styleguide
- `app/uilibrary/page.js` — reusable component showcase
- `app/globals.css` — Tailwind import, local font болон цөөн global utility
- `components/SiteHeader.jsx` — desktop/mobile navigation
- `components/CalInitializer.jsx` — Cal.com embed
- `components/CheckoutControls.jsx` — BYL checkout-ийн client төлөв
- `app/api/checkout/route.js` — токеныг browser-т ил гаргахгүй Next.js API route
- `public/assets` — зураг, SVG, local font

## Локал ажиллуулах

Node.js 22 буюу түүнээс шинэ хувилбар ашиглана.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Дараа нь [http://localhost:3000](http://localhost:3000) хаягийг нээнэ.

`.env.local` дотор:

```dotenv
BYL_TOKEN=энд_жинхэнэ_токеноо_оруулна
BYL_PROJECT_ID=852
BYL_PRICE_LOOKUP_KEY=modelY_price
BYL_PRODUCT_ID=1651
APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
ADMIN_EMAIL=zulamula.88@gmail.com
ADMIN_USER_ID=Supabase_Auth_user_UUID
```

`APP_URL` нь сонголттой. Тохируулаагүй эсвэл идэвхтэй deployment domain-оос өөр байвал checkout одоогийн request domain-ийг callback URL болгон ашиглана.

## Админ нэвтрэлт

- `/admin/login` нь Supabase Auth-ийн имэйл/нууц үгээр нэвтэрнэ.
- `/admin` нь баталгаажсан JWT-ийн хэрэглэгчийн UUID болон имэйлийг сервер талд шалгана.
- `ADMIN_USER_ID` нь **Authentication → Users** хэсэг дэх зөвшөөрөгдсөн хэрэглэгчийн UUID байна.
- Нууц үгийг Supabase Dashboard-ийн **Authentication → Users** хэсэгт үүсгэх эсвэл recovery имэйлээр шинэчилнэ.
- Нууц үг, Supabase secret/service-role key-г код эсвэл environment variable-д бүү хадгал. Browser талд зөвхөн publishable key ашиглана.

## Токены нууцлал

- `BYL_TOKEN`-г React component, `NEXT_PUBLIC_*` хувьсагч эсвэл browser-т очих файлд бүү оруул.
- `.env.local` нь Git-д commit хийгдэхгүй.
- Vercel-ийн **Project Settings → Environment Variables** хэсэгт `BYL_TOKEN`-г **Secret**, бусад утгыг энгийн environment variable байдлаар хадгална.
- Токен ил болсон бол BYL-ийн **Тохиргоо → API токэн** хэсгээс хүчингүй болгож шинээр үүсгэнэ.

## Production build

```bash
npm run build
npm start
```

Vercel GitHub repository-той холбоотой үед `main` branch руу push хийхэд Next.js build автоматаар deploy хийгдэнэ.

Checkout нь `modelY_price` lookup key ашиглана. `Product ID 1651` нь BYL item параметр биш бөгөөд `client_reference_id` үүсгэхэд ашиглагдана.

> Төлбөрийн эцсийн баталгаажуулалтыг `success_url`-д найдалгүй BYL-ийн `checkout.completed` webhook дээр хэрэгжүүлэх нь зөв.
