#!/bin/bash
# Usage: ./start-local.sh build|up
source ~/.bashrc
nvm use 6.9.5

export KENDO_USERNAME=hiranya.samarasekera@trycake.com
export KENDO_PASSWORD=3nclaveYeah!

echo "####################################"
echo "####"
echo "## docker-compose - BUILD #"
echo "## KENDO_USERNAME => $KENDO_USERNAME ##"
echo "## KENDO_PASSWORD => $KENDO_PASSWORD ##"
echo "####"
echo "####################################"

docker-compose -f docker/docker-compose.local.yml $1
