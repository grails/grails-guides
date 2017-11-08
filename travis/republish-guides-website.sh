#!/bin/bash
set -e

export EXIT_STATUS=0

git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"
git config --global credential.helper "store --file=~/.git-credentials"
echo "https://$GH_TOKEN:@github.com" > ~/.git-credentials

git clone https://${GH_TOKEN}@github.com/grails/grails-static-website.git -b master grails-static-website --single-branch > /dev/null

cd grails-static-website

chmod 777 gradlew

./gradlew guides:runShadow || EXIT_STATUS=$?

if [[ $EXIT_STATUS -ne 0 ]]; then
    echo "Guides Website generation failed"
    exit $EXIT_STATUS
fi

cd ..

git clone https://${GH_TOKEN}@github.com/grails/grails-guides.git -b gh-pages gh-pages --single-branch > /dev/null

cd gh-pages

cp -r ../grails-static-website/guides/build/site/* .

if git diff --quiet; then
    echo "No changes in GUIDES Website"
else
    git add *
    git commit -a -m "Updating guides site for Travis build: https://travis-ci.org/$TRAVIS_REPO_SLUG/builds/$TRAVIS_BUILD_ID"
    git push origin HEAD
fi

cd ..

rm -rf grails-static-website

rm -rf gh-pages

exit 0
