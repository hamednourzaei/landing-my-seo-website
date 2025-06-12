# مرحله اول: بیلد پروژه
FROM node:18-alpine AS builder

WORKDIR /

COPY package*.json ./

RUN npm ci


RUN npm run build

# مرحله دوم: اجرای پروژه
FROM node:18-alpine

WORKDIR /

RUN npm ci --production


EXPOSE 3000

CMD ["npm", "run", "start"]
