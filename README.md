# 🔗 URL Shortener API

Bu Django Rest Framework asosida qurilgan oddiy URL qisqartiruvchi loyihadir.

## 🚀 Funksiyalar

- URL’ni qisqartirish
- Original URL’ni olish
- Qisqartirilgan URL statistikasi
- URL’ni yangilash
- URL’ni o‘chirish

## 🛠 API Endpointlar

| Endpoint | Method | Maqsadi |
|---------|--------|---------|
| `/shorten` | POST | URL’ni qisqartirish |
| `/shorten/<short_code>` | GET | Original URL’ni olish |
| `/shorten/<short_code>/stats` | GET | Ko‘rish statistikasi |
| `/shorten/<short_code>/update` | PUT | URL’ni yangilash |
| `/shorten/<short_code>/delete` | DELETE | Qisqartirilgan URL’ni o‘chirish |

## 📄 Swagger

Swagger hujjati:
[`/api/docs/`](http://127.0.0.1:8000/api/docs/)

## 💻 Ishga tushirish

```bash
git clone https://github.com/username/url-shortener.git
cd url-shortener
python -m venv venv
source venv/bin/activate  # yoki Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
