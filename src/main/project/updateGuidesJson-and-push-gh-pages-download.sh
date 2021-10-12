###################################
# Downloads the reusable scripts from infrastructure and invokes them
###################################

#!/bin/bash
set -e

export EXIT_STATUS=0

curl -O https://raw.githubusercontent.com/grails/grails-guides/master/action-scripts/updateGuidesJson-and-push-gh-pages-script.sh
chmod 777 updateGuidesJson-and-push-gh-pages-script.sh

./updateGuidesJson-and-push-gh-pages-script.sh || EXIT_STATUS=$?
