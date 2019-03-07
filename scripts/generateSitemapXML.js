const sm = require('sitemap');
const AWS = require('aws-sdk');

const { connect, preloadModels, disconnect } = require('../server/db');
const Formation = require('../server/models/Formation');

const isDev = process.env.NODE_ENV !== 'production';

const logAndExit = (error) => { console.error(error); process.exit(1); };

const main = async () => {
  // setup
  await connect();
  preloadModels();

  const hostname = 'https://deck.d3594.com';
  const pfs = await Formation.find(
    { published: true },
    'identifier updatedAt',
    { sort: { updatedAt: 'desc' } }
  );
  const urls = ['/', ...pfs.map(({ identifier, updatedAt }) => ({
    url: `/f/${identifier}`, lastmodISO: updatedAt.toISOString(),
  }))];
  console.log(`Fetched published urls: count ${urls.length}`);

  const sitemap = sm.createSitemap({ hostname, urls }).toString();
  console.log('Generate sitemap.xml, Uploading...');
  if (isDev) {
    console.log(sitemap);
  } else {
    await uploadSitemap(sitemap);
  }

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);

const uploadSitemap = (sitemap) => {
  if (isDev) {
    // eslint-disable-next-line global-require
    const s3Options = require('../.aws-s3-creds.json');
    AWS.config.update(s3Options);
  }
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  const bucket = 'assets-deck.d3594.com';
  const objectKey = 'assets/sitemap.xml';
  const mimeType = 'application/xml';

  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: bucket,
      Key: objectKey,
      Body: sitemap.toString(),
      ACL: 'public-read',
      ContentType: mimeType,
    }, (err, data) => {
      if (err) { reject(err); }
      console.log(`Completed.\n URI: ${data.Location}`);
      resolve(data.Location);
    });
  });
};
