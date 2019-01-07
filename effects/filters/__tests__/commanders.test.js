import { allExistsHaveTactics } from '../commanders';

describe('effects/filters/commanders', () => {
  describe(allExistsHaveTactics, () => {
    const commanderWithTactics = { tactics: {} };
    const commanderWithoutTactics = {};

    describe('returning `true` case:', () => {
      const expected = true;

      it('[null, null, null]', () => {
        const subject = [null, null, null];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });

      it('[null, commanderWithTactics, commanderWithTactics]', () => {
        const subject = [
          null,
          commanderWithTactics,
          commanderWithTactics,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });

      it('[commanderWithTactics, commanderWithTactics, commanderWithTactics]', () => {
        const subject = [
          commanderWithTactics,
          commanderWithTactics,
          commanderWithTactics,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });
    });

    describe('returning `false` case:', () => {
      const expected = false;

      it('[null, null, commanderWithoutTactics]', () => {
        const subject = [
          null,
          null,
          commanderWithoutTactics,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });

      it('[commanderWithoutTactics, commanderWithTactics, null]', () => {
        const subject = [
          commanderWithoutTactics,
          commanderWithTactics,
          null,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });

      it('[commanderWithoutTactics, commanderWithTactics, commanderWithTactics]', () => {
        const subject = [
          commanderWithoutTactics,
          commanderWithTactics,
          commanderWithTactics,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });

      it('[commanderWithoutTactics, commanderWithoutTactics, commanderWithoutTactics]', () => {
        const subject = [
          commanderWithoutTactics,
          commanderWithoutTactics,
          commanderWithoutTactics,
        ];
        expect(allExistsHaveTactics(subject)).toBe(expected);
      });
    });
  });
});
