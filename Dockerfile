FROM node:16.18.0-alpine3.15 as builder

WORKDIR /src/fe

RUN apk --update add openjdk8 \
    git python2 build-base && \
rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json angular.json ./
RUN npm install

COPY tsconfig.json ./
COPY /src ./src

RUN npm run build:prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/fe/dist/jtl-reporter/ /usr/share/nginx/html
