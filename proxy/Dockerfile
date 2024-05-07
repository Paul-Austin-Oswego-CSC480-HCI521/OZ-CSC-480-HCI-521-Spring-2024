FROM node as build

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend . 

RUN npm run build

FROM nginx

COPY proxy/nginx.conf /etc/nginx/nginx.conf

COPY --from=build build /www/data
