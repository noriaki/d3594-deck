const { send, json } = require('micro');

const setApiHeaders = require('../helpers/setApiHeaders');
const Formation = require('../../models/Formation');
const LearnedCommander = require('../../models/LearnedCommander');

const show = async (req, res) => {
  setApiHeaders(res);
  const formation = await Formation.fetchById(req.params.id);
  if (formation === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Formation not found' },
    });
  }
  return formation;
};

/* pass data[] format:
 { commander: { identifier }, additionalTactics: [identifier, identifier] }
 { commander: { identifier }, additionalTactics: [identifier, null] }
 null
 */
const create = async (req, res) => {
  setApiHeaders(res);
  const data = await json(req);
  const ids = data.map((lcData) => {
    if (lcData == null) { return null; }
    const { identifier: cId } = lcData.commander;
    const tIds = lcData.additionalTactics.map(t => (t && t.identifier));
    return { cId, tIds };
  });
  const lcIds = ids.map(lc => (
    lc && LearnedCommander.identify(lc.cId, lc.tIds)
  ));
  const formationId = Formation.identify(lcIds);
  let formation = await Formation.findById(formationId);
  if (formation == null) {
    const LearnedCommanders = await Promise.all(lcIds.map((lcId, i) => {
      if (lcId === null) { return null; }
      return LearnedCommander.createAssociation(ids[i].cId, ids[i].tIds);
    }));
    formation = await Formation.createAssociation(LearnedCommanders);
  }
  return formation;
};

module.exports = {
  show,
  create,
};
