FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm set fetch-retries 5 && npm ci

# تولید نسخه پروداکشن (اگر دارید از next export استفاده می‌کنید، تغییر دارد)
# RUN npm run export  # فقط اگر سایت استاتیک می‌خوای بسازی

EXPOSE 3000

CMD ["npm", "start"]
