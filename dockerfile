FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm config set registry https://artifact.vnpay.vn/nexus/repository/npm-group/
RUN npm install --save --legacy-peer-deps
COPY . ./
RUN npm run build:test

FROM nginx:stable-alpine
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
