const { CronJob } = require('cron');
const { AT_MIDNIGHT } = require('./cron-time-formats');
const {
  mailErrorLog,
  // logDate,
} = require('./cron-jobs');

// https://www.npmjs.com/package/cron
// https://github.com/kelektiv/node-cron/tree/master/examples

const job1 = new CronJob(AT_MIDNIGHT, mailErrorLog);
// const job2 = new CronJob(AT_MIDNIGHT, logDate);

job1.start();
// job2.start();
