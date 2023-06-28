FROM node:alpine
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./
RUN npm install --only=production --omit=dev
COPY ./ ./
EXPOSE 3000
CMD ["npm", "start"]