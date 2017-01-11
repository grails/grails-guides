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

### Profiles

If you would like to use a profile for your guide's project, simply specifiy the profile name after the guide name.

```
./create-guide.sh my-new-guide -profile angular
```

### Images

Images are resolved from `src/main/resources/img`. You can reference images
from that directory using accidoc's `image` directivez 

```
image::screenshot.png[]
```

## Publishing the Guide

To publish the guide create a new repository in the Grails guides organization: https://github.com/grails-guides

The repository name should match the name you used when running the `create-guide.sh` script in the previous step.

And checkin the guide using Git. Then activate Travis for the repository and use `travis encrypt` to encrypt the necessary tokens for the publishing to work. You will need the following tokens:

1. `GH_TOKEN` - Generate a Personal Access Token from your Github Settings: https://github.com/settings/tokens/new - Select the "Repo" scope and copy the generated token
2. `GIT_NAME` - Your Git username
3. `GIT_EMAIL` - Your Git username

Now you can encrypt these tokens with `travis encrypt`:

```bash
travis encrypt GH_TOKEN=... --add
travis encrypt GIT_NAME=myname --add
travis encrypt GIT_EMAIL=myemail --add
``` 

The encrypted tokens will be saved to `.travis.yml`. Commit the updated file to your guide repo.

Finally, activate the Travis Service from your Github repo setting: https://github.com/grails-guides/[your-guide]/settings/installations. Select Travis CI from the "Add Service" list, and supply the following parameters:

1. Username: Your Github username
2. Token: The Personal Access Token you generated above
3. Domain: `notify.travis-ci.org`

See https://docs.travis-ci.com/user/environment-variables/ for more details on encrypting environment variables for Travis.

The Travis CI will begin building your guide upon the next push to the repo. You can view the status of your guide at: https://travis-ci.org/grails-guides/[your-guide].

If the build is sucessful the Guide will be published to http://guides.grails.org/my-new-guide 
