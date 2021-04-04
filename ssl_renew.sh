#!/bin/bash

CLIENT_PATH=~/waldo-frontend

cd $CLIENT_PATH

COMPOSE="${CLIENT_PATH}/bin/dc -p"
DOCKER="/usr/bin/docker"

$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP web
$DOCKER system prune -af
