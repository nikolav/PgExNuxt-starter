#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const configureCommands = require('./commands');
const { version } = require('../../package.json');

// https://github.com/tj/commander.js
// https://github.com/tj/commander.js/tree/master/examples
const program = new Command();

program
  .name('app-commands')
  .description('App utility CLI')
  .version(version)
  .configureHelp({
    // sortSubcommands: true,
    subcommandTerm: (cmd) => cmd.name(),
  })
  .configureOutput({
    // Visibly override write routines as example!
    // writeOut: (str) => process.stdout.write(chalk.blue(str)),
    // writeErr: (str) => process.stdout.write(chalk.red(str)),

    // Output errors in red.
    outputError: (str, write) => write(chalk.red.bold(str)),
  });

// declare commands
configureCommands(program);

// declare common options for *commands
program.commands.forEach((cmd) => {
  cmd.option('-d, --debug');
  cmd.option('-v, --verbose');
});

program.parse();
