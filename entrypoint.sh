#!/usr/bin/env bash
set -euo pipefail

required_vars=(ENV SECRET_KEY DB_NAME DB_USER DB_PASSWORD DB_HOST DB_PORT EMAIL_HOST EMAIL_PORT EMAIL_HOST_USER EMAIL_HOST_PASSWORD MERCHANT_DOMAIN_NAME MERCHANT_LOGIN MERCHANT_SECRET_KEY MERCHANT_PASSWORD)
for v in "${required_vars[@]}"; do
  if [ -z "${!v:-}" ]; then
    echo "Missing required env: $v" >&2
    exit 1
  fi
done

python - <<'PY'
import os, socket, time
host=os.environ["DB_HOST"]; port=int(os.environ["DB_PORT"])
deadline = time.time() + 60
while time.time() < deadline:
    try:
        with socket.create_connection((host, port), timeout=2):
            break
    except OSError:
        time.sleep(1)
else:
    raise SystemExit("DB not reachable")
PY

python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput
exec gunicorn medestet.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 90
