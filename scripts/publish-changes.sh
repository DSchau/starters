#!/bin/sh
FOLDER=$1
CLONE_DIR="__${FOLDER}__clone__"

set -e

echo "Publishing read-only clone of $FOLDER"

git clone https://$GH_TOKEN@github.com/dschau/gatsby-starter-$FOLDER.git $CLONE_DIR
cp -r starters/$FOLDER/. $CLONE_DIR
cd $CLONE_DIR
git add .
git commit --message "chore: syncing with gatsbyjs/starters monorepo"
git push origin master
