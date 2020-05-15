FROM node:10.15.0
ADD . /app
WORKDIR /app
RUN npm install
CMD node main.js
EXPOSE 8081
