FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY . .

# Bundle app source
ENV PORT=3000

RUN npm install

RUN node getKeys.js

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]