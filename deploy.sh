#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd .vitepress/dist

echo 'headless-doc.bagisto.com' > CNAME

git init
git add -A
git commit -m 'chore: deploy docs to github'
git push -f git@github.com:bagisto/bagisto-headless-doc.git master:gh-pages

cd -
