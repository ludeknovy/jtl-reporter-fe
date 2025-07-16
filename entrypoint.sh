#!/bin/sh

BASE_HREF="${BASE_HREF:-/}"
API_PREFIX="${API_PREFIX:-/api}"

HTML_PATH="/usr/share/nginx/html"
INDEX_FILE="$HTML_PATH/index.html"

echo "[INFO] Patching <base href> to '$BASE_HREF'"
sed -i "s|<base href=\"[^\"]*\">|<base href=\"$BASE_HREF\">|g" "$INDEX_FILE"

echo "[INFO] Patching JS files to use '$API_PREFIX'"
sed -i "s|/api\"|$API_PREFIX\"|g" "$HTML_PATH"/*.js

echo "[INFO] Starting nginx..."
nginx -g 'daemon off;'
