FROM node:16
WORKDIR /backend/src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 2020
RUN npm install
CMD ["npm","start"]