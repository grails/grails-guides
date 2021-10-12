###################################
# Downloads the reusable scripts from infrastructure and invokes them
###################################

#!/bin/bash
set -e

export EXIT_STATUS=0

curl -O https://raw.githubusercontent.com/grails/grails-guides/master/action-scripts/check-and-publishGuide-script.sh
chmod 777 check-and-publishGuide-script.sh

./check-and-publishGuide-script.sh || EXIT_STATUS=$?
