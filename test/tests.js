module("Dependencies");

test("require wanakana.js", function() {
  ok (wanakana, "wanakana.js is loaded.");
  ok (testTable, "transliteration table is loaded.");
});

module('Character type detection');


test("isHiragana()", function () {
  ok(  wanakana.isHiragana("あ"), "あ is hiragana" );
  ok( !wanakana.isHiragana("ア"), "ア is not hiragana" );
  ok( !wanakana.isHiragana("A"), "A is not hiragana" );
  ok( !wanakana.isHiragana("あア"), "あア is not hiragana" );
  ok(  wanakana.isHiragana("ああ"), "ああ is hiragana" );
  // ok(  wanakana.isHiragana("あ$あ"), "ignore non-letter characters");
});

test("isKatakana()", function () {
  ok( !wanakana.isKatakana("あ"), "あ is not katakana" );
  ok(  wanakana.isKatakana("ア"), "ア is katakana" );
  ok( !wanakana.isKatakana("A"), "A is not katakana" );
  ok( !wanakana.isKatakana("あア"), "あア is not katakana" );
  ok(  wanakana.isKatakana("アア"), "アア is katakana" );
  // ok(  wanakana.isKatakana("ア%ア"), "ignore non-letter characters");
});

test("isKana()", function () {
  ok(  wanakana.isKana("あ"), "あ is kana" );
  ok(  wanakana.isKana("ア"), "ア is kana" );
  ok( !wanakana.isKana("A"), "A is not kana" );
  ok(  wanakana.isKana("あア"), "あア is kana" );
  ok( !wanakana.isKana("あAア"), "あAア is not kana" );
});

test("isRomaji()", function () {
  ok( !wanakana.isRomaji("あ"), "あ is not romaji" );
  ok( !wanakana.isRomaji("ア"), "ア is not romaji" );
  ok(  wanakana.isRomaji("A"), "A is romaji" );
  ok( !wanakana.isRomaji("あア"), "あア is not romaji" );
  ok( !wanakana.isRomaji("Aア"), "Aア is not romaji" );
  ok(  wanakana.isRomaji("ABC"), "ABC is romaji" );
  ok(  wanakana.isRomaji("xYz"), "xYz is romaji" );
  // ok(  wanakana.isRomaji("a*b&c"), "ignore non-letter characters");
});

module("Character conversion");

test("Quick Brown Fox", function () {
  // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
  var opts = { useObseleteKana: true };
  equal( wanakana.toHiragana("IROHANIHOHETO", opts), "いろはにほへと", "Even the colorful fregrant flowers");
  equal( wanakana.toHiragana("CHIRINURUWO", opts), "ちりぬるを", "Die sooner or later");
  equal( wanakana.toHiragana("WAKAYOTARESO", opts), "わかよたれそ", "Us who live in this world");
  equal( wanakana.toHiragana("TSUNENARAMU", opts), "つねならむ", "Cannot live forever, either.");
  equal( wanakana.toHiragana("UWINOOKUYAMA", opts), "うゐのおくやま", "This transient mountain with shifts and changes,)");
  equal( wanakana.toHiragana("KEFUKOETE", opts), "けふこえて", "Today we are going to overcome, and reach the world of enlightenment.");
  equal( wanakana.toHiragana("ASAKIYUMEMISHI", opts), "あさきゆめみし", "We are not going to have meaningless dreams");
  equal( wanakana.toHiragana("WEHIMOSESUN", opts), "ゑひもせすん", "nor become intoxicated with the fake world anymore");
});

test("Test every character with toHiragana() and toKatakana()", function () {
  for (var i in testTable) {
    var map = testTable[i];
    var romaji = map[0];
    var hiragana = map[1];
    var katakana = map[2];
    var options = { useKatakanaVU: true };
    equal (wanakana.toHiragana(romaji, options), hiragana, romaji + " = " + hiragana);
    equal (wanakana.toKatakana(romaji, options), katakana, romaji.toUpperCase() + " = " + katakana);
  }
});

test("toKana()", function () {
  equal (wanakana.toKana("onaji"), wanakana.toHiragana("onaji"), "Lowercase characters are transliterated to hiragana.");
  equal (wanakana.toKana("ONAJI"), wanakana.toKatakana("onaji"), "Uppercase characters are transliterated to katakana.");
  equal (wanakana.toKana("WaniKani"), "ワにカに", "WaniKani -> ワにカに - Mixed case uses the first character for each sylable.");
  equal (wanakana.toKana("ワにカに AiUeO 鰐蟹 12345 !@#$%"), "ワにカに アいウえオ 鰐蟹 12345 !@#$%", "Non-romaji will be passed through.");
});

test("Converting kana to kana", function () {
  equal (wanakana.toHiragana ("バケル"), "ばける", "katakana -> hiragana");
  equal (wanakana.toKatakana ("ばける"), "バケル", "hiragana -> katakana");
});

test("Case sensitivity", function() {
  equal (wanakana.toHiragana("aiueo"), wanakana.toHiragana("AIUEO"), "cAse DoEsn'T MatTER for toHiragana()");
  equal (wanakana.toKatakana("aiueo"), wanakana.toKatakana("AIUEO"), "cAse DoEsn'T MatTER for toKatakana()");
  notEqual (wanakana.toKana("aiueo"), wanakana.toKana("AIUEO"), "Case DOES matter for toKana()");
});


test("N edge cases", function () {
  equal( wanakana.toKana("n"), "ん", "Solo N");
  equal( wanakana.toKana("onn"), "おん", "double N");
  equal( wanakana.toKana("onna"), "おんな", "N followed by N* syllable");
  equal( wanakana.toKana("nnn"), "んん", "Triple N");
  equal( wanakana.toKana("onnna"), "おんな", "Triple N followed by N* syllable");
  equal( wanakana.toKana("nnnn"), "んん", "Quadruple N");

  equal( wanakana.toKana("nyan"), "にゃん", "nya -> にゃ");
  equal( wanakana.toKana("nnyann"), "んにゃん", "nnya -> んにゃ");
  equal( wanakana.toKana("nnnyannn"), "んにゃんん", "nnnya -> んにゃ");
});

// module("Kana to Romaji");

// test("toRomaji()", function () {
//   equal( wanakana.toRomaji("ワニカニ　ハ　スゴイ　ダ"), "wanikani ha sugoi da", "Convert katakana to romaji");
//   equal( wanakana.toRomaji("わにかに　は　すごい　だ"), "wanikani ha sugoi da", "Convert hiragana to romaji");
//   equal( wanakana.toRomaji("ワニカニ　は　すごい　だ"), "wanikani ha sugoi da", "Convert mixed kana to romaji");
// });

module("Options");

test("useKatakanaVU", function () {
  var opts = {useKatakanaVU: true};
  equal (wanakana.toHiragana('vu', opts), 'ヴ', "vu = ヴ (when useKatakanaVU is true)");
  opts.useKatakanaVU = false;
  equal (wanakana.toHiragana('vu', opts), 'ゔ', "vu = ゔ (when useKatakanaVU is false)");
  equal (wanakana.toHiragana('vu'), 'ゔ', "useKatakanaVU is false by defualt");
});

test("useObseleteKana", function () {
  var opts = {useObseleteKana: true};
  equal (wanakana.toHiragana('wi', opts), 'ゐ', "wi = ゐ (when useObseleteKana is true)");
  equal (wanakana.toHiragana('we', opts), 'ゑ', "we = ゑ");
  equal (wanakana.toKatakana('wi', opts), 'ヰ', "WI = ヰ");
  equal (wanakana.toKatakana('we', opts), 'ヱ', "WE = ヱ");

  opts.useObseleteKana = false;
  equal (wanakana.toHiragana('wi', opts), 'うぃ', "wi = うぃ when useObseleteKana is false");
  equal (wanakana.toHiragana('wi'), 'うぃ', "useObseleteKana is false by default");
});

test ("IMEMode", function () {
  var opts;
  opts = {IMEMode: false};
  equal (wanakana.toHiragana("n", opts), "ん", "Without IME mode, solo n's are transliterated.");
  equal (wanakana.toHiragana("nn", opts), "ん", "Without IME mode, double n's are transliterated.");
  opts = {IMEMode: true};
  equal (wanakana.toHiragana("n", opts), "n", "With IME mode, solo n's are not transliterated.");
  equal (wanakana.toHiragana("nn", opts), "ん", "With IME mode, double n's are transliterated.");
  equal (wanakana.toHiragana("n ", opts), "ん ", "With IME mode, n + space are transliterated.");
});

// test("useMacrons", function() {
//  var opts = {useMacrons: false};
//  equal (wanakana.toRomaji('とうきょう', opts), "toukyou" , "とうきょう = toukyou (when useMacrons is false)");
//  opts.useMacrons = true;
//  equal (wanakana.toRomaji('とうきょう', opts), "tōkyō" , "とうきょう = tōkyō (when useMacrons is true)");
// });

// test("useApostrophes", function() {
//   var opts = {useApostrophes: false};
//   equal (wanakana.toRomaji('おんよみ', opts), "onyomi", "おんよみ = onyomi (when useApostrophes is false)");
//   opts.useApostrophes = true;
//   equal (wanakana.toRomaji('おんよみ', opts), "on'yomi" , "おんよみ = on'yomi (when useApostrophes is true)");
// });

module("Performance");

test("Speed", function () {
  var startTime = new Date().getTime();
  wanakana.toKana ("aiueosashisusesonaninunenokakikukeko");
  var endTime = new Date().getTime();
  var elapsedTime = endTime-startTime;
  ok (elapsedTime < 30, "Dang, that's fast! Romaji -> Kana in " + elapsedTime + "ms");
});