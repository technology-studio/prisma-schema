#!/usr/bin/env bash

LATEST=$(
  git ls-remote -h git@github.com:technology-studio/test-boilerplate-typescript.git |
  grep refs/heads/master | awk '{ print $1 }'
)
CURRENT=$(cat .boilerplate-version)
echo "Latest version: $LATEST"
echo "Current version: $CURRENT"
if [ "$LATEST" != "$CURRENT" ]; then
  echo "🚫 Boilerplate versions do not match! Check test-boilerplate-typescript repo for new changes."
  exit 1
fi
echo "✅ Boilerplate versions match!"
