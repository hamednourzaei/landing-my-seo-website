FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# تولید نسخه پروداکشن (اگر دارید از next export استفاده می‌کنید، تغییر دارد)
# RUN npm run export  # فقط اگر سایت استاتیک می‌خوای بسازی

EXPOSE 3000

CMD ["npm", "start"]
