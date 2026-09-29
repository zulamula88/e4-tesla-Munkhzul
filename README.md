# Tesla Model Y урьдчилсан захиалга

`Order Now` товч нь серверийн `/api/checkout` endpoint-оор BYL checkout үүсгэж, хэрэглэгчийг BYL-ийн төлбөрийн хуудас руу шилжүүлнэ.

Production deployment дээр `api/checkout.js` нь Vercel Function хэлбэрээр ажиллана. Локал хөгжүүлэлтэд `server.mjs` ижил endpoint-ийг ажиллуулна.

## Локал тохиргоо

Node.js 18 буюу түүнээс шинэ хувилбар шаардлагатай. Нэмэлт package суулгахгүй.

```bash
cp .env.example .env
```

`.env` дотор BYL удирдлагын булангаас авсан токеноо оруулна:

```dotenv
BYL_TOKEN=энд_жинхэнэ_токеноо_оруулна
BYL_PROJECT_ID=852
BYL_PRICE_LOOKUP_KEY=modelY_price
BYL_PRODUCT_ID=1651
APP_URL=http://localhost:4173
HOST=127.0.0.1
PORT=4173
NODE_ENV=development
```

Дараа нь серверээ ажиллуулна:

```bash
npm start
```

`http://localhost:4173` хаягаар нээгээд `Order Now` товчийг туршина.

## Токены нууцлал

- `BYL_TOKEN`-г `index.html`, `app.js` эсвэл бусад browser-т очих файлд бүү оруул.
- `.env` нь `.gitignore`-д орсон тул Git-д commit хийгдэхгүй. `git status`-оор `.env` харагдахгүй байгааг шалга.
- Production hosting дээр `.env` файл upload хийхийн оронд тухайн үйлчилгээний **Environment Variables / Secrets** хэсэгт `BYL_TOKEN`-г хадгал.
- Production үед `APP_URL=https://таны-домэйн.mn`, `NODE_ENV=production` гэж тохируул.
- Токен санамсаргүй ил болсон бол BYL-ийн **Тохиргоо → API токэн** хэсгээс даруй хүчингүй болгож шинээр үүсгэ.

Checkout-д `modelY_price` lookup key ашиглана. `Product ID 1651` нь BYL item-ийн параметр биш тул захиалгын `client_reference_id` дотор ашиглагдана.

> Төлбөр үнэхээр дууссаны дараах захиалга баталгаажуулах бизнес логикийг `success_url`-д найдахгүй, BYL-ийн `checkout.completed` webhook дээр хэрэгжүүлэх нь зөв. Webhook-ийн гарын үсэг шалгах баримт өгөгдвөл тус endpoint-ийг нэмж болно.

## Vercel deployment

Vercel-ийн Production Environment Variables хэсэгт дараах утгуудыг тохируулна:

```dotenv
BYL_TOKEN=жинхэнэ_токен
BYL_PROJECT_ID=852
BYL_PRICE_LOOKUP_KEY=modelY_price
BYL_PRODUCT_ID=1651
APP_URL=https://e4-tesla-munkhzul.vercel.app
```

`BYL_TOKEN`-г Secret, бусад утгыг Config төрлөөр хадгална. Өөрчлөлтүүдээ GitHub руу push хийхэд Vercel шинэ deployment үүсгэнэ.
