const assetHost = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com';
const assetUriBase = `${assetHost}/images/commanders`;

class Commander {
  get imageURL() { return `${assetUriBase}/${this.image}`; }
}

Commander.baseRarity = [5, 4, 3, 2, 1];
Commander.baseArmy = ['弓', '歩', '騎'];
Commander.baseTeam = ['群', '魏', '蜀', '呉', '漢'];

module.exports = Commander;
