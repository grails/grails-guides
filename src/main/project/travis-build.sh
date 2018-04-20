#!/bin/bash
set -e

export EXIT_STATUS=0

curl -O https://raw.githubusercontent.com/micronaut-projects/micronaut-guides/master/travis/build-guide
chmod 777 build-guide

./build-guide || EXIT_STATUS=$?

exit $EXIT_STATUS