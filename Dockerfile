FROM node:16-bullseye AS frontend
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./

ARG REACT_APP_API_BASE=""
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE

RUN npm config set legacy-peer-deps true

RUN npm pkg set "devDependencies.@craco/craco=6.4.5" \
    "dependencies.node-sass=^6.0.1" \
    "overrides.terser-webpack-plugin=4.2.3" \
    "overrides.@pmmmwh/react-refresh-webpack-plugin=0.5.11" \
    "devDependencies.react-refresh=0.10.0"

RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.scripts=p.scripts||{};p.scripts.start='craco start';p.scripts.build='craco build';p.scripts.test='craco test';fs.writeFileSync('package.json',JSON.stringify(p,null,2));"

RUN npm ci || npm install
COPY frontend/ ./

RUN test -f craco.config.js || node -e "const fs=require('fs');const c=`const webpack=require('webpack');const ReactRefreshWebpackPlugin=require('@pmmmwh/react-refresh-webpack-plugin');module.exports={webpack:{configure:(config)=>{config.resolve=config.resolve||{};config.resolve.alias={...(config.resolve.alias||{}),crypto:require.resolve('crypto-browserify'),stream:require.resolve('stream-browserify'),buffer:require.resolve('buffer/')};if(process.env.NODE_ENV==='development'){config.plugins=(config.plugins||[]).filter(p=>!(p&&p.constructor&&p.constructor.name==='ESLintWebpackPlugin'));config.plugins=config.plugins.map(p=>{if(p&&p.constructor&&p.constructor.name==='ReactRefreshWebpackPlugin'){return new ReactRefreshWebpackPlugin({overlay:false})}return p})}config.plugins.push(new webpack.ProvidePlugin({Buffer:['buffer','Buffer'],process:['process']}));config.node={...(config.node||{}),fs:'empty',net:'empty',tls:'empty'};return config}},devServer:(devServerConfig)=>{devServerConfig.overlay=false;return devServerConfig}};`;fs.writeFileSync('craco.config.js',c);"

RUN npm i crypto-browserify buffer process stream-browserify

RUN npm run build


FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl ca-certificates libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn whitenoise \
    && pip uninstall -y psycopg2 || true \
    && pip install --no-cache-dir psycopg2-binary==2.9.9

COPY . .
RUN mkdir -p /app/frontend_build
COPY --from=frontend /app/frontend/build/ /app/frontend_build/

# Больше НИЧЕГО не запускаем здесь, всё в entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN sed -i 's/\r$//' /app/entrypoint.sh && chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

EXPOSE 8000