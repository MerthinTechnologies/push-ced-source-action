import 'reflect-metadata';
import * as core from '@actions/core';
import cli, { GlobalErrorHandler } from '@ced/cli';

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

  const command = cli({
    token: cliToken,
    workingPath: path,
    config: {
      useConsoleSpinner: false,
    },
  }).pushSource();
  await command.run(environment);
};

run();
