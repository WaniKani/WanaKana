#### Install dependencies from `package.json`
Install [node LTS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/docs/install),
then install deps via `yarn` shell command.

#### Committing
Please use `yarn cz` for standardized commit messages!

#### Linting & Formatting
Recommend using an eslint addon for your code editor that can reference the .eslintrc config.
Files will be formatted using prettier during commit, so many errors will be fixed automagically anyway.
Any leftover linting errors will be displayed after formatting and will need to be corrected.
After fixing, you can re-use your commit message details with `yarn cz --retry`.

#### Useful build scripts
- `yarn test` Run Tests or `yarn test:watch` for continuous development, or `yarn test:view` to open in browser
- `yarn docs` Build docs or `yarn docs:watch` for continuous development, or `yarn docs:view` to open in browser
- `yarn build` Build distribution bundles (note: this will still be done automatically during release)

#### Publishing new versions
Update CHANGELOG.md with any changes, following the format provided.
Run `yarn release` and follow the prompts. This will lint, test, build packages, docs, demo website, publish to npm, update tags as new release on github, as well as push the website/docs with updated bundle to gh-pages branch.
