################################
# Invokes Reusable gradlew tasks which working grails guides use.
################################

#!/bin/bash
set -e

export EXIT_STATUS=0

echo "***** Running gradlew check for $GITHUB_REPOSITORY"

./gradlew -Dgeb.env=chromeHeadless check || EXIT_STATUS=$?

if [[ $EXIT_STATUS -ne 0 ]]; then
    echo "Check failed"
    exit $EXIT_STATUS
fi

echo "***** Running gradlew publishGuide for $GITHUB_REPOSITORY"

./gradlew publishGuide || EXIT_STATUS=$?
if [[ $EXIT_STATUS -ne 0 ]]; then
    echo "PublishGuide failed"
    exit $EXIT_STATUS
fi
exit 0
