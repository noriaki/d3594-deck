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
}

Tactics.baseTypesMap = fileMap;
Tactics.baseTypes = Object.keys(fileMap);
Tactics.baseOrigin = baseOrigin;
module.exports = Tactics;
