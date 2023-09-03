#!/bin/bash
SCRIPT_NAME=`basename "$0"`
PATH_BASE="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" && cd ../ &> /dev/null && pwd )"
PATH_INFRA="$PATH_BASE/infra"
PATH_CODE="$PATH_BASE/src"
cd $PATH_CODE
# $PATH_INFRA/grunt.sh

docker rm -f grunt-run
docker run --mount type=bind,src=$PATH_CODE,dst=/app --name=grunt-run grunt:latest grunt watch