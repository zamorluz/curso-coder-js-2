#!/bin/bash
SCRIPT_NAME=`basename "$0"`
PATH_BASE="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" && cd ../ &> /dev/null && pwd )"
PATH_INFRA="$PATH_BASE/infra"
PATH_CODE="$PATH_BASE/src"
cd $PATH_INFRA
docker build -t grunt .
docker-compose -p zamorluz up -d --remove-orphans --force-recreate
./grunt.sh