import { humanizeId, identify } from '../identify';

describe('models/concerns', () => {
  describe('humanizeId', () => {
    it('has `special`', () => {
      const subject = {
        name: '張機',
        rarity: 5,
        special: 'XP',
        team: '漢',
        army: '弓',
      };
      const expected = '★5・張機(XP)・漢・弓';
      expect(humanizeId(subject)).toBe(expected);
    });

    it('has not `special`', () => {
      const subject = {
        name: '張飛',
        rarity: 5,
        special: null,
        team: '蜀',
        army: '騎',
      };
      const expected = '★5・張飛・蜀・騎';
      expect(humanizeId(subject)).toBe(expected);
    });
  });

  describe('identify', () => {
    it('return md5 id', () => {
      const subject = {
        name: '張飛',
        rarity: 5,
        special: null,
        team: '蜀',
        army: '騎',
      };
      const expected = '01c2528d0222d53fc20e845ceb6dd8f8';
      expect(identify(subject)).toBe(expected);
    });
  });
});
