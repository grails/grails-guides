#!/bin/bash
set -e

export EXIT_STATUS=0

ng build || EXIT_STATUS=$?

if [[ $EXIT_STATUS -eq 0 && $TRAVIS_BRANCH == 'ui' && $TRAVIS_PULL_REQUEST == 'false' ]]; then
    echo "Publishing Documentation"
    git config --global user.name "$GIT_NAME"
    git config --global user.email "$GIT_EMAIL"
    git config --global credential.helper "store --file=~/.git-credentials"
    echo "https://$GH_TOKEN:@github.com" > ~/.git-credentials

    git clone https://${GH_TOKEN}@github.com/grails/grails-guides.git -b gh-pages gh-pages --single-branch > /dev/null
    
    cp -r dist/ gh-pages/

    cd gh-pages

    git add .   

    git commit -a -m "Updating Guide UI for Travis Build: https://travis-ci.org/$TRAVIS_REPO_SLUG/builds/$TRAVIS_BUILD_ID"
    git push origin HEAD
    cd ..
    rm -rf gh-pages
fi    

exit $EXIT_STATUS