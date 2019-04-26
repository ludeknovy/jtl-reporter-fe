FROM node:8.13.0-alpine as builder

WORKDIR /src/fe

RUN apk --update add openjdk8 \
    nodejs \
    nodejs-npm \
    git && \ 
rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json angular.json ./
RUN npm install

COPY tsconfig.json tslint.json ./
COPY /src ./src

RUN npm run build:prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/fe/dist/jtl-reporter/ /usr/share/nginx/html