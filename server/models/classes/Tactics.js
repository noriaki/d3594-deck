const assetHost = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com';
const assetUriBase = `${assetHost}/images/tactics`;
const fileMap = {
  指揮: 'shiki',
  主動: 'shudo',
  追撃: 'tsuigeki',
  受動: 'judo',
};
const baseOrigin = ['典蔵', '典籍', '季専用', '分析', '固有(初期)'];

class Tactics {
  buildImageURL(density) {
    const suffix = density != null ? `@${density}` : '';
    const filename = `${fileMap[this.type]}${suffix}.png`;
    return `${assetUriBase}/${filename}`;
  }

  static buildImageURL({ stage, permissions, type }, user, density) {
    let basename = `${fileMap[type]}`;
    if (stage && stage[0] !== 'S1') {
      basename = `${basename}-${stage[0]}`;
    }
    if (permissions && user && !permissions.includes(user.army)) {
      basename = `${basename}-nonarmy`;
    }
    if (density) {
      basename = `${basename}@${density}`;
    }
    return `${assetUriBase}/${basename}.png`;
  }

  static getImageSrcSet(tactics, commander) {
    return [
      this.buildImageURL(tactics, commander),
      `${this.buildImageURL(tactics, commander, '2x')} 2x`,
      `${this.buildImageURL(tactics, commander, '3x')} 3x`,
    ];
  }

  get imageURL() {
    return this.constructor.buildImageURL(this);
  }

  get imageSrcSet() {
    return this.constructor.getImageSrcSet(this);
  }
}

Tactics.baseTypesMap = fileMap;
Tactics.baseTypes = Object.keys(fileMap);
Tactics.baseOrigin = baseOrigin;

module.exports = Tactics;
