# Grails Guides

This is the base repository for the Grails guides infrastructure. The guides themselves are published in the `gh-pages` branch.

The following describes the purpose of the various directories:

* `gradle` - Contains the build logic used to build the guides
* `travis` - Contains the Travis script used to build the guides
* `src/main/docs` - Contains common content used by all guides
* `src/main/project` - Contains a project template to get started
* `src/main/resources` - Contains the template used to build the guides (CSS, images, HTML etc.)

## Creating a Guide

To create a new guide run the `create-guide.sh` script:

```groovy
./create-guide.sh my-new-guide
```

## Pubishing the Guide

To publish the guide setup in the Grails guides organization: https://github.com/grails-guides

And checkin the guide using Git. Then activate travis and use `travis encrypt` to encode the necessary tokens for the publishing to work:

```bash
travis encrypt GH_TOKEN=... --add
travis encrypt GIT_NAME=myname
travis encrypt GIT_EMAIL=myemail
``` 