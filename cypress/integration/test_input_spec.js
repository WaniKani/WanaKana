const wk = require('../../dist/lib/wanakana');

Cypress.config({
  baseUrl: 'http://localhost:9080',
  videoUploadOnPasses: true,
});

/* eslint-disable no-sequences */
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
/* eslint-enable no-sequences */

describe('binding & unbinding', () => {
  before(() => {
    cy.visit('');
  });
  it('throws if invalid element passed to bind()', () => {
    cy.get('form').then(($el) => {
      expect(() => wk.bind('nah')).throws(Error);
      expect(() => wk.bind([])).throws(Error);
      expect(() => wk.bind($el.get(0))).throws(Error);
    });
  });

  it('throws if invalid element passed to unbind()', () => {
    cy.get('#input').then(($el) => {
      expect(() => wk.unbind('nah')).throws(Error);
      expect(() => wk.unbind([])).throws(Error);
      expect(() => wk.unbind($el.get(0))).throws(Error);
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
});

describe('default IME conversions', () => {
  before(() => {
    cy.get('#input').wkBind();
  });

  beforeEach(() => {
    cy
      .get('#input')
      .clear()
      .setRange(0, 0);
  });

  it('should ignore nonascii/zenkaku latin', () => {
    cy
      .get('#input')
      .type('ｈｉｒｏｉ')
      .should('have.value', 'ｈｉｒｏｉ')
      .type('hiroi')
      .should('have.value', 'ｈｉｒｏｉひろい');
  });

  it('double consonants', () => {
    cy
      .get('#input')
      .type('gakkounimacchanakatta')
      .should('have.value', 'がっこうにまっちゃなかった');
  });

  it("solo n's are not transliterated.", () => {
    cy
      .get('#input')
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
      .should('have.value', 'かnyaな')
      .setRange(4, 4)
      .trigger('input')
      .should('have.value', 'かにゃな');
  });

  it("double n's are transliterated.", () => {
    cy
      .get('#input')
      .type('nn')
      .should('have.value', 'ん');
  });

  it('n + space are transliterated.', () => {
    cy
      .get('#input')
      .type('n ')
      .should('have.value', 'ん');
  });

  it("n + ' are transliterated.", () => {
    cy
      .get('#input')
      .type("n'")
      .should('have.value', 'ん');
  });

  it('ni.', () => {
    cy
      .get('#input')
      .type('ni')
      .should('have.value', 'に');
  });

  it('kan', () => {
    cy
      .get('#input')
      .type('kan')
      .should('have.value', 'かn');
  });

  it('kanp', () => {
    cy
      .get('#input')
      .type('kanp')
      .should('have.value', 'かんp');
  });

  it('kanpai!', () => {
    cy
      .get('#input')
      .type('kanpai')
      .should('have.value', 'かんぱい');
  });

  it('nihongo', () => {
    cy
      .get('#input')
      .type('nihongo')
      .should('have.value', 'にほんご');
  });

  it("y doesn't count as a consonant for IME", () => {
    cy
      .get('#input')
      .type('ny')
      .should('have.value', 'ny');
  });

  it('nya works as expected', () => {
    cy
      .get('#input')
      .type('nya')
      .should('have.value', 'にゃ');
  });

  it("solo N's are not transliterated - katakana.", () => {
    cy
      .get('#input')
      .type('N')
      .should('have.value', 'N');
  });

  it("double N's are transliterated - katakana.", () => {
    cy
      .get('#input')
      .type('NN')
      .should('have.value', 'ン');
  });

  it("doesn't apply toKatakana if mora are mixed case", () => {
    cy
      .get('#input')
      .type('KanA')
      .should('have.value', 'かな');
  });

  it('NI - katakana.', () => {
    cy
      .get('#input')
      .type('NI')
      .should('have.value', 'ニ');
  });

  it('KAN - katakana', () => {
    cy
      .get('#input')
      .type('KAN')
      .should('have.value', 'カN');
  });

  it('NIHONGO - katakana', () => {
    cy
      .get('#input')
      .type('NIHONGO')
      .should('have.value', 'ニホンゴ');
  });

  it('converts characters after cursor movement', () => {
    cy
      .get('#input')
      .type('wanakana')
      .should('have.value', 'わなかな')
      .type('{leftArrow}{leftArrow}shi')
      .should('have.value', 'わなshiかな')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'わなしかな');
  });

  it('converts correct partial when multiple similar tokens', () => {
    cy
      .get('#input')
      .type('koskoskosko')
      .should('have.value', 'こsこsこsこ')
      .type('{leftArrow}{leftArrow}{leftArrow}o')
      .should('have.value', 'こsこsoこsこ')
      .setRange(5, 5)
      .trigger('input')
      .should('have.value', 'こsこそこsこ');
  });
});

describe('emulate device keyboards and IMEs', () => {
  // before(() => {
  //   cy
  //     .get('#input')
  //     .wkBind();
  // });
  beforeEach(() => {
    cy
      .get('#input')
      .clear()
      .setRange(0, 0);
  });

  describe('Mozc IME', () => {
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
    it('IE9', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .trigger('compositionupdate', { data: 'ｋ' })
        .should('have.value', 'ｋ')
        .invoke('val', 'か')
        .setRange(1, 1)
        .trigger('compositionupdate', { data: 'か' })
        .should('have.value', 'か')
        .invoke('val', 'かｔ')
        .setRange(2, 2)
        .trigger('compositionupdate', { data: 'かｔ' })
        .should('have.value', 'かｔ')
        .invoke('val', 'かっｔ')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かっｔ' })
        .should('have.value', 'かっｔ')
        .invoke('val', 'かった')
        .setRange(3, 3)
        .trigger('compositionupdate', { data: 'かった' })
        .should('have.value', 'かった')
        .invoke('val', '買った')
        .setRange(3, 3)
        .trigger('input')
        .trigger('compositionupdate', { data: '買った' })
        .trigger('compositionend')
        .should('have.value', '買った');
    });
    it('IE10', () => {
      cy
        .get('#input')
        .invoke('val', 'ｋ')
        .setRange(1, 1)
        .trigger('compositionstart')
        .should('have.value', 'ｋ')
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

  describe('Mobile English Keyboards', () => {
    it('android samsung (test not written)', () => {
      cy
        .get('#input')
        .should('have.value', 'かった');
    });
  });

});
