# مرحله اول: بیلد پروژه
FROM node:18-alpine AS builder

WORKDIR /

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# مرحله دوم: اجرای پروژه
FROM node:18-alpine

WORKDIR /

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /.next /.next
COPY --from=builder /public /public
COPY --from=builder /next.config.js /next.config.js
COPY --from=builder /node_modules /node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
