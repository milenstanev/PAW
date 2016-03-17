FROM node:onbuild

ADD . /app
WORKDIR /app
RUN npm install
RUN npm install -g jspm
RUN npm install -g babel-cli
RUN jspm install
EXPOSE 3003

CMD ["npm", "start"]