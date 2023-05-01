FROM node:17.1.0

ARG PORT

ENV PORT=$PORT

RUN apt-get -y update

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
