#FROM node:16-bullseye AS frontend
#WORKDIR /app/frontend
#
#COPY frontend/package.json frontend/package-lock.json* ./
#RUN npm config set legacy-peer-deps true
#
#RUN npm pkg set "devDependencies.@craco/craco=6.4.5" \
#    "dependencies.node-sass=^6.0.1" \
#    "overrides.terser-webpack-plugin=4.2.3" \
#    "overrides.@pmmmwh/react-refresh-webpack-plugin=0.5.11" \
#    "devDependencies.react-refresh=0.10.0"
#
#RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.scripts=p.scripts||{};p.scripts.start='craco start';p.scripts.build='craco build';p.scripts.test='craco test';fs.writeFileSync('package.json',JSON.stringify(p,null,2));"
#
#RUN npm ci || npm install
#COPY frontend/ ./
#
## добавить craco.config.js, если его нет в репо
#RUN test -f craco.config.js || node -e "const fs=require('fs');const c=`const webpack=require('webpack');const ReactRefreshWebpackPlugin=require('@pmmmwh/react-refresh-webpack-plugin');const path=require('path');module.exports={webpack:{configure:(config)=>{config.resolve=config.resolve||{};config.resolve.alias={...(config.resolve.alias||{}),crypto:require.resolve('crypto-browserify'),stream:require.resolve('stream-browserify'),buffer:require.resolve('buffer/')};if(process.env.NODE_ENV==='development'){config.plugins=(config.plugins||[]).filter(p=>!(p&&p.constructor&&p.constructor.name==='ESLintWebpackPlugin'));config.plugins=config.plugins.map(p=>{if(p&&p.constructor&&p.constructor.name==='ReactRefreshWebpackPlugin'){return new ReactRefreshWebpackPlugin({overlay:false})}return p})}config.plugins.push(new webpack.ProvidePlugin({Buffer:['buffer','Buffer'],process:['process']}));config.node={...(config.node||{}),fs:'empty',net:'empty',tls:'empty'};return config}},devServer:(devServerConfig)=>{devServerConfig.overlay=false;return devServerConfig}};`;fs.writeFileSync('craco.config.js',c);"
#
#RUN npm i crypto-browserify buffer process stream-browserify
#RUN npm run build


# ---------- Stage 2: backend (Django + Gunicorn) ----------
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Системные зависимости под БД/библиотеки (подправь при необходимости)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl ca-certificates libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Python-зависимости
# В requirements.txt должны быть Django, psycopg2(-binary) или др. драйвер, whitenoise и т.п.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn whitenoise

# Код проекта
COPY . .

# Копируем собранный фронт внутрь Django
# Папка /app/frontend_build будет использована как шаблоны и статика
RUN mkdir -p /app/frontend_build
COPY --from=frontend /app/frontend/build/ /app/frontend_build/

# collectstatic (включит CSS/JS из React build)
# Укажи свой модуль настроек, если не config.settings
ENV DJANGO_SETTINGS_MODULE=config.settings
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000","--workers","3","--timeout","90"]
