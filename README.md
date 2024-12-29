## Typescript ECS Template

![Deploy Badge](https://github.com/ZenobeEnergy/typescript-ecs-template/actions/workflows/deploy.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=typescript-ecs-template&metric=alert_status&token=1763b244825db15276038b9621930e080db89c9d)](https://sonarcloud.io/summary/new_code?id=typescript-ecs-template)

A template repository for a Typescript/Node.js project, deployed to ECS with CDK

## Installation

```sh
$ npm install
```

## Setup
Create a personal access token on GitHub and populate the following:

`export NODE_AUTH_TOKEN=<Blah>`

You can also stick this into your `.zshrc` file, so you don't need to keep exporting it.

Edit `sonar-project.properties` with your project name, and populate `SONAR_TOKEN` as a repo variable on GitHub

Update `.github/CODEOWNERS` to reflect the team responsible for the project

Update any references to `<my-service-name>`

Remove job conditions in `deploy.yml` and `pull_request.yml`


## Running the app

```sh
# development
$  npm run start 
```

```sh
# watch mode
$ npm run start:dev 
```

```sh
# production mode
$ npm run start:prod
```


## CDK
```sh
# set environment
$ export DEPLOY_STAGE=test
```

```sh
# synth
$ cdk synth
```

## Test

```sh
# unit tests
$ npm run test
```

```sh
# e2e tests
$ npm run test:e2e
```

```sh
# test coverage
$ npm run test:cov
```
