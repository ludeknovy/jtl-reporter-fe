FROM node:18.13.0-alpine3.17 as builder

WORKDIR /src/fe

RUN apk --update add openjdk8 \
    git build-base && \
rm -rf /var/lib/apt/lists/*

ENV NODE_OPTIONS=--openssl-legacy-provider


COPY package.json package-lock.json angular.json ./
RUN npm install

COPY tsconfig.json ./
COPY /src ./src

RUN npm run build:prod

FROM nginx:1.25.4-alpine3.18

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/fe/dist/jtl-reporter/ /usr/share/nginx/html
