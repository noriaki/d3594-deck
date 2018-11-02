const assetHost = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com';
const assetUriBase = `${assetHost}/images/commanders`;

class Commander {
  get imageURL() { return `${assetUriBase}/${this.image}`; }
}

module.exports = Commander;
