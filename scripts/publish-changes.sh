#!/bin/sh
FOLDER=$1
WORKING_DIR="${CIRCLE_WORKING_DIRECTORY:-.}"
CLONE_DIR="__${FOLDER}__clone__"

echo "Publishing read-only clone of $FOLDER"

git clone https://$GH_TOKEN@github.com/dschau/gatsby-starter-$FOLDER.git $CLONE_DIR
cp -r $WORKING_DIR/starters/$FOLDER/. $CLONE_DIR
cd $CLONE_DIR
git add .
git commit --message "chore: syncing with gatsbyjs/starters monorepo"
git push origin master
