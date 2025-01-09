FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Pour create-react-app, ajoutez --legacy-peer-deps
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

# Pour create-react-app, on doit définir le HOST et le PORT
ENV PORT=3001
ENV HOST=0.0.0.0

# La commande start de create-react-app
CMD ["npm", "start"]