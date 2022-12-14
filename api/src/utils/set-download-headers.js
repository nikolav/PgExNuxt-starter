const forOwn = require('lodash/forOwn');

const downloadHeaders = (size = 0, filename = 'downloaded.file') => ({
  'Content-Disposition': `attachment; filename=${filename}`,
  'Content-Type': 'application/octet-stream',
  'Content-Length': size,
  'Content-Transfer-Encoding': 'binary',
  'Content-Description': 'File Transfer',
  'Cache-Control': 'must-revalidate, post-check=0, pre-check=0',
  Pragma: 'public',
  Expires: '0',
});

const setDownloadHeaders = ({ res, size, filename }) => {
  forOwn(downloadHeaders(size, filename), (value, header) =>
    res.setHeader(header, value)
  );
};

module.exports = setDownloadHeaders;
