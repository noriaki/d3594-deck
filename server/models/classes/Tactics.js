const assetHost = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com';
const assetUriBase = `${assetHost}/images/tactics`;
const fileMap = {
  指揮: 'shiki',
  主動: 'shudo',
  追撃: 'tsuigeki',
  受動: 'judo',
};

class Tactics {
  buildImageURL(density) {
    const suffix = density != null ? `@${density}` : '';
    const filename = `${fileMap[this.type]}${suffix}.png`;
    return `${assetUriBase}/${filename}`;
  }

  get imageURL() { return this.buildImageURL(); }

  get imageSrcSet() {
    return [
      this.buildImageURL(),
      `${this.buildImageURL('2x')} 2x`,
      `${this.buildImageURL('3x')} 3x`,
    ];
  }
}

module.exports = Tactics;
