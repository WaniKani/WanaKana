import zenkakuToASCII from '../../src/utils/zenkakuToASCII';

describe('zenkakuToASCII', () => {
  it('sane default', () => expect(zenkakuToASCII()).toBe(''));

  it('passes parameter tests', () => {
    expect(zenkakuToASCII('come on ＦＨＱＷＨＧＡＤＳ')).toBe('come on FHQWHGADS');
    expect(zenkakuToASCII('ＦＨＱＷＨＧＡＤＳ')).toBe('FHQWHGADS');
    expect(zenkakuToASCII('ｆｈｑｗｈｇａｄｓ')).toBe('fhqwhgads');
  });
});
