FROM node:24-alpine
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --silent

COPY . .
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "run", "dev"]
