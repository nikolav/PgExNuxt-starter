const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

// @inliner
// https://www.npmjs.com/package/juice
// https://www.npmjs.com/package/web-resource-inliner
const juice = require('juice');
const merge = require('lodash/merge');

const { paths: configDefaults } = require('../config/mailer-config');

module.exports = ({
  template = configDefaults.defaultTemplate,
  locals = {},
  config = {},
}) =>
  new Promise(async (resolve, reject) => {
    const options = merge({}, configDefaults, config);
    try {
      // template file to render
      const templatePath = path.join(options.templatesPath, template);

      // run from template export path
      // picks up relative resource paths in html
      // process.chdir(path.dirname(templatePath));

      // build placeholder template
      const hbTemplate = hbs.compile(
        fs.readFileSync(templatePath, 'utf8')
      );

      // render with placeholders
      const html = hbTemplate(locals);

      // inline everything
      juice.juiceResources(
        html,
        {
          webResources: {
            images: true,
            relativeTo: path.dirname(templatePath),
          },
        },
        (error, htmlInlined) =>
          error ? reject(error) : resolve(htmlInlined)
      );
    } catch (error) {
      reject(error);
    }
  });
