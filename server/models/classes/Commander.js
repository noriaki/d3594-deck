const { host: assetHost } = require('../../../constants/assets');

const assetUriBase = `${assetHost}/images/commanders`;

const baseArmyMap = {
  弓: 'archer',
  歩: 'infantry',
  騎: 'cavalry',
};
const baseTeamMap = {
  群: 'gun',
  魏: 'gi',
  蜀: 'shoku',
  呉: 'go',
  漢: 'kan',
};
const baseMap = {
  army: baseArmyMap,
  team: baseTeamMap,
};

class Commander {
  static initialize(commander = {}) {
    const { id, name, identifier } = commander;
    if (id != null && name != null && identifier != null) {
      return commander;
    }
    const instance = new this();
    instance.id = '未配置';
    instance.name = '未配置';
    instance.identifier = null;
    return instance;
  }

  get imageURL() {
    return `${assetUriBase}/${this.identifier || 'default'}.jpg`;
  }

  static buildSvgURL(type, commander) {
    const uriBase = `${assetHost}/svgs`;
    if (type === 'name') {
      const { identifier } = commander;
      const id = identifier || 'default';
      return `${uriBase}/commanders/${id}.svg`;
    }
    if (type === 'army' || type === 'team') {
      const id = baseMap[type][commander[type]];
      return `${uriBase}/assets/${type}-${id}.svg`;
    }
    throw new Error(
      `Runtime Error (Commander.buildSvgURL): Not support type [${type}]`
    );
  }

  static buildNameSvgURL(commander = {}) {
    return this.buildSvgURL('name', commander);
  }

  static buildArmySvgURL(commander = {}) {
    return this.buildSvgURL('army', commander);
  }

  static buildTeamSvgURL(commander = {}) {
    return this.buildSvgURL('team', commander);
  }

  svgURL(type) {
    return this.constructor.buildSvgURL(type, this);
  }

  get nameSvgURL() {
    return this.svgURL('name');
  }

  get armySvgURL() {
    return this.svgURL('army');
  }

  get teamSvgURL() {
    return this.svgURL('team');
  }
}

Commander.baseRarity = [5, 4, 3, 2, 1];
Commander.baseArmy = ['弓', '歩', '騎'];
Commander.baseArmyMap = baseArmyMap;
Commander.baseTeam = ['群', '魏', '蜀', '呉', '漢'];
Commander.baseTeamMap = baseTeamMap;
Commander.baseDistance = [5, 4, 3, 2, 1];
Commander.baseCost = [4, 3.5, 3, 2.5, 2, 1.5, 1];

module.exports = Commander;
