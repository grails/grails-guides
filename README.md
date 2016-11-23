# Grails Guides

This is the base repository for the Grails guides infrastructure. The guides themselves are published in the `gh-pages` branch.

The following describes the purpose of the various directories:

* `gradle` - Contains the build logic used to build the guides
* `travis` - Contains the Travis script used to build the guides
* `src/main/docs` - Contains common content used by all guides
* `src/main/project` - Contains a project template to get started
* `src/main/resources` - Contains the template used to build the guides (CSS, images, HTML etc.)

## Creating a Guide

To create a new guide first make sure you have `grails` and `gradle` installed and set to the appropriate versions you want to use for the guide. Then run the `create-guide.sh` script:

```groovy
./create-guide.sh my-new-guide
```

The name of the guide should be in all lower case and hyphen separated as in the example above.

## Pubishing the Guide

To publish the guide create a new repository in the Grails guides organization: https://github.com/grails-guides

The repository name should match the name you used when running the `create-guide.sh` script in the previous step.

And checkin the guide using Git. Then activate Travis for the repository and use `travis encrypt` to encrypt the necessary tokens for the publishing to work:

```bash
travis encrypt GH_TOKEN=... --add
travis encrypt GIT_NAME=myname --add
travis encrypt GIT_EMAIL=myemail --add
``` 

See https://docs.travis-ci.com/user/environment-variables/ for more details on encrypting environment variables for Travis.

If the build is sucessful the Guide will be published to http://guides.grails.org/my-new-guide 
