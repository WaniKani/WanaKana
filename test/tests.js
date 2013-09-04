module("Dependencies");

test("require wanakana.js", function() {
	ok (wanakana, "wanakana.js is loaded.");
	ok (testTable, "transliteration table is loaded.");
});

module("Syntax");

test("Ignore case", function() {
	equal (wanakana.toHiragana("aiueo"), wanakana.toHiragana("AIUEO"), "cAse DoEsn'T MatTER");
});

test ("Test every character", function () {
	for (var i in testTable) {
		var map = testTable[i];
		var romaji = map[0];
		var hiragana = map[1];
		var katakana = map[2];
		equal (wanakana.toHiragana(romaji), hiragana, romaji + " = " + hiragana);
		equal (wanakana.toKatakana(romaji), katakana, romaji + " = " + katakana);
	}
});