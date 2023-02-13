FROM node:18

WORKDIR /app

COPY . .

#RUN npm install
#RUN npm run build-transmitter-api

CMD ["npm", "run", "start-transmitter-api"]
