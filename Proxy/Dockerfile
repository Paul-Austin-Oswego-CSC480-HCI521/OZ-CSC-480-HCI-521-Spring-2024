FROM node as build

COPY Frontend/main-app/package.json .
COPY Frontend/main-app/package-lock.json .

RUN npm install

COPY Frontend/main-app . 

RUN npm run build

FROM nginx

COPY Proxy/nginx.conf /etc/nginx/nginx.conf

COPY --from=build build /www/data
