# The Agity project


## Turborepo starter with NPM

This repository is set up to use [Turborepo](https://turborepo.org) with [NPM](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

#### Apps
- `app`: a [Next.js](https://nextjs.org) app to provide the core application of Agity.
- `web`: a [Next.js](https://nextjs.org) app to provide the front page of Agity.
- `doc`: a [Next.js](https://nextjs.org) app to provide a documentation and help center.

#### Packages
- `ui`: a simple React component library shared by the applications
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This project has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This is easily done inside the root package.json. 
Run `npm install` to create the symlinks inside node_modules for all apps and packages in this repository.


### Build

To build all apps and packages, run `npm run build`. 

To build a specific app-part of the repository run:`npm run build:app`.

### Develop

To develop all apps and packages, run `npm run dev`.

Running the start script from a subpackage is done with the following command:
```
npm run --workspace app dev
# or for short
npm run -w app dev 
```

### Installing / Uninstalling Dependencies

When installing new packages, you must keep in mind that the commands to install dependencies and run scripts are different as the dependencies are managed by the Turborepo. 
```
npm install --workspace app neverthrow
# or for short
npm i -w app neverthrow
```
Do not try to install the npm project inside the apps itself. This will break your local environment.



### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

### Migrations

If you are using the supabase cli tools, migrations will be handled by that. If you don't use the cli tools (eg. updating selfhosted / production environment), you can migrate via `npm run migrate`. In order to use this command, you will need to add a config file, containing the credentials for your postgress instance. Please create `supabase/migrations/conf/config.js` and add your credentials:

```js
module.exports = 
{
    db_host: 'supabase-db:5432',
    db_user: 'postgres',
    db_password: 'your-super-secret-and-long-postgres-password',
}

```

## Useful links regarding Turborepo

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
