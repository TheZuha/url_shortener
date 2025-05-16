# 🔗 URL Shortener API

Bu loyiha `Django Rest Framework` yordamida yaratilgan oddiy **URL qisqartiruvchi API** hisoblanadi. Siz URL manzilingizni qisqartirib, uni boshqalar bilan oson ulashishingiz mumkin. Loyiha qisqa kodni yaratadi va unga bosilganda foydalanuvchini original URL manzilga yo‘naltiradi.

---

## 📌 Loyihaning imkoniyatlari

* 🔗 URL’ni qisqartirish
* 🔁 Qisqa URL orqali original manzilga yo‘naltirish (redirect)
* 📊 Har bir qisqa URL uchun statistikani ko‘rish (necha marta bosilgan)
* ✏️ Qisqa URL’ni yangilash
* 🗑️ URL’ni o‘chirish

---

## 📁 API Endpointlar

| Yo‘l (`Endpoint`)              | Method | Tavsifi                                 |
| ------------------------------ | ------ | --------------------------------------- |
| `/shorten`                     | POST   | Yangi qisqa URL yaratish                |
| `/shorten/<short_code>`                | GET    | Qisqa URL orqali original URL’ga o‘tish |
| `/shorten/<short_code>/stats`  | GET    | Statistika (necha marta bosilgan)       |
| `/shorten/<short_code>/update` | PUT    | Qisqa URL’ni yangilash                  |
| `/shorten/<short_code>/delete` | DELETE | Qisqa URL’ni o‘chirish                  |

---

## 📄 Swagger hujjatlari

Loyihani ishga tushirgach, API’ni Swagger interfeys orqali ko‘rish va test qilish mumkin:

📍 [`http://127.0.0.1:8000/api/docs/`](http://127.0.0.1:8000/api/docs/)

---

## 🛠 O‘rnatish va ishga tushirish

```bash
# 1. Repositoriyani yuklab oling
git clone https://github.com/TheZuha/url_shortener.git
cd url-shortener

# 2. Virtual muhit yaratish
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/MacOS:
source venv/bin/activate

# 3. Kerakli kutubxonalarni o‘rnatish
pip install -r requirements.txt

# 4. Migratsiyalarni bajarish
python manage.py makemigrations
python manage.py migrate

# 5. Serverni ishga tushiring
python manage.py runserver
```

---

## 📬 Qanday foydalaniladi?

### 1. URL’ni qisqartirish

**POST** so‘rov yuboring:
`http://127.0.0.1:8000/shorten`

**Body (JSON):**

```json
{
  "url": "https://google.com"
}
```

**Javob:**

```json
{
  "url": "https://google.com",
  "short_code": "abc123"
}
```

---

### 2. Qisqa URL orqali redirect bo‘lish

Brauzeringizda mana bunday linkni oching:
`http://127.0.0.1:8000/abc123`
👉 Siz avtomatik tarzda `https://google.com` saytiga yo‘naltirilasiz.

---

### 3. Statistika

**GET** so‘rovi:
`/shorten/abc123/stats`
Bu URL nechta marta ochilganini ko‘rsatadi.

---

### 4. URL’ni yangilash

**PUT** so‘rovi:
`/shorten/abc123/update`

**Body (JSON):**

```json
{
  "url": "https://youtube.com"
}
```

---

### 5. URL’ni o‘chirish

**DELETE** so‘rovi:
`/shorten/abc123/delete`

---

## 🧾 Litsenziya

Bu loyiha ochiq manba bo‘lib, istalgan maqsadda foydalanish uchun ochiq.

---

👨‍💻 Muallif: [TheZuha](https://github.com/TheZuha)
