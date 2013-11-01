wanakana = wanakana || {}

# Support AMD
if typeof define is "function" and define.amd
  define "wanakana", [], ->wanakana

wanakana.LOWERCASE_START = 0x61
wanakana.LOWERCASE_END   = 0x7A
wanakana.UPPERCASE_START = 0x41
wanakana.UPPERCASE_END   = 0x5A
wanakana.HIRAGANA_START  = 0x3041
wanakana.HIRAGANA_END    = 0x3096
wanakana.KATAKANA_START  = 0x30A1
wanakana.KATAKANA_END    = 0x30FA

wanakana.LOWERCASE_FULLWIDTH_START = 0xFF41
wanakana.LOWERCASE_FULLWIDTH_END   = 0xFF5A
wanakana.UPPERCASE_FULLWIDTH_START = 0xFF21
wanakana.UPPERCASE_FULLWIDTH_END   = 0xFF3A

wanakana.defaultOptions =
  # Transliterates wi and we to ゐ and ゑ
  useObseleteKana: no
  # Special mode for handling input from a text input that is transliterated on the fly.
  IMEMode: off

###*
 * Automatically sets up an input field to be an IME.
###
wanakana.bind = (input) ->
  input.addEventListener('input', wanakana._onInput)

wanakana.unbind = (input) ->
  input.removeEventListener('input', wanakana._onInput)

wanakana._onInput = (event) ->
  input = event.target
  normalizedInputString = wanakana._convertFullwidthCharsToASCII (input.value)
  newText = (wanakana.toKana(normalizedInputString, {IMEMode: true}))
  unless normalizedInputString is newText
    input.value = newText
  console.log ("Change? " + (normalizedInputString != newText))

wanakana._extend = (target, source) ->
  if not target?
    return source
  for prop of source
    if not target[prop]? and source[prop]?
      target[prop] = source[prop]
  return target

###*
 * Takes an array of values and a function. The funciton is called with each value.
 * If the function returns true every time, the result will be true. Otherwise, false.
###
wanakana._allTrue = (arr, func) ->
  for val in arr
    if func(val) is false then return false
  true

###*
 * Takes a character and a unicode range. Returns true if the char is in the range.
###
wanakana._isCharInRange = (char, start, end) ->
  code = char.charCodeAt 0
  return start <= code <= end

wanakana._isCharVowel = (char, includeY = yes) ->
  regexp = if includeY then /[aeiouy]/ else /[aeiou]/
  return char.toLowerCase().charAt(0).search(regexp) isnt -1
wanakana._isCharConsonant = (char, includeY = yes) ->
  regexp = if includeY then /[bcdfghjklmnpqrstvwxyz]/ else /[bcdfghjklmnpqrstvwxz]/
  return char.toLowerCase().charAt(0).search(regexp) isnt -1

wanakana._isCharKatakana = (char) ->
  wanakana._isCharInRange(char, wanakana.KATAKANA_START, wanakana.KATAKANA_END)
wanakana._isCharHiragana = (char) ->
  wanakana._isCharInRange(char, wanakana.HIRAGANA_START, wanakana.HIRAGANA_END)
wanakana._isCharKana = (char) ->
  wanakana._isCharHiragana(char) or wanakana._isCharKatakana(char)
wanakana._isCharNotKana = (char) ->
  not wanakana._isCharHiragana(char) and not wanakana._isCharKatakana(char)

wanakana._convertFullwidthCharsToASCII = (string) ->
  chars = string.split ""
  for char,i in chars
    code = char.charCodeAt(0)
    if wanakana._isCharInRange(char, wanakana.LOWERCASE_FULLWIDTH_START, wanakana.LOWERCASE_FULLWIDTH_END)
      chars[i] = String.fromCharCode(code - wanakana.LOWERCASE_FULLWIDTH_START + wanakana.LOWERCASE_START)
    if wanakana._isCharInRange(char, wanakana.UPPERCASE_FULLWIDTH_START, wanakana.UPPERCASE_FULLWIDTH_END)
      chars[i] String.fromCharCode(code - wanakana.UPPERCASE_FULLWIDTH_START + wanakana.UPPERCASE_START)

  chars.join ""

wanakana._katakanaToHiragana = (kata) ->
  hira = []
  for kataChar in kata.split ""
    if wanakana._isCharKatakana(kataChar)
      code = kataChar.charCodeAt 0
      # Shift charcode.
      code += wanakana.HIRAGANA_START - wanakana.KATAKANA_START
      hiraChar = String.fromCharCode code
      hira.push hiraChar
    else
      # pass non katakana chars through
      hira.push kataChar
  hira.join ""

wanakana._hiraganaToKatakana = (hira) ->
  kata = []
  for hiraChar in hira.split ""
    if wanakana._isCharHiragana(hiraChar)
      code = hiraChar.charCodeAt 0
      # Shift charcode.
      code += wanakana.KATAKANA_START - wanakana.HIRAGANA_START
      kataChar = String.fromCharCode code
      kata.push kataChar
    else
      # pass non hiragana chars through
      kata.push hiraChar
  kata.join ""

wanakana._hiraganaToRomaji = (hira, options) ->
  len = hira.length
  roma = []
  cursor = 0
  chunkSize = 0
  maxChunk = 2
  getChunk = () -> hira.substr(cursor, chunkSize)
  # Don't pick a chunk that is bigger than the remaining characters.
  resetChunkSize = () -> chunkSize = Math.min(maxChunk, len-cursor)

  while cursor < len
    resetChunkSize()
    while chunkSize > 0
      chunk = getChunk()
      if wanakana.isKatakana(chunk)
        chunk = wanakana._katakanaToHiragana(chunk)


      # special case for small tsus
      if chunk.charAt(0) is "っ" and chunkSize is 1 and cursor < (len-1)
        nextCharIsDoubleConsonant = true
        romaChar = ""
        break

      romaChar = wanakana.J_to_R[chunk]

      if romaChar? and nextCharIsDoubleConsonant
        romaChar = romaChar.charAt(0).concat(romaChar)
        nextCharIsDoubleConsonant = false

      # DEBUG
      # console.log (cursor + "x" + chunkSize + ":" + chunk + " => " + romaChar )
      break if romaChar?
      chunkSize--

    unless romaChar?
      # console.log("Couldn't find " + chunk + ". Passing through.")
      # Passthrough undefined values
      romaChar = chunk

    # Handle special cases.
    options = wanakana._extend(options, wanakana.defaultOptions)
    roma.push romaChar
    cursor += chunkSize or 1
  roma.join("")

wanakana._romajiToHiragana = (roma, options) -> wanakana._romajiToKana(roma, options, true)
wanakana._romajiToKana = (roma, options, ignoreCase = false) ->
  console.log (new Date().getTime())
  len = roma.length
  # Final output array
  kana = []
  # Position in the string that is being evaluated
  cursor = 0
  # Maximum size of the chunk of characters to evaluate at one time
  maxChunk = 3

  # Pulls a chunk of characters based on the cursor position and chunkSize
  getChunk = () -> roma.substr(cursor, chunkSize)
  # Checks if the character is uppercase
  isCharUpperCase = (char) ->
    wanakana._isCharInRange(char, wanakana.UPPERCASE_START, wanakana.UPPERCASE_END)

  # Steps through the string pulling out chunks of characters. Each chunk will be evaluated
  # against the romaji to kana table. If there is no match, the last character in the chunk
  # is dropped and the chunk is reevaluated. If nothing matches, the character is assumed
  # to be invalid or puncuation or other and gets passed through.
  while cursor < len
    # Don't pick a chunk that is bigger than the remaining characters.
    chunkSize = Math.min(maxChunk, len-cursor)
    while chunkSize > 0
      chunk = getChunk()
      chunkLC = chunk.toLowerCase()
      # nEdgeCase = false

      # Handle super-rare edge case with a 4 char chunk for 'ltsu'
      if chunkLC is "lts" and (len-cursor) >= 4
        chunkSize++
        chunk = getChunk()
        chunkLC = chunk.toLowerCase()

      # Handle edge case of n followed by consonant

      if chunkLC.charAt(0) is "n"
        # Handle edge case of n followed by n and vowel
        if wanakana._isCharConsonant(chunkLC.charAt(1), no) and wanakana._isCharVowel(chunkLC.charAt(2))
          chunkSize = 1
          chunk = getChunk()
          chunkLC = chunk.toLowerCase()

      # Handle case of double consonants
      if chunkLC.charAt(0) isnt "n" and
      wanakana._isCharConsonant(chunkLC.charAt(0)) and
      chunk.charAt(0) == chunk.charAt(1)
        chunkSize = 1
        # Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
        if wanakana._isCharInRange(chunk.charAt(0), wanakana.UPPERCASE_START, wanakana.UPPERCASE_END)
          chunkLC = chunk = "ッ"
        else
          chunkLC = chunk = "っ"

      kanaChar = wanakana.R_to_J[chunkLC]
      # DEBUG
      console.log (chunk.charAt(0) + " : " + chunk.charCodeAt(0))
      console.log (cursor + "x" + chunkSize + ":" + chunk + " => " + kanaChar )
      break if kanaChar?
      chunkSize--

    unless kanaChar?
      chunk = wanakana._convertPunctuation(chunk)
      # console.log("Couldn't find " + chunk + ". Passing through.")
      # Passthrough undefined values
      kanaChar = chunk

    # Handle special cases.
    options = wanakana._extend(options, wanakana.defaultOptions)
    if options?.useObseleteKana
      if chunkLC is "wi" then kanaChar = "ゐ"
      if chunkLC is "we" then kanaChar = "ゑ"
    if options?.IMEMode and chunkLC.charAt(0) is "n"
      if (roma.charAt(cursor+1).toLowerCase() is "y" and cursor is (len-2)) or
      cursor is (len-1)
        # Don't transliterate this yet.
        kanaChar = chunk.charAt(0)

    # Use katakana if first letter in chunk is uppercase
    unless ignoreCase
      if isCharUpperCase(chunk.charAt(0))
        kanaChar = wanakana._hiraganaToKatakana(kanaChar)

    kana.push kanaChar
    cursor += chunkSize or 1
  kana.join("")

wanakana._convertPunctuation = (input, options) ->
  if input is '　' then return ' '
  if input is '-' then return 'ー'
  input


###*
* Returns true if input is entirely hiragana.
###
wanakana.isHiragana = (input) ->
  chars = input.split("")
  wanakana._allTrue( chars, wanakana._isCharHiragana )

wanakana.isKatakana = (input) ->
  chars = input.split("")
  wanakana._allTrue( chars, wanakana._isCharKatakana )

wanakana.isKana = (input) ->
  chars = input.split("")
  wanakana._allTrue( chars, (char) -> (wanakana.isHiragana char) or (wanakana.isKatakana char) )

wanakana.isRomaji = (input) ->
  chars = input.split("")
  wanakana._allTrue( chars, (char) -> (not wanakana.isHiragana char) and (not wanakana.isKatakana char) )


wanakana.toHiragana = (input, options) ->
  if wanakana.isRomaji(input)
    return input = wanakana._romajiToHiragana(input, options)
  if wanakana.isKatakana(input)
    return input = wanakana._katakanaToHiragana(input, options)
  # otherwise
  input

wanakana.toKatakana = (input, options) ->
  if wanakana.isHiragana(input)
    return input = wanakana._hiraganaToKatakana(input, options)
  if wanakana.isRomaji(input)
    input = wanakana._romajiToHiragana(input, options)
    return input = wanakana._hiraganaToKatakana(input, options)
  #otherwise
  input

wanakana.toKana = (input, options) ->
  return input = wanakana._romajiToKana(input, options)

wanakana.toRomaji = (input, options) ->
  return input = wanakana._hiraganaToRomaji(input)


wanakana.R_to_J =
  a: 'あ'
  i: 'い'
  u: 'う'
  e: 'え'
  o: 'お'
  yi: 'い'
  wu: 'う'
  whu: 'う'
  xa: 'ぁ'
  xi: 'ぃ'
  xu: 'ぅ'
  xe: 'ぇ'
  xo: 'ぉ'
  xyi: 'ぃ'
  xye: 'ぇ'
  ye: 'いぇ'
  wha: 'うぁ'
  whi: 'うぃ'
  whe: 'うぇ'
  who: 'うぉ'
  wi: 'うぃ'
  we: 'うぇ'
  va: 'ゔぁ'
  vi: 'ゔぃ'
  vu: 'ゔ'
  ve: 'ゔぇ'
  vo: 'ゔぉ'
  vya: 'ゔゃ'
  vyi: 'ゔぃ'
  vyu: 'ゔゅ'
  vye: 'ゔぇ'
  vyo: 'ゔょ'
  ka: 'か'
  ki: 'き'
  ku: 'く'
  ke: 'け'
  ko: 'こ'
  lka: 'ヵ'
  lke: 'ヶ'
  xka: 'ヵ'
  xke: 'ヶ'
  kya: 'きゃ'
  kyi: 'きぃ'
  kyu: 'きゅ'
  kye: 'きぇ'
  kyo: 'きょ'
  qya: 'くゃ'
  qyu: 'くゅ'
  qyo: 'くょ'
  qwa: 'くぁ'
  qwi: 'くぃ'
  qwu: 'くぅ'
  qwe: 'くぇ'
  qwo: 'くぉ'
  qa: 'くぁ'
  qi: 'くぃ'
  qe: 'くぇ'
  qo: 'くぉ'
  kwa: 'くぁ'
  qyi: 'くぃ'
  qye: 'くぇ'
  ga: 'が'
  gi: 'ぎ'
  gu: 'ぐ'
  ge: 'げ'
  go: 'ご'
  gya: 'ぎゃ'
  gyi: 'ぎぃ'
  gyu: 'ぎゅ'
  gye: 'ぎぇ'
  gyo: 'ぎょ'
  gwa: 'ぐぁ'
  gwi: 'ぐぃ'
  gwu: 'ぐぅ'
  gwe: 'ぐぇ'
  gwo: 'ぐぉ'
  sa: 'さ'
  si: 'し'
  shi: 'し'
  su: 'す'
  se: 'せ'
  so: 'そ'
  za: 'ざ'
  zi: 'じ'
  zu: 'ず'
  ze: 'ぜ'
  zo: 'ぞ'
  ji: 'じ'
  sya: 'しゃ'
  syi: 'しぃ'
  syu: 'しゅ'
  sye: 'しぇ'
  syo: 'しょ'
  sha: 'しゃ'
  shu: 'しゅ'
  she: 'しぇ'
  sho: 'しょ'
  swa: 'すぁ'
  swi: 'すぃ'
  swu: 'すぅ'
  swe: 'すぇ'
  swo: 'すぉ'
  zya: 'じゃ'
  zyi: 'じぃ'
  zyu: 'じゅ'
  zye: 'じぇ'
  zyo: 'じょ'
  ja: 'じゃ'
  ju: 'じゅ'
  je: 'じぇ'
  jo: 'じょ'
  jya: 'じゃ'
  jyi: 'じぃ'
  jyu: 'じゅ'
  jye: 'じぇ'
  jyo: 'じょ'
  ta: 'た'
  ti: 'ち'
  tu: 'つ'
  te: 'て'
  to: 'と'
  chi: 'ち'
  tsu: 'つ'
  ltu: 'っ'
  xtu: 'っ'
  tya: 'ちゃ'
  tyi: 'ちぃ'
  tyu: 'ちゅ'
  tye: 'ちぇ'
  tyo: 'ちょ'
  cha: 'ちゃ'
  chu: 'ちゅ'
  che: 'ちぇ'
  cho: 'ちょ'
  cya: 'ちゃ'
  cyi: 'ちぃ'
  cyu: 'ちゅ'
  cye: 'ちぇ'
  cyo: 'ちょ'
  tsa: 'つぁ'
  tsi: 'つぃ'
  tse: 'つぇ'
  tso: 'つぉ'
  tha: 'てゃ'
  thi: 'てぃ'
  thu: 'てゅ'
  the: 'てぇ'
  tho: 'てょ'
  twa: 'とぁ'
  twi: 'とぃ'
  twu: 'とぅ'
  twe: 'とぇ'
  two: 'とぉ'
  da: 'だ'
  di: 'ぢ'
  du: 'づ'
  de: 'で'
  do: 'ど'
  dya: 'ぢゃ'
  dyi: 'ぢぃ'
  dyu: 'ぢゅ'
  dye: 'ぢぇ'
  dyo: 'ぢょ'
  dha: 'でゃ'
  dhi: 'でぃ'
  dhu: 'でゅ'
  dhe: 'でぇ'
  dho: 'でょ'
  dwa: 'どぁ'
  dwi: 'どぃ'
  dwu: 'どぅ'
  dwe: 'どぇ'
  dwo: 'どぉ'
  na: 'な'
  ni: 'に'
  nu: 'ぬ'
  ne: 'ね'
  no: 'の'
  nya: 'にゃ'
  nyi: 'にぃ'
  nyu: 'にゅ'
  nye: 'にぇ'
  nyo: 'にょ'
  ha: 'は'
  hi: 'ひ'
  hu: 'ふ'
  he: 'へ'
  ho: 'ほ'
  fu: 'ふ'
  hya: 'ひゃ'
  hyi: 'ひぃ'
  hyu: 'ひゅ'
  hye: 'ひぇ'
  hyo: 'ひょ'
  fya: 'ふゃ'
  fyu: 'ふゅ'
  fyo: 'ふょ'
  fwa: 'ふぁ'
  fwi: 'ふぃ'
  fwu: 'ふぅ'
  fwe: 'ふぇ'
  fwo: 'ふぉ'
  fa: 'ふぁ'
  fi: 'ふぃ'
  fe: 'ふぇ'
  fo: 'ふぉ'
  fyi: 'ふぃ'
  fye: 'ふぇ'
  ba: 'ば'
  bi: 'び'
  bu: 'ぶ'
  be: 'べ'
  bo: 'ぼ'
  bya: 'びゃ'
  byi: 'びぃ'
  byu: 'びゅ'
  bye: 'びぇ'
  byo: 'びょ'
  pa: 'ぱ'
  pi: 'ぴ'
  pu: 'ぷ'
  pe: 'ぺ'
  po: 'ぽ'
  pya: 'ぴゃ'
  pyi: 'ぴぃ'
  pyu: 'ぴゅ'
  pye: 'ぴぇ'
  pyo: 'ぴょ'
  ma: 'ま'
  mi: 'み'
  mu: 'む'
  me: 'め'
  mo: 'も'
  mya: 'みゃ'
  myi: 'みぃ'
  myu: 'みゅ'
  mye: 'みぇ'
  myo: 'みょ'
  ya: 'や'
  yu: 'ゆ'
  yo: 'よ'
  xya: 'ゃ'
  xyu: 'ゅ'
  xyo: 'ょ'
  ra: 'ら'
  ri: 'り'
  ru: 'る'
  re: 'れ'
  ro: 'ろ'
  rya: 'りゃ'
  ryi: 'りぃ'
  ryu: 'りゅ'
  rye: 'りぇ'
  ryo: 'りょ'
  la: 'ら'
  li: 'り'
  lu: 'る'
  le: 'れ'
  lo: 'ろ'
  lya: 'りゃ'
  lyi: 'りぃ'
  lyu: 'りゅ'
  lye: 'りぇ'
  lyo: 'りょ'
  wa: 'わ'
  wo: 'を'
  lwe: 'ゎ'
  xwa: 'ゎ'
  n: 'ん'
  nn: 'ん'
  'n ': 'ん' # n + space
  xn: 'ん'
  ltsu: 'っ'

wanakana.J_to_R =
  あ: 'a'
  い: 'i'
  う: 'u'
  え: 'e'
  お: 'o'
  ゔぁ: 'va'
  ゔぃ: 'vi'
  ゔ: 'vu'
  ゔぇ: 've'
  ゔぉ: 'vo'
  か: 'ka'
  き: 'ki'
  きゃ: 'kya'
  きぃ: 'kyi'
  きゅ: 'kyu'
  く: 'ku'
  け: 'ke'
  こ: 'ko'
  が: 'ga'
  ぎ: 'gi'
  ぐ: 'gu'
  げ: 'ge'
  ご: 'go'
  ぎゃ: 'gya'
  ぎぃ: 'gyi'
  ぎゅ: 'gyu'
  ぎぇ: 'gye'
  ぎょ: 'gyo'
  さ: 'sa'
  す: 'su'
  せ: 'se'
  そ: 'so'
  ざ: 'za'
  ず: 'zu'
  ぜ: 'ze'
  ぞ: 'zo'
  し: 'shi'
  しゃ: 'sha'
  しゅ: 'shu'
  しょ: 'sho'
  じ: 'ji'
  じゃ: 'ja'
  じゅ: 'ju'
  じょ: 'jo'
  た: 'ta'
  ち: 'chi'
  ちゃ: 'cha'
  ちゅ: 'chu'
  ちょ: 'cho'
  つ: 'tsu'
  て: 'te'
  と: 'to'
  だ: 'da'
  ぢ: 'di'
  づ: 'du'
  で: 'de'
  ど: 'do'
  な: 'na'
  に: 'ni'
  にゃ: 'nya'
  にゅ: 'nyu'
  にょ: 'nyo'
  ぬ: 'nu'
  ね: 'ne'
  の: 'no'
  は: 'ha'
  ひ: 'hi'
  ふ: 'fu'
  へ: 'he'
  ほ: 'ho'
  ひゃ: 'hya'
  ひゅ: 'hyu'
  ひょ: 'hyo'
  ふぁ: 'fa'
  ふぃ: 'fi'
  ふぇ: 'fe'
  ふぉ: 'fo'
  ば: 'ba'
  び: 'bi'
  ぶ: 'bu'
  べ: 'be'
  ぼ: 'bo'
  びゃ: 'bya'
  びゅ: 'byu'
  びょ: 'byo'
  ぱ: 'pa'
  ぴ: 'pi'
  ぷ: 'pu'
  ぺ: 'pe'
  ぽ: 'po'
  ぴゃ: 'pya'
  ぴゅ: 'pyu'
  ぴょ: 'pyo'
  ま: 'ma'
  み: 'mi'
  む: 'mu'
  め: 'me'
  も: 'mo'
  みゃ: 'mya'
  みゅ: 'myu'
  みょ: 'myo'
  や: 'ya'
  ゆ: 'yu'
  よ: 'yo'
  ら: 'ra'
  り: 'ri'
  る: 'ru'
  れ: 're'
  ろ: 'ro'
  りゃ: 'rya'
  りゅ: 'ryu'
  りょ: 'ryo'
  わ: 'wa'
  を: 'wo'
  ん: 'n'
# Archaic characters
  ゐ: 'wi'
  ゑ: 'we'
# Uncommon character combos
  きぇ: 'kye'
  きょ: 'kyo'
  じぃ: 'jyi'
  じぇ: 'jye'
  ちぃ: 'cyi'
  ちぇ: 'che'
  ひぃ: 'hyi'
  ひぇ: 'hye'
  びぃ: 'byi'
  びぇ: 'bye'
  ぴぃ: 'pyi'
  ぴぇ: 'pye'
  みぇ: 'mye'
  みぃ: 'myi'
  りぃ: 'ryi'
  りぇ: 'rye'
  にぃ: 'nyi'
  にぇ: 'nye'
  しぃ: 'syi'
  しぇ: 'she'
  いぇ: 'ye'
  うぁ: 'wha'
  うぉ: 'who'
  うぃ: 'wi'
  うぇ: 'we'
  ゔゃ: 'vya'
  ゔゅ: 'vyu'
  ゔょ: 'vyo'
  すぁ: 'swa'
  すぃ: 'swi'
  すぅ: 'swu'
  すぇ: 'swe'
  すぉ: 'swo'
  くゃ: 'qya'
  くゅ: 'qyu'
  くょ: 'qyo'
  くぁ: 'qwa'
  くぃ: 'qwi'
  くぅ: 'qwu'
  くぇ: 'qwe'
  くぉ: 'qwo'
  ぐぁ: 'gwa'
  ぐぃ: 'gwi'
  ぐぅ: 'gwu'
  ぐぇ: 'gwe'
  ぐぉ: 'gwo'
  つぁ: 'tsa'
  つぃ: 'tsi'
  つぇ: 'tse'
  つぉ: 'tso'
  てゃ: 'tha'
  てぃ: 'thi'
  てゅ: 'thu'
  てぇ: 'the'
  てょ: 'tho'
  とぁ: 'twa'
  とぃ: 'twi'
  とぅ: 'twu'
  とぇ: 'twe'
  とぉ: 'two'
  ぢゃ: 'dya'
  ぢぃ: 'dyi'
  ぢゅ: 'dyu'
  ぢぇ: 'dye'
  ぢょ: 'dyo'
  でゃ: 'dha'
  でぃ: 'dhi'
  でゅ: 'dhu'
  でぇ: 'dhe'
  でょ: 'dho'
  どぁ: 'dwa'
  どぃ: 'dwi'
  どぅ: 'dwu'
  どぇ: 'dwe'
  どぉ: 'dwo'
  ふぅ: 'fwu'
  ふゃ: 'fya'
  ふゅ: 'fyu'
  ふょ: 'fyo'
#  Small Characters (normally not transliterated alone)
  ぁ: 'a'
  ぃ: 'i'
  ぇ: 'e'
  ぅ: 'u'
  ぉ: 'o'
  ゃ: 'ya'
  ゅ: 'yu'
  ょ: 'yo'
  っ: ''
  ゕ: 'ka'
  ゖ: 'ka'
  ゎ: 'wa'
# Punctuation
  '　': ' '
# Ambiguous consonant vowel pairs
  んあ: 'n\'a'
  んい: 'n\'i'
  んう: 'n\'u'
  んえ: 'n\'e'
  んお: 'n\'o'
  んや: 'n\'ya'
  んゆ: 'n\'yu'
  んよ: 'n\'yo'