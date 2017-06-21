#### Install dependencies from `package.json`
Install [yarn](https://yarnpkg.com/en/docs/install) if not already present,
then install deps via `yarn` shell command

#### Linting
Recommend using an eslint addon for your code editor that can reference the .eslintrc config

#### Committing
Please use `npm run commit` for standardized commit messages!

#### Useful build scripts
- Full list of available tasks `npm run`
- `npm run lint` Lint files
- `npm run test` Run Tests or `npm run test:watch` for continuous development
- `npm run docs` Build docs or `npm run docs:watch` for continuous development
- `npm run build` Build distribution bundles (note: this will be done automatically during release)

#### Publishing new versions
Update CHANGELOG.md with any changes, following the format provided.
Run `npm run release` and follow the prompts. This will lint, test, build packages, docs, demo website, publish to npm, update tags as new release on github, as well as push the website/docs with updated bundle to gh-pages branch.
