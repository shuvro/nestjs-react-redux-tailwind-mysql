FROM node:14.18.3-alpine as development
LABEL maintainer="shuvro.dhrubo@gmail.com" environment="development"

WORKDIR /app
RUN npm install -g nodemon
RUN npm install react-scripts@3.4.3 -g
COPY package*.json /app/
RUN npm install
COPY . ./
EXPOSE ${FRONTEND_PORT}

CMD ["/bin/sh", "./frontend_watcher.sh"]
