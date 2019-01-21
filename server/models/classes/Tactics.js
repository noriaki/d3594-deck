const assetHost = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com';
const assetUriBase = `${assetHost}/images/tactics`;
const fileMap = {
  指揮: 'shiki',
  主動: 'shudo',
  追撃: 'tsuigeki',
  受動: 'judo',
};
const baseOrigin = ['固有(初期)', '分析', '典蔵', '典籍', '季専用'];

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

Tactics.baseTypesMap = fileMap;
Tactics.baseTypes = Object.keys(fileMap);
Tactics.baseOrigin = baseOrigin;
module.exports = Tactics;
