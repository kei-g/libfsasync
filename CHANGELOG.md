# ChangeLogs

## Version 1.0.16

- :poop: Correct the erroneous preceding release

## Version 1.0.15

- :green_heart: CI
  - An external action is now used to create a release on GitHub
  - Events that occur during branch creation are now ignored to avoid executing 'Release' workflow
  - Node.js version 20.x is added for CI
  - The 'github' job on 'Release' workflow now fails if github.ref is inappropriate
  - The latest Node.js is now used to publish the package
  - The workflow to automatically merge PRs from Dependabot[bot] is added
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.3.4 to 4.3.5
  - `@types/node` is bumped from 18.11.18 to 20.1.3
  - `@typescript-eslint/eslint-plugin` is bumped from 5.48.2 to 5.59.5
  - `@typescript-eslint/parser` is bumped from 5.48.2 to 5.59.5
  - `esbuild` is bumped from 0.17.4 to 0.17.18
  - `eslint` is bumped from 8.32.0 to 8.40.0
  - `rimraf` is bumped from 4.1.1 to 5.0.0
  - `typescript` is bumped from 4.9.4 to 5.0.4

## Version 1.0.14

- :arrow_up: Packages for development are bumped
  - `esbuild` is bumped from 0.17.1 to 0.17.4
  - `rimraf` is bumped from 4.1.0 to 4.1.1

## Version 1.0.13

- :green_heart: CI
  - Alternate implementation is added instead of `actions/create-release`
  - Ignore branches on 'create' event not to run 'Release' workflow
  - Workflow is renamed from 'Create Release' to 'Release'
- :arrow_up: Packages for development are bumped
  - `@typescript-eslint/eslint-plugin` is bumped from 5.48.1 to 5.48.2
  - `@typescript-eslint/parser` is bumped from 5.48.1 to 5.48.2
  - `esbuild` is bumped from 0.17.0 to 0.17.1
  - `eslint` is bumped from 8.31.0 to 8.32.0
  - `rimraf` is bumped from 4.0.5 to 4.1.0

## Version 1.0.12

- :arrow_up: Packages for development are bumped
  - `@typescript-eslint/eslint-plugin` is bumped from 5.48.0 to 5.48.1
  - `esbuild` is bumped from 0.16.17 to 0.17.0
  - `rimraf` is bumped from 4.0.4 to 4.0.5

## Version 1.0.11

- :arrow_up: Packages for development are bumped
  - `esbuild` is bumped from 0.16.16 to 0.16.17
  - `rimraf` is bumped from 3.0.2 to 4.0.4

## Version 1.0.10

- :arrow_up: Packages for development are bumped
  - `@typescript-eslint/parser` is bumped from 5.48.0 to 5.48.1
  - `esbuild` is bumped from 0.16.15 to 0.16.16

## Version 1.0.9

- :green_heart: CI chore
  - Name of the step to get commit summary for create release is fixed
- :arrow_up: Packages for development are bumped
  - `@types/node` is bumped from 18.11.17 to 18.11.18
  - `@typescript-eslint/eslint-plugin` is bumped from 5.47.0 to 5.48.0
  - `@typescript-eslint/parser` is bumped from 5.47.0 to 5.48.0
  - `esbuild` is bumped from 0.16.10 to 0.16.15
  - `eslint` is bumped from 8.30.0 to 8.31.0

## Version 1.0.8

- :green_heart: CI chore
  - `actions/checkout` is bumped from 2 to 3
  - `actions/setup-node` is bumped from 2 to 3
  - `actions/upload-artifact` is bumped from 2 to 3
  - CodeQL is installed
  - Job to create release is modified
  - Package ecosystem for GitHub actions is added to Dependabot
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.3.0 to 4.3.4
  - `@types/mocha` is bumped from 9.1.0 to 10.0.1
  - `@types/node` is bumped from 17.0.12 to 18.11.17
  - `@typescript-eslint/eslint-plugin` is bumped from 5.10.1 to 5.47.0
  - `@typescript-eslint/parser` is bumped from 5.10.1 to 5.47.0
  - `chai` is bumped from 4.3.5 to 4.3.7
  - `esbuild` is bumped from 0.14.14 to 0.16.10
  - `eslint` is bumped from 8.6.0 to 8.30.0
  - `mocha` is bumped from 9.2.0 to 10.2.0
  - `ts-node` is bumped from 10.4.0 to 10.9.1
  - `typescript` is bumped from 4.5.4 to 4.9.4

## Version 1.0.7

- :hammer: Build script is improved
  - Output format is explicitly specified as 'cjs'
  - 'pre-' is separated from 'build' script
  - 'start' script is removed
- :arrow_up: Bumps packages for development
  - `@types/mocha` is bumped from 9.0.0 to 9.1.0
  - `@types/node` is bumped from 16.11.12 to 17.0.12
  - `@typescript-eslint/eslint-plugin` is bumped from 5.6.0 to 5.10.1
  - `@typescript-eslint/parser` is bumped from 5.6.0 to 5.10.01
  - `chai` is bumped from 4.3.4 to 4.3.5
  - `esbuild` is bumped from 0.14.2 to 0.14.14
  - `eslint` is bumped from 8.4.1 to 8.7.0
  - `mocha` is bumped from 9.1.3 to 9.2.0
  - `typescript` is bumped from 4.5.2 to 4.5.5
- :green_heart: CI changes
  - `npm` becomes to be upgraded before setup modules
  - A Farewell to Travis
- :memo: Documents are updated

## Version 1.0.6

- :hammer: Build script is improved
  - 'esbuild' and 'tsc' is made to run in parallel on 'npm run build'
- :technologist: Developper experience is improved
  - Cache is used by `actions/setup-node@v2` on GitHub CI
  - Node.js versions are bumped on GitHub CI
    - 16.13.1 is used instead of 16.13.0
    - 17.2.0 is used instead of 17.1.0
  - Triggers are added to the 'test' job on GitHub CI
- :arrow_up: Packages for development are bumped
  - `@types/chai` is bumped from 4.2.22 to 4.3.0
  - `@types/node` is bumped from 16.11.11 to 16.11.12
  - `@typescript-eslint/eslint-plugin` is bumped from 5.5.0 to 5.6.0
  - `@typescript-eslint/parser` is bumped from 5.5.0 to 5.6.0
  - `esbuild` is bumped from 0.14.1 to 0.14.2
  - `eslint` is bumped from 8.3.0 to 8.4.1

## Version 1.0.5

- :technologist: Developer experience is improved

## Version 1.0.4

- :package: The declaration file path is corrected

## Version 1.0.3

- :coffin: An unnecessary file is purged
- :building_construction: Migration from `terser` to `esbuild`

## Version 1.0.2

- :memo: `mocha` logo becomes to be used for coverage badge
- :heavy_minus_sign: `uuid` is removed from development packages
- :memo: CONTRIBUTING.md is added
- :sparkles: New APIs are added
  - closeAsync
  - fstatAsync
  - openAsync
  - renameAsync
- :arrow_up: Packages for development are updated
  - `@types/chai` is upgraded from 4.2.21 to 4.2.22
  - `@types/node` is upgraded from 16.7.1 to 16.11.7
  - `@typescript-eslint/eslint-plugin` is upgraded from 4.29.3 to 5.3.1
  - `@typescript-eslint/parser` is upgraded from 4.29.3 to 5.3.1
  - `eslint` is upgraded from 7.32.0 to 8.2.0
  - `mocha` is upgraded from 9.1.0 to 9.1.3
  - `terser` is upgraded from 5.7.2 to 5.9.0
  - `ts-node` is upgraded from 10.2.1 to 10.4.0
  - `typescript` is upgraded from 4.3.5 to 4.4.4

## Version 1.0.1

- :memo: Badges are relocated
- :bug: Bugfix for development utility or test codes
  - inappropriate regexp is corrected
  - invalid evaluation of function is corrected
- :white_check_mark: Coverage badge is added
- :green_heart: Github Action for CI
- :sparkles: New APIs are added
  - readlinkAsync
  - realpathAsync

## Version 1.0.0

- :tada: Initial release
