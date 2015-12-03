#!/bin/bash -eu

npm run build
npm run watch
bundle exec jekyll serve --watch