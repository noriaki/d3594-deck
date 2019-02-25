const { host: assetHost } = require('../../../constants/assets');

const assetUriBase = `${assetHost}/images/tactics`;
const fileMap = {
  指揮: 'shiki',
  主動: 'shudo',
  追撃: 'tsuigeki',
  受動: 'judo',
};
const baseOrigin = ['典蔵', '典籍', '季専用', '分析', '固有(初期)'];

class Tactics {
  static initialize(tactics) {
    const { name, origin, type } = tactics || {};
    if (name != null && origin != null && type != null) { return tactics; }
    const instance = new this();
    instance.name = '未習得';
    instance.origin = null;
    instance.type = null;
    return instance;
  }

  static buildImageURL(tactics = {}, acquirer, density) {
    const { stage, permissions, type } = tactics;
    let basename = fileMap[type] || 'default';
    if (stage && stage[0] !== 'S1') {
      basename = `${basename}-${stage[0]}`;
    }
    if (permissions && acquirer && !permissions.includes(acquirer.army)) {
      basename = `${basename}-nonarmy`;
    }
    if (density) {
      basename = `${basename}@${density}`;
    }
    return `${assetUriBase}/${basename}.png`;
  }

  static getImageSrcSet(tactics, acquirer) {
    return [
      this.buildImageURL(tactics, acquirer),
      `${this.buildImageURL(tactics, acquirer, '2x')} 2x`,
      `${this.buildImageURL(tactics, acquirer, '3x')} 3x`,
    ];
  }

  get imageURL() {
    return this.constructor.buildImageURL(this);
  }

  get imageSrcSet() {
    return this.constructor.getImageSrcSet(this);
  }

  buildImageURL(density) {
    return this.constructor.buildImageURL(this, null, density);
  }
}

Tactics.baseTypesMap = fileMap;
Tactics.baseTypes = Object.keys(fileMap);
Tactics.baseOrigin = baseOrigin;

module.exports = Tactics;
