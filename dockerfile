FROM node:alpine

WORKDIR /Users/don/finalP/react_test/src/app

COPY package.json ./

RUN npm install --

COPY ./ ./

CMD ["npm", "run", "start"]