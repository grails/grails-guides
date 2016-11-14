#!/bin/bash
set -e

export EXIT_STATUS=0

./gradlew check || EXIT_STATUS=$?

if [[ $EXIT_STATUS -eq 0 ]]; then
    ./gradlew publishGuide || EXIT_STATUS=$?
fi

if [[ $EXIT_STATUS -eq 0 && $TRAVIS_BRANCH == 'master' && $TRAVIS_PULL_REQUEST == 'false' ]]; then
    echo "Publishing Documentation"
    git config --global user.name "$GIT_NAME"
    git config --global user.email "$GIT_EMAIL"
    git config --global credential.helper "store --file=~/.git-credentials"
    echo "https://$GH_TOKEN:@github.com" > ~/.git-credentials

    git clone https://${GH_TOKEN}@github.com/grails/grails-guides.git -b gh-pages gh-pages --single-branch > /dev/null
    
    ./gradlew updateGuidesJson

    cd gh-pages

        
    # If this is the master branch then update the snapshot
    mkdir -p "$GUIDE_NAME"
    cp -r ../build/docs/. "./$GUIDE_NAME/"

    git add .   

    git commit -a -m "Publishing Grails Guide for Travis Build: https://travis-ci.org/$TRAVIS_REPO_SLUG/builds/$TRAVIS_BUILD_ID"
    git push origin HEAD
    cd ..
    rm -rf gh-pages
fi    

exit $EXIT_STATUS