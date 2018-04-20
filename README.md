# Micronaut Guides

This is the base repository for the Micronaut guides infrastructure. The guides themselves are published in the `gh-pages` branch.

The following describes the purpose of the various directories:

* `gradle` - Contains the build logic used to build the guides
* `travis` - Contains the Travis script used to build the guides
* `src/main/docs` - Contains common content used by all guides
* `src/main/project` - Contains a project template to get started
* `src/main/resources` - Contains the template used to build the guides (CSS, images, HTML etc.)

## Creating a Guide

To create a new guide first make sure you have `mn` and `gradle` installed and set to the appropriate versions you want to use for the guide. Then run the `create-guide.sh` script:

```bash
./create-guide.sh my-new-guide
```

The name of the guide should be in all lower case and hyphen separated as in the example above.

## Working on a Guide

Your next step will probably be to move your guide out of the micronaut-guide root repository and init a git repository

```bash
$ mv my-new-guide my-git-folder/my-new-guide
$ cd my-git-folder/my-new-guide
$ git init
$ git add --all
$ git commit -m "Initial version of the guide. Output of create-guide.sh script"
```

## Guide Style Guide

1. Use package `demo`
2. Don't include unimplemented tests.
3. Use `@CompileStatic` as much as possible
4. Always write the guide against the latest stable version of Micronaut.
5. Root `gradlew` should have execution permission

### Start your guide's documentation

Documentation for your guide is located in `src/main/docs/guide/` and driven by `toc.yml`
Guides are written in [asciidoc](http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/)

### Publish Locally

To publish locally. Run: 

```bash
$ ./gradlew publishGuide
```

and a local version of the guide will be published to your build folder. The command output will tell you where to find it. 

### Profiles

If you would like to use a profile for your guide's project, simply specifiy the profile name after the guide name.

```bash
./create-guide.sh my-new-guide -profile angular
```

### Images

Images are resolved from `src/main/resources/img`. You can reference images
from that directory using accidoc's `image` directive.

```asciidoc
image::screenshot.png[]
```

## Publishing the Guide

To publish the guide 

**1.** Create a new repository in the Micronaut guides organization: https://github.com/micronaut-guides

The repository name should match the name you used when running the `create-guide.sh` script in the previous step.

**2.** Checkin the guide using Git. 

**3.** Activate Travis for the repository 

**4.** Use `travis encrypt` to encrypt the necessary tokens for the publishing to work. You will need the following tokens:

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

**5.** Activate the Travis Service from your Github repo setting: https://github.com/micronaut-guides/[your-guide]/settings/installations. Select Travis CI from the "Add Service" list, and supply the following parameters:

1. Username: Your Github username
2. Token: The Personal Access Token you generated above
3. Domain: `notify.travis-ci.org`

See https://docs.travis-ci.com/user/environment-variables/ for more details on encrypting environment variables for Travis.

The Travis CI will begin building your guide upon the next push to the repo. You can view the status of your guide at: https://travis-ci.org/micronaut-guides/[your-guide].

If the build is sucessful the Guide will be published to http://guides.micronaut.io/my-new-guide 
