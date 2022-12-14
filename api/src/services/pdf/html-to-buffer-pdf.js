const puppeteer = require('puppeteer');
// eslint-disable-next-line no-global-assign
const Promise = require('bluebird');

// https://www.npmjs.com/package/html-pdf-node
const htmlToPdfBuffer = (
  inlinedHtml,
  args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  options = {
    format: 'Letter', // Letter|A4..
    // printBackground: false,
    // width: 640,
    // height: 480,
  }
) =>
  new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ args, headless: true });
      const page = await browser.newPage();

      await page.setContent(inlinedHtml, { waitUntil: 'networkidle0' });

      Promise.props(page.pdf(options))
        .then(async (data) => {
          await browser.close();
          return Buffer.from(Object.values(data));
        })
        .asCallback((error, buffer) =>
          error ? reject(error) : resolve(buffer)
        );
    } catch (error) {
      reject(error);
    }
  });

module.exports = htmlToPdfBuffer;

// const fs = require('fs');
// const path = require('path');
// const inlineTemplate = require('./src/utils/inline-template');
// const htmlToBufferPdf = require('./src/services/pdf/html-to-buffer-pdf');

// ; (async () => {

//   const message = await inlineTemplate({
//     template: 'test-doc/index.html',
//     locals: {
//       message: `hello --${Date.now()}`
//     },
//     config: {
//       templatesPath: path.join(__dirname, './src/services/pdf')
//     }
//   });

//   const buffer = await htmlToBufferPdf(message);

//   fs.createWriteStream(path.join(__dirname, 'out.pdf')).write(buffer);

// })();
