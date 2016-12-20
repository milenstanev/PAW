<<<<<<< Updated upstream
FROM node:onbuild

ADD . /app
WORKDIR /app
RUN npm install
RUN npm install -g jspm
RUN npm install -g babel-cli
RUN jspm install
EXPOSE 3003

=======
FROM node:5.11.1
COPY . /usr/local/paw
WORKDIR /usr/local/paw
RUN npm install
>>>>>>> Stashed changes
CMD ["npm", "start"]