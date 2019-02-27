const dev = process.env.NODE_ENV !== 'production';

const host = `https://${dev ? 's3-ap-northeast-1.amazonaws.com/' : ''}assets-deck.d3594.com`;

module.exports = {
  host,
};
