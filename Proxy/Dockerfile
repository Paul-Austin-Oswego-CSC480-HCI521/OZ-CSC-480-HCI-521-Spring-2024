FROM node as build

COPY Frontend/main-app . 

RUN npm install

RUN npm run build

FROM nginx

COPY Proxy/nginx.conf /etc/nginx/nginx.conf

COPY --from=build build /www/data