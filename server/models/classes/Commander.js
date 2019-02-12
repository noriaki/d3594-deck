const { host: assetHost } = require('../../../constants/assets');

const assetUriBase = `${assetHost}/images/commanders`;

class Commander {
  static initialize() {
    const instance = new this();
    instance.id = '未配置';
    instance.name = '未配置';
    instance.identifier = null;
    return instance;
  }

  get imageURL() {
    return `${assetUriBase}/${this.identifier || 'default'}.jpg`;
  }
}

Commander.baseRarity = [5, 4, 3, 2, 1];
Commander.baseArmy = ['弓', '歩', '騎'];
Commander.baseTeam = ['群', '魏', '蜀', '呉', '漢'];
Commander.baseDistance = [5, 4, 3, 2, 1];
Commander.baseCost = [4, 3.5, 3, 2.5, 2, 1.5, 1];

module.exports = Commander;
