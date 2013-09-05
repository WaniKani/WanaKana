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
	ok(  wanakana.isHiragana("あ$あ"), "ignore non-letter characters");
});

test("isKatakana()", function () {
	ok( !wanakana.isKatakana("あ"), "あ is not katakana" );
	ok(  wanakana.isKatakana("ア"), "ア is katakana" );
	ok( !wanakana.isKatakana("A"), "A is not katakana" );
	ok( !wanakana.isKatakana("あア"), "あア is not katakana" );
	ok(  wanakana.isKatakana("アア"), "アア is katakana" );
	ok(  wanakana.isKatakana("ア%ア"), "ignore non-letter characters");
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
	ok( !wanakana.isRomaji("A"), "A is romaji" );
	ok( !wanakana.isRomaji("あア"), "あア is not romaji" );
	ok( !wanakana.isRomaji("Aア"), "Aア is not romaji" );
	ok(  wanakana.isRomaji("ABC"), "ABC is romaji" );
	ok(  wanakana.isRomaji("xYz"), "xYz is romaji" );
	ok(  wanakana.isRomaji("a*b&c"), "ignore non-letter characters");
});

module("Character conversion");

test("Ignore case", function() {
	equal (wanakana.toHiragana("aiueo"), wanakana.toHiragana("AIUEO"), "cAse DoEsn'T MatTER");
});

test("Test every character", function () {
	for (var i in testTable) {
		var map = testTable[i];
		var romaji = map[0];
		var hiragana = map[1];
		var katakana = map[2];
		equal (wanakana.toHiragana(romaji), hiragana, romaji + " = " + hiragana);
		equal (wanakana.toKatakana(romaji), katakana, romaji.toUpperCase() + " = " + katakana);
	}
});

test("ゐ and ゑ", function () {
	equal (wanakana.toHiragana('wi'), 'ゐ', "wi = ゐ");
	equal (wanakana.toHiragana('we'), 'ゑ', "we = ゑ");
	equal (wanakana.toKatakana('wi'), 'ヰ', "WI = ヰ");
	equal (wanakana.toKatakana('we'), 'ヱ', "WE = ヱ");
});

test("Quick Brown Fox", function () {
	// thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
	equal( wanakana.toHiragana("IROHANIHOHETO"), "いろはにほへと", "Even the colorful fregrant flowers");
	equal( wanakana.toHiragana("CHIRINURUO"), "ちりぬるを", "Die sooner or later");
	equal( wanakana.toHiragana("WAKAYOTARESO"), "わかよたれそ", "Us who live in this world");
	equal( wanakana.toHiragana("TSUNENARAMU"), "つねならむ", "Cannot live forever, either.");
	equal( wanakana.toHiragana("UWINOOKUYAMA"), "うゐのおくやま", "This transient mountain with shifts and changes,)");
	equal( wanakana.toHiragana("KEFUKOETE"), "けふこえて", "Today we are going to overcome, and reach the world of enlightenment.");
	equal( wanakana.toHiragana("ASAKIYUMEMISHI"), "あさきゆめみし", "We are not going to have meaningless dreams");
	equal( wanakana.toHiragana("WEHIMOSESUN"), "ゑひもせすん", "nor become intoxicated with the fake world anymore");
});

test("Mixed case uses the first character for each sylable.", function () {
	equal (wanakana.toKana("WaniKani"), "ワにカに", "WaniKani -> ワにカに");
});

test("N edge cases", function () {
	equal( wanakana.toKana("n"), "ん", "Solo N");
	equal( wanakana.toKana("onn"), "おん", "double N");
	equal( wanakana.toKana("onna"), "おんな", "N followed by N* syllable");
	equal( wanakana.toKana("nnn"), "んん", "Triple N");
	equal( wanakana.toKana("nnnn"), "んん", "Quadruple N");

	equal( wanakana.toKana("nyan"), "にゃん", "nya -> にゃ");
	equal( wanakana.toKana("nnyann"), "んやん", "nnya -> んや");
});

module("Performance");

test("Speed", function () {
	var startTime = new Date().getTime();
	wanakana.toKana ("aiueosashisusesonaninunenokakikukeko");
	var endTime = new Date().getTime();
	ok (endTime-startTime < 30, "Dang, that's fast!");
});