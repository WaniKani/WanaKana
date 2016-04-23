try {
  wanakana;
} catch (e) {
  alert("WanaKana not found. Try running `grunt test`");
}

module("Dependencies");

test("require wanakana.js", function() {
  ok (wanakana, "wanakana.js is loaded.");
  ok (wanakana.version, "wanakana version is " + wanakana.version);
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
    equal (wanakana.toHiragana(romaji), hiragana, romaji + " = " + hiragana);
    equal (wanakana.toKatakana(romaji), katakana, romaji.toUpperCase() + " = " + katakana);
  }
});

test ("Double consonants transliterate to glottal stops (small tsu)", function () {
  equal (wanakana.toHiragana("babba"),   "ばっば", "double B");
  equal (wanakana.toHiragana("cacca"),   "かっか", "double C");
  equal (wanakana.toHiragana("chaccha"), "ちゃっちゃ", "double Ch");
  equal (wanakana.toHiragana("dadda"),   "だっだ", "double D");
  equal (wanakana.toHiragana("fuffu"),   "ふっふ", "double F");
  equal (wanakana.toHiragana("gagga"),   "がっが", "double G");
  equal (wanakana.toHiragana("hahha"),   "はっは", "double H");
  equal (wanakana.toHiragana("jajja"),   "じゃっじゃ", "double J");
  equal (wanakana.toHiragana("kakka"),   "かっか", "double K");
  equal (wanakana.toHiragana("lalla"),   "らっら", "double L");
  equal (wanakana.toHiragana("mamma"),   "まっま", "double M");
  equal (wanakana.toHiragana("nanna"),   "なんな", "double N");
  equal (wanakana.toHiragana("pappa"),   "ぱっぱ", "double P");
  equal (wanakana.toHiragana("qaqqa"),   "くぁっくぁ", "double Q");
  equal (wanakana.toHiragana("rarra"),   "らっら", "double R");
  equal (wanakana.toHiragana("sassa"),   "さっさ", "double S");
  equal (wanakana.toHiragana("shassha"), "しゃっしゃ", "double Sh");
  equal (wanakana.toHiragana("tatta"),   "たった", "double T");
  equal (wanakana.toHiragana("tsuttsu"), "つっつ", "double Ts");
  equal (wanakana.toHiragana("vavva"),   "ゔぁっゔぁ", "double V");
  equal (wanakana.toHiragana("wawwa"),   "わっわ", "double W");
  equal (wanakana.toHiragana("yayya"),   "やっや", "double X");
  equal (wanakana.toHiragana("zazza"),   "ざっざ", "double Z");

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

test("Bogus 4 character sequences", function () {
  equal( wanakana.toKana("chya"), "ちゃ", "Non bogus sequences work");
  equal( wanakana.toKana("chyx"), "chyx", "Bogus sequences do not work");
  equal( wanakana.toKana("shyp"), "shyp", "Bogus sequences do not work");
  equal( wanakana.toKana("ltsb"), "ltsb", "Bogus sequences do not work");
});


module("Kana to Romaji");

test("toRomaji()", function () {
  equal( wanakana.toRomaji("ワニカニ　ガ　スゴイ　ダ"), "wanikani ga sugoi da", "Convert katakana to romaji. convertKatakanaToUppercase is false by default");
  equal( wanakana.toRomaji("わにかに　が　すごい　だ"), "wanikani ga sugoi da", "Convert hiragana to romaji");
  equal( wanakana.toRomaji("ワニカニ　が　すごい　だ"), "wanikani ga sugoi da", "Convert mixed kana to romaji");
  equal( wanakana.toRomaji("ワニカニ", {convertKatakanaToUppercase: true}), "WANIKANI", "Use the convertKatakanaToUppercase flag to preserve casing. Works for katakana.");
  equal( wanakana.toRomaji("わにかに", {convertKatakanaToUppercase: true}), "wanikani", "Use the convertKatakanaToUppercase flag to preserve casing. Works for hiragana.");
  equal( wanakana.toRomaji("ワニカニ　が　すごい　だ", {convertKatakanaToUppercase: true}), "WANIKANI ga sugoi da", "Use the convertKatakanaToUppercase flag to preserve casing. Works for mixed kana.");
  notEqual( wanakana.toRomaji("わにかにがすごいだ"), "wanikani ga sugoi da", "Spaces must be manually entered");
});

test("Quick Brown Fox", function () {
  equal( wanakana.toRomaji("いろはにほへと"), "irohanihoheto", "Even the colorful fregrant flowers");
  equal( wanakana.toRomaji("ちりぬるを"), "chirinuruwo", "Die sooner or later");
  equal( wanakana.toRomaji("わかよたれそ"), "wakayotareso", "Us who live in this world");
  equal( wanakana.toRomaji("つねならむ"), "tsunenaramu", "Cannot live forever, either.");
  equal( wanakana.toRomaji("うゐのおくやま"), "uwinookuyama", "This transient mountain with shifts and changes,)");
  equal( wanakana.toRomaji("けふこえて"), "kefukoete", "Today we are going to overcome, and reach the world of enlightenment.");
  equal( wanakana.toRomaji("あさきゆめみし"), "asakiyumemishi", "We are not going to have meaningless dreams");
  equal( wanakana.toRomaji("ゑひもせすん"), "wehimosesun", "nor become intoxicated with the fake world anymore");
});

test ("double n's and double consonants", function () {
  equal ( wanakana.toRomaji("きんにくまん"), "kinnikuman", "Double and single n");
  equal ( wanakana.toRomaji("んんにんにんにゃんやん"), "nnninninnyan'yan", "N extravaganza");
  equal ( wanakana.toRomaji("かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ"), "kappa tatta shusshu chaccha yattsu", "Double consonants");
});

test ("Small kana", function () {
  equal ( wanakana.toRomaji("っ"), "", "Small tsu doesn't transliterate");
  equal ( wanakana.toRomaji("ゃ"), "ya", "Small ya");
  equal ( wanakana.toRomaji("ゅ"), "yu", "Small yu");
  equal ( wanakana.toRomaji("ょ"), "yo", "Small yo");
  equal ( wanakana.toRomaji("ぁ"), "a", "Small a");
  equal ( wanakana.toRomaji("ぃ"), "i", "Small i");
  equal ( wanakana.toRomaji("ぅ"), "u", "Small u");
  equal ( wanakana.toRomaji("ぇ"), "e", "Small e");
  equal ( wanakana.toRomaji("ぉ"), "o", "Small o");
  equal ( wanakana.toRomaji("ヶ"), "ka", "Small ke (ka)");
  equal ( wanakana.toRomaji("ヵ"), "ka", "Small ka");
  equal ( wanakana.toRomaji("ゎ"), "wa", "Small wa");
});

module("Options");

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

  /** Simulate real typing by calling the funciton on every character in sequence */
  function testTyping (str, opts) {
    var pos = 1;
    var l = str.length;
    // console.log("--" + str + "--");
    while (pos <= l) {
      var buffer = str.substr(0, pos);
      var rest = str.substr(pos);
      buffer = wanakana.toKana(buffer, opts);
      // console.log(pos + ":" + buffer + " <-" + rest);
      str =  buffer + rest;
      pos++;
    }
    return str;
  }

  opts = {IMEMode: false};
  equal (wanakana.toKana("n", opts), "ん", "Without IME mode, solo n's are transliterated.");
  equal (wanakana.toKana("nn", opts), "ん", "Without IME mode, double n's are transliterated.");
  opts = {IMEMode: true};
  equal (testTyping("n", opts), "n", "With IME mode, solo n's are not transliterated.");
  equal (testTyping("nn", opts), "ん", "With IME mode, double n's are transliterated.");
  equal (testTyping("n ", opts), "ん", "With IME mode, n + space are transliterated.");
  equal (testTyping("n'", opts), "ん", "With IME mode, n + ' are transliterated.");
  equal (testTyping("ni", opts), "に", "With IME mode, ni.");

  equal (testTyping("kan", opts), "かn", "kan");
  equal (testTyping("kanp", opts), "かんp", "kanp");
  equal (testTyping("kanpai", opts), "かんぱい", "kanpai!");
  equal (testTyping("nihongo", opts), "にほんご", "nihongo");

  equal (testTyping("ny", opts), "ny", "y doesn't count as a consonant for IME");
  equal (testTyping("nya", opts), "にゃ", "nya works as expected");

  equal (testTyping("N", opts), "N", "With IME mode, solo N's are not transliterated - katakana.");
  equal (testTyping("NN", opts), "ン", "With IME mode, double N's are transliterated - katakana.");
  equal (testTyping("NI", opts), "ニ", "NI - katakana.");
  equal (testTyping("KAN", opts), "カN", "KAN - katakana");
  equal (testTyping("NIHONGO", opts), "ニホンゴ", "NIHONGO - katakana");
});

test("Apostrophes for vague consonant vowel combos", function() {
  equal (wanakana.toRomaji('おんよみ'), "on'yomi" , "おんよみ = on'yomi");
  equal (wanakana.toRomaji('んよ んあ　んゆ'), "n'yo n'a n'yu" , "Checking other combinations");
});

test("Options use defaultOptions by default", function () {
  var defaultValue = wanakana.defaultOptions.useObseleteKana;
  wanakana.defaultOptions.useObseleteKana = true;
  equal (wanakana.toHiragana('wi'), 'ゐ', "Overwrite default (temporarily)");
  var opts = {IMEMode: true};
  equal (wanakana.toHiragana('wi', opts), 'ゐ', "Defaults aren't overwritten by being omitted");
  wanakana.defaultOptions.useObseleteKana = defaultValue;
});

module("Performance");

test("Speed", function () {
  var startTime = new Date().getTime();
  wanakana.toKana ("aiueosashisusesonaninunenokakikukeko");
  var endTime = new Date().getTime();
  var elapsedTime = endTime-startTime;
  ok (elapsedTime < 30, "Dang, that's fast! Romaji -> Kana in " + elapsedTime + "ms");
});