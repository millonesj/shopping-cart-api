#!/bin/bash
dir_test=./node_modules

if [ ! -d $dir_test ]; then
  echo "NPM UPDATE! => $NODE_ENV "
  yarn install
fi

if [ "$NODE_ENV" == 'development' ]; then
  echo "DEV MODE ::."
  yarn start:dev
else
  echo "PRODUCTION MODE ::."
  yarn start:prod
fi
