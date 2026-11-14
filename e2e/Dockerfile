# La imagen de las pruebas de navegador: la de Playwright (con sus
# navegadores) y estas pruebas. rendimiento la construye con cada versión
# (builds: e2e) y la corre una vez que la versión está en vivo (tests:).
FROM mcr.microsoft.com/playwright:v1.64.1-noble
WORKDIR /pruebas
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
