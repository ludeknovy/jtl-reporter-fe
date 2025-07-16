FROM node:20.17.0-alpine3.20 as builder

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

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/fe/dist/jtl-reporter/ /usr/share/nginx/html

# Runtime patching support for baseHref and API endpoints override
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Override the default NGINX startup
CMD ["/entrypoint.sh"]
