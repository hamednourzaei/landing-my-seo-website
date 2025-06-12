# مرحله اول: ساخت پروژه با Node.js
FROM node:18-alpine AS build

# پوشه کاری داخل کانتینر
WORKDIR /app

# کپی package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کل سورس کد
COPY . .

# ساخت پروژه (برای React)
RUN npm run build

# مرحله دوم: استفاده از nginx برای سرو فایل‌های ساخته شده
FROM nginx:stable-alpine

# پاک کردن فایل‌های پیش‌فرض nginx
RUN rm -rf /usr/share/nginx/html/*

# کپی کردن خروجی build شده به مسیر سرو فایل‌های nginx
COPY --from=build /app/build /usr/share/nginx/html

# پورت پیش‌فرض nginx
EXPOSE 80

# اجرای nginx در پس‌زمینه
CMD ["nginx", "-g", "daemon off;"]
