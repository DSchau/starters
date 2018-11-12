#!/bin/sh
FOLDER=$1
WORKING_DIR="${CIRCLE_WORKING_DIRECTORY:-.}"

cd $WORKING_DIR/starters/$FOLDER
git init
git remote add origin https://$GH_TOKEN@github.com/dschau/gatsby-starter-$FOLDER.git
git fetch origin master
git add .
git commit --message "chore: syncing with gatsbyjs/starters monorepo"
git push origin master
