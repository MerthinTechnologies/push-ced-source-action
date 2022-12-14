import 'reflect-metadata';
import * as core from '@actions/core';
import cli, { GlobalErrorHandler } from '@ced/cli-dev';

GlobalErrorHandler.set();

const run = async () => {
  const cliToken = core.getInput('cli-token') || process.env['CED_CLI_TOKEN'];
  const environment =
    core.getInput('environment') || process.env['CED_ENVIRONMENT'];
  const path = core.getInput('path') || process.env['CED_PROJECT_PATH'];

  if (!cliToken) {
    throw new Error(
      `Missing CED CLI token. Provide a CLI token by "cli-token" input parameter or define a variable "CED_CLI_TOKEN".`
    );
  }

  if (environment) {
    console.log(`Using environment: ${environment}`);
  }

  const versionMetadata = {
    vcs: 'GitHub',
    commitSha: process.env['GITHUB_SHA'],
    repositoryUrl: `${process.env['GITHUB_SERVER_URL']}/${process.env['GITHUB_REPOSITORY']}`,
  };

  const cedCli = cli({
    token: cliToken,
    workingPath: path,
    config: {
      useConsoleSpinner: false,
    },
  });
  const version = await cedCli.createVersion().run(environment);

  await cedCli.setVersionMetadata().run(version, versionMetadata, environment);
  await cedCli.pushSource().run(environment, version);
};

run();
