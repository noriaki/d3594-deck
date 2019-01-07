import { toQueryForCreateFormationAPI } from '../commanders';

const generateRandomString = () => {
  const rand = Math.random().toString().replace('.', '');
  return `string${rand}`;
};

const identifier = 'raight-identifier';
const expectedObject = { identifier };

const createMockObject = () => ({
  identifier,
  [generateRandomString()]: 'Not output',
});

describe('effects/mappers/commanders', () => {
  describe(toQueryForCreateFormationAPI, () => {
    const commanderBase = {
      [generateRandomString()]: 'Not output',
      commander: createMockObject(),
    };
    const commanderWith2AdditionalTactics = {
      ...commanderBase,
      additionalTactics: [createMockObject(), createMockObject()],
    };
    const commanderWith1AdditionalTactics = {
      ...commanderBase,
      additionalTactics: [createMockObject(), null],
    };
    const commanderWithoutAdditionalTactics = {
      ...commanderBase,
      additionalTactics: [null, null],
    };

    it('[null, null, null]', () => {
      const subject = [null, null, null];
      const expected = [null, null, null];
      expect(toQueryForCreateFormationAPI(subject)).toEqual(expected);
    });

    it('[null, commanderWith2AdditionalTactics, commanderWith1AdditionalTactics]', () => {
      const subject = [
        null,
        commanderWith2AdditionalTactics,
        commanderWith1AdditionalTactics,
      ];
      const expected = [
        null,
        {
          commander: expectedObject,
          additionalTactics: [expectedObject, expectedObject],
        },
        {
          commander: expectedObject,
          additionalTactics: [expectedObject, null],
        },
      ];
      expect(toQueryForCreateFormationAPI(subject)).toEqual(expected);
    });

    it('[commanderWith2AdditionalTactics, commanderWith1AdditionalTactics, commanderWithoutAdditionalTactics]', () => {
      const subject = [
        commanderWith2AdditionalTactics,
        commanderWith1AdditionalTactics,
        commanderWithoutAdditionalTactics,
      ];
      const expected = [
        {
          commander: expectedObject,
          additionalTactics: [expectedObject, expectedObject],
        },
        {
          commander: expectedObject,
          additionalTactics: [expectedObject, null],
        },
        {
          commander: expectedObject,
          additionalTactics: [null, null],
        },
      ];
      expect(toQueryForCreateFormationAPI(subject)).toEqual(expected);
    });
  });
});
