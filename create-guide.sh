
GUIDE_NAME="$1"

if [[ -n $GUIDE_NAME ]]; then
    mkdir $GUIDE_NAME
    cd $GUIDE_NAME

    grails create-app $GUIDE_NAME
    mv $GUIDE_NAME initial
    mkdir complete
    cp -rf initial/* complete/
    echo "include 'complete'" > settings.gradle
    cp -rf ../src/main/project/* .
    gradle wrapper   

    echo "Guide created at location $GUIDE_NAME/" 
else
    echo "Please specify the guide name (all lower case, hyphen separated). Example: ./create-guide foo-bar"
fi    