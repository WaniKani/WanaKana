const wk = require('../../dist/wanakana');

Cypress.Commands.add('wkBind', { prevSubject: true }, ($el, options) => {
  wk.bind($el.get(0), options);
  return $el;
});

Cypress.Commands.add('wkUnbind', { prevSubject: true }, ($el) => {
  wk.unbind($el.get(0));
  return $el;
});

Cypress.Commands.add('wk', { prevSubject: true }, ($el, method, options) => {
  wk[method]($el.value(), options);
  return $el;
});

Cypress.Commands.add('setRange', { prevSubject: true }, ($el, start, end) => {
  $el.get(0).setSelectionRange(start, end);
  return $el;
});

describe('binding & unbinding', () => {
  before(() => {
    cy.visit('');
  });
  it('throws if invalid element passed to bind()', () => {
    cy.get('form').then(($el) => {
      expect(() => wk.bind('nah')).throws();
      expect(() => wk.bind([])).throws();
      expect(() => wk.bind($el.get(0))).throws();
    });
  });

  it('throws if invalid element passed to unbind()', () => {
    cy.get('#input').then(($el) => {
      expect(() => wk.unbind('nah')).throws();
      expect(() => wk.unbind([])).throws();
      expect(() => wk.unbind($el.get(0))).throws();
    });
  });

  it('forces IMEMode true and converts for input', () => {
    cy
      .get('#input')
      .wkBind()
      .type('wanakana')
      .should('have.value', 'わなかな')
      .wkUnbind()
      .clear()
      .type('wanakana')
      .should('have.value', 'wanakana')
      .clear();
  });

  it('forces IMEMode true and converts for textarea', () => {
    cy
      .get('#textarea')
      .wkBind()
      .type('wanakana')
      .should('have.value', 'わなかな')
      .wkUnbind()
      .clear()
      .type('wanakana')
      .should('have.value', 'wanakana')
      .clear();
  });

  it('should handle concurrent separate bindings', () => {
    const [sel1, sel2, sel3] = ['#input', '#input2', '#textarea'];
    cy
      .get(sel1)
      .wkBind()
      .get(sel2)
      .wkBind()
      .get(sel3)
      .wkBind()
      .get(sel1)
      .type('wana')
      .should('have.value', 'わな')
      .get(sel2)
      .type('kana')
      .should('have.value', 'かな')
      .get(sel3)
      .type('banana')
      .should('have.value', 'ばなな')
      .get(sel1)
      .wkUnbind()
      .clear()
      .get(sel2)
      .wkUnbind()
      .clear()
      .get(sel3)
      .wkUnbind()
      .clear();
  });

  it('should apply IMEMode toKana method selection', () => {
    cy
      .get('#input')
      .wkBind({ IMEMode: wk.TO_KANA_METHODS.KATAKANA })
      .type('amerika')
      .should('have.value', 'アメリカ')
      .wkUnbind()
      .clear()
      .wkBind({ IMEMode: wk.TO_KANA_METHODS.HIRAGANA })
      .type('KURO')
      .should('have.value', 'くろ')
      .wkUnbind()
      .clear();
  });

  it('should apply useObsoleteKana if specified', () => {
    cy
      .get('#input')
      .wkBind({ useObsoleteKana: true })
      .type('wiweWIWEwo')
      .should('have.value', 'ゐゑヰヱを')
      .wkUnbind()
      .clear();
  });

  it('should apply custom kana mappings if specified', () => {
    cy
      .get('#input')
      .wkBind({ customKanaMapping: { ka: 'ばな' } })
      .type('wanikani')
      .should('have.value', 'わにばなに')
      .wkUnbind()
      .clear();
  });
});

describe('default IME conversions', () => {
  before(() => {
    cy.get('#input').wkBind();
    cy.get('#input2').wkBind({ IMEMode: wk.TO_KANA_METHODS.KATAKANA });
  });

  beforeEach(() => {
    cy
      .get('#input')
      .clear()
      .setRange(0, 0)
      .get('#input2')
      .clear()
      .setRange(0, 0);
  });

  it('should ignore nonascii/zenkaku latin', () => {
    cy
      .get('#input')
      .type('ｈｉｒｏｉ')
      .should('have.value', 'ｈｉｒｏｉ')
      .type('hiroi')
      .should('have.value', 'ｈｉｒｏｉひろい')
      .get('#input2')
      .type('ｈｉｒｏｉ')
      .should('have.value', 'ｈｉｒｏｉ')
      .type('hiroi')
      .should('have.value', 'ｈｉｒｏｉヒロイ');
  });

  it('double consonants', () => {
    cy
      .get('#input')
      .type('gakkounimacchanakatta')
      .should('have.value', 'がっこうにまっちゃなかった')
      .get('#input2')
      .type('gakkounimacchanakatta')
      .should('have.value', 'ガッコウニマッチャナカッタ');
  });

  it("solo n's are not transliterated.", () => {
    cy
      .get('#input')
      .type('n')
      .should('have.value', 'n')
      .get('#input2')
      .type('n')
      .should('have.value', 'n');
  });

  it("solo n's are not transliterated, even when cursor has been relocated.", () => {
    cy
      .get('#input')
      .type('kana')
      .type('{leftArrow}n')
      .should('have.value', 'かnな')
      .setRange(2, 2)
      .trigger('input')
      .should('have.value', 'かnな')
      .type('y')
      .should('have.value', 'かnyな')
      .setRange(3, 3)
      .trigger('input')
      .should('have.value', 'かnyな')
      .type('a')
      .setRange(4, 4)
      .trigger('input')
      .should('have.value', 'かにゃな')
      .get('#input2')
      .type('kana')
      .type('{leftArrow}n')
      .should('have.value', 'カnナ')
      .setRange(2, 2)
      .trigger('input')
      .should('have.value', 'カnナ')
      .type('y')
      .should('have.value', 'カnyナ')
      .setRange(3, 3)
      .trigger('input')
      .should('have.value', 'カnyナ')
      .type('a')
      .setRange(4, 4)
      .trigger('input')
      .should('have.value', 'カニャナ');
  });

  it("double n's are transliterated.", () => {
    cy
      .get('#input')
      .type('nn')
      .should('have.value', 'ん')
      .get('#input2')
      .type('nn')
      .should('have.value', 'ン');
  });

  it('n + space are transliterated.', () => {
    cy
      .get('#input')
      .type('n ')
      .should('have.value', 'ん')
      .get('#input2')
      .type('n ')
      .should('have.value', 'ン');
  });

  it("n + ' are transliterated.", () => {
    cy
      .get('#input')
      .type("n'")
      .should('have.value', 'ん')
      .get('#input2')
      .type("n'")
      .should('have.value', 'ン');
  });

  it('ni.', () => {
    cy
      .get('#input')
      .type('ni')
      .should('have.value', 'に')
      .get('#input2')
      .type('ni')
      .should('have.value', 'ニ');
  });

  it('kan', () => {
    cy
      .get('#input')
      .type('kan')
      .should('have.value', 'かn')
      .get('#input2')
      .type('kan')
      .should('have.value', 'カn');
  });

  it('kanp', () => {
    cy
      .get('#input')
      .type('kanp')
      .should('have.value', 'かんp')
      .get('#input2')
      .type('kanp')
      .should('have.value', 'カンp');
  });

  it('kanpai!', () => {
    cy
      .get('#input')
      .type('kanpai')
      .should('have.value', 'かんぱい')
      .get('#input2')
      .type('kanpai')
      .should('have.value', 'カンパイ');
  });

  it('nihongo', () => {
    cy
      .get('#input')
      .type('nihongo')
      .should('have.value', 'にほんご')
      .get('#input2')
      .type('nihongo')
      .should('have.value', 'ニホンゴ');
  });

  it("y doesn't count as a consonant for IME", () => {
    cy
      .get('#input')
      .type('ny')
      .should('have.value', 'ny')
      .get('#input2')
      .type('ny')
      .should('have.value', 'ny');
  });

  it('nya works as expected', () => {
    cy
      .get('#input')
      .type('nya')
      .should('have.value', 'にゃ')
      .get('#input2')
      .type('nya')
      .should('have.value', 'ニャ');
  });

  it("solo N's are not transliterated - uppercase -> katakana.", () => {
    cy
      .get('#input')
      .type('N')
      .should('have.value', 'N');
  });

  it("double N's are transliterated - uppercase -> katakana.", () => {
    cy
      .get('#input')
      .type('NN')
      .should('have.value', 'ン');
  });

  it('NI - uppercase -> katakana.', () => {
    cy
      .get('#input')
      .type('NI')
      .should('have.value', 'ニ');
  });

  it('KAN - uppercase -> katakana', () => {
    cy
      .get('#input')
      .type('KAN')
      .should('have.value', 'カN');
  });

  it('NIHONGO - uppercase -> katakana', () => {
    cy
      .get('#input')
      .type('NIHONGO')
      .should('have.value', 'ニホンゴ');
  });

  it("doesn't apply toKatakana if mora are mixed case", () => {
    cy
      .get('#input')
      .type('KanA')
      .should('have.value', 'かな');
  });

  it('converts characters after cursor movement', () => {
    cy
      .get('#input')
      .type('wanakana')
      .should('have.value', 'わなかな')
      .type('{leftArrow}{leftArrow}shi')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'わなしかな')
      .get('#input2')
      .type('wanakana')
      .should('have.value', 'ワナカナ')
      .type('{leftArrow}{leftArrow}shi')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'ワナシカナ');
  });

  it('converts correct partial when multiple similar tokens', () => {
    cy
      .get('#input')
      .type('koskoskosko')
      .should('have.value', 'こsこsこsこ')
      .type('{leftArrow}{leftArrow}{leftArrow}o')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'こsこそこsこ')
      .get('#input2')
      .type('koskoskosko')
      .should('have.value', 'コsコsコsコ')
      .type('{leftArrow}{leftArrow}{leftArrow}o')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'コsコソコsコ');
  });
});

describe('emulate device keyboards and IMEs', () => {
  describe("Doesn't interfere with Mobile Kana (flick/tap) Japanese IMEs", () => {
    before(() => {
      cy
        .get('#input')
        .clear()
        .setRange(0, 0)
        .get('#input2')
        .clear()
        .setRange(0, 0);
    });

    beforeEach(() => {
      cy
        .get('#input')
        .clear()
        .setRange(0, 0);
    });

    it('Chrome', () => {
      cy
        .get('#input')
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'か' })
        .trigger('input')
        .should('have.value', 'か')
        .trigger('compositionupdate', { data: 'た' })
        .trigger('input')
        .should('have.value', 'か')
        .invoke('val', 'かっ')
        .setRange(2, 2)
        .trigger('compositionupdate', { data: 'っ' })
        .trigger('input')
        .should('have.value', 'かっ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'た' })
        .trigger('input')
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: '買った' })
        .trigger('input')
        .trigger('compositionend')
        .should('have.value', '買った');
    });
  });

  describe("Doesn't interfere with Desktop (Hiragana mode) Japanese IMEs (modelled on MOZC)", () => {
    beforeEach(() => {
      cy
        .get('#input')
        .clear()
        .setRange(0, 0);
    });
    it('ChromeLessThan53', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'ｋ' })
        .trigger('input')
        .should('have.value', 'ｋ')
        .trigger('compositionupdate', { data: 'か' })
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('input')
        .should('have.value', 'か')
        .trigger('compositionupdate', { data: 'かｔ' })
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .trigger('input')
        .should('have.value', 'かｔ')
        .trigger('compositionupdate', { data: 'かっｔ' })
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .trigger('input')
        .should('have.value', 'かっｔ')
        .trigger('compositionupdate', { data: 'かった' })
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('input')
        .should('have.value', 'かった')
        .trigger('compositionend')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('textinput')
        .trigger('input')
        .should('have.value', '買った');
    });
    it('Chrome', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'ｋ' })
        .trigger('input')
        .should('have.value', 'ｋ')
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('compositionupdate', { data: 'か' })
        .trigger('input')
        .should('have.value', 'か')
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .trigger('compositionupdate', { data: 'かｔ' })
        .trigger('input')
        .should('have.value', 'かｔ')
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かっｔ' })
        .trigger('input')
        .should('have.value', 'かっｔ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かった' })
        .trigger('input')
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: '買った' })
        .trigger('input')
        .trigger('compositionend')
        .should('have.value', '買った');
    });
    it('Firefox', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'ｋ' })
        .trigger('input')
        .should('have.value', 'ｋ')
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('compositionupdate', { data: 'か' })
        .trigger('input')
        .should('have.value', 'か')
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .trigger('compositionupdate', { data: 'かｔ' })
        .trigger('input')
        .should('have.value', 'かｔ')
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かっｔ' })
        .trigger('input')
        .should('have.value', 'かっｔ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かった' })
        .trigger('input')
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: '買った' })
        .trigger('compositionend')
        .trigger('input')
        .should('have.value', '買った');
    });
    it('IE11', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'ｋ' })
        .trigger('input')
        .should('have.value', 'ｋ')
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('input')
        .should('have.value', 'か')
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .trigger('input')
        .should('have.value', 'かｔ')
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .trigger('input')
        .should('have.value', 'かっｔ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('input')
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('compositionend')
        .trigger('input')
        .should('have.value', '買った');
    });
    it('Edge', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .invoke('val', 'か')
        .setRange(1, 1)
        .should('have.value', 'か')
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .should('have.value', 'かｔ')
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .should('have.value', 'かっｔ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('compositionend')
        .trigger('input')
        .should('have.value', '買った');
    });
  });
});
