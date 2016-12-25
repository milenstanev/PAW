FROM node:5.11.1
COPY . /usr/local/paw
WORKDIR /usr/local/paw
RUN npm install
CMD ["npm", "start"]