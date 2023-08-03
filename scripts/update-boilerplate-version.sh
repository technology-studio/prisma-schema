#!/usr/bin/env bash

LATEST=$(
  git ls-remote -h git@github.com:technology-studio/test-boilerplate-typescript.git |
  grep refs/heads/master | awk '{ print $1 }'
)
echo $LATEST > .boilerplate-version
echo "Updated boilerplate version to: $LATEST"
