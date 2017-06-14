#### Install dependencies from `package.json`
Install [yarn](https://yarnpkg.com/en/docs/install) if not already present,
then install deps via `yarn` shell command

#### Useful build scripts
- Lint files `npm run lint`
- Run tests `npm test` or `npm run test:watch` for continuous development
- Build docs `npm run docs` or `npm run docs:watch` for continuous development
- Build lib `npm run build`
- Full list of available tasks `npm run`

#### Committing
Please use `npm run commit` for standardized commit messages!

#### Publishing new versions
Update CHANGELOG.md with any changes, following the format provided.
Run `npm run release` and follow the prompts. This will lint, test, build packages, docs, demo, publish to npm, update tags and release on github, as well as push the demo with updated bundle to gh-pages branch.
