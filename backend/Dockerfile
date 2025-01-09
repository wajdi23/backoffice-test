FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD sh -c "sleep 10 && npx prisma migrate deploy && npx prisma generate && npm run seed && npm run dev"
