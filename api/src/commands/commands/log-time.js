const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports = (program) => {
  program
    .command('log-time')
    .alias('t')
    .description('log-time command description')
    .argument('<server>', 'argument description')
    .argument('[optional-arg]', 'user account for connection', 'guest')
    // .argument('<values...>', 'values to be summed', stepFnVariadics /* (value, currentTotal) => total */, 0 /* initialValue */ */)
    .option('-f, --flag', 'flag desc.')
    .option('-o, --output <path>', 'option desc.', 'foo')
    .option('-i, --input <string>', 'option desc.', 'bar')
    // .option('-c, --cheese [type]', 'Add cheese with optional type')
    .action((argument1, argument2, command) => {
      const { flag, input, output, debug, verbose } = command;
      console.log({
        argument1,
        argument2,
        flag,
        input,
        output,
        debug,
        verbose,
      });
      console.log(chalk.blue(moment().toLocaleString()));
    });
};

// // Add nested commands using `.command()`.
// const brew = program.command('brew');
// brew
//   .command('tea')
//   .action(() => {
//     console.log('brew tea');
//   });
// brew
//   .command('coffee')
//   .action(() => {
//     console.log('brew coffee');
//   });
