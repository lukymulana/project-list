FROM node:18

WORKDIR /project-list-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start