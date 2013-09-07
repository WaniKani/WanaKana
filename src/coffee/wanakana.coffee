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

wanakana.defaultOptions =
  # Transliterates wi and we to ゐ and ゑ
  useObseleteKana: no
  # Use revised Hepburn macrons (e.g. tōkyō)
  useMacrons: yes
  # Use revised Hepburn apostrophes (e.g. on'yomi)
  useApostrophes: yes
  # Use a katakana ヴ for hiragana 'vu'
  useKatakanaVU: no

wanakana._allTrue = (arr, func) ->
  for val in arr
    if func(val) is false then return false
  true

wanakana._isCharInRange = (char, start, end) ->
  code = char.charCodeAt 0
  return start <= code <= end

wanakana._isCharKatakana = (char) ->
  wanakana._isCharInRange(char, wanakana.KATAKANA_START, wanakana.KATAKANA_END)
wanakana._isCharHiragana = (char) ->
  wanakana._isCharInRange(char, wanakana.HIRAGANA_START, wanakana.HIRAGANA_END)

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


wanakana._katakanaToHiragana = (kata) ->
  hira = []
  for kataChar in kata.split ""
    code = kataChar.charCodeAt 0
    # Shift charcode.
    code += wanakana.HIRAGANA_START - wanakana.KATAKANA_START
    hiraChar = String.fromCharCode code
    hira.push hiraChar
  hira.join ""

wanakana._hiraganaToKatakana = (hira) ->
  kata = []
  for hiraChar in hira.split ""
    if wanakana._isCharKatakana(hiraChar)
      kataChar = hiraChar
    else
      code = hiraChar.charCodeAt 0
      # Shift charcode.
      code += wanakana.KATAKANA_START - wanakana.HIRAGANA_START
      kataChar = String.fromCharCode code
    kata.push kataChar
  kata.join ""

wanakana._hiraganaToRomaji = (hira) ->
  # Transliterate
  roma = ""
  roma

wanakana._romajiToHiragana = (roma, options) -> wanakana._romajiToKana(roma, options, true)
wanakana._romajiToKana = (roma, options, ignoreCase = false) ->
  kana = []
  l = roma.length
  cursor = 0
  maxChunk = 3
  getChunk = () -> roma.substr(cursor, chunkSize)
  isCharUpperCase = (input) ->
    wanakana._isCharInRange(input, wanakana.UPPERCASE_START, wanakana.UPPERCASE_END)

  while cursor < l
    chunkSize = Math.min(maxChunk, l-cursor)
    while chunkSize > 0
      chunk = getChunk()
      if (chunk == "lts" && l-cursor >= 4)
        # Super rare edge case with 4 chars for 'ltsu'
        chunkSize++
        chunk = getChunk()
      chunkLC = chunk.toLowerCase()
      kanaChar = wanakana.lookupTable[chunkLC]
      # DEBUG
      # console.log (cursor + "x" + chunkSize + ":" + chunk + " => " + kanaChar )
      break if kanaChar?
      chunkSize--

    if not kanaChar?
      chunk = wanakana._convertPunctuation(chunk)
      # Passthrough undefined values
      kana.push(chunk)
      cursor += chunkSize
      break

    # Handle special cases.
    options = wanakana.defaultOptions unless options?
    if options.useKatakanaVU and kanaChar.charAt(0) is "ゔ"
      kanaChar = "ヴ" + kanaChar.slice(1)
    if options.useObseleteKana
      if chunkLC is "wi" then kanaChar = "ゐ"
      if chunkLC is "we" then kanaChar = "ゑ"

    # Use katakana if first letter is uppercase
    unless ignoreCase
      if isCharUpperCase(chunk.charAt(0))
        kanaChar = wanakana._hiraganaToKatakana(kanaChar)

    kana.push (kanaChar)
    cursor += chunkSize or 1
  kana.join ""

wanakana._convertPunctuation = (input, options) ->
  if input is '-' then return 'ー'
  input

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
  if wanakana.isRomaji(input)
    return input = wanakana._romajiToKana(input, options)
  #otherwise
  input

wanakana.toRomaji = (input, options) ->
  # if isKatakana(input)
  #  wanakana._katakanaToHiragana(input)
  # if isHiragana(input)
  #  wanakana._hiraganaToRomaji(input)
  #otherwise
  input


wanakana.lookupTable =
  a: 'あ'
  i: 'い'
  u: 'う'
  e: 'え'
  o: 'お'
  yi: 'い'
  wu: 'う'
  whu: 'う'
  vu: 'ゔ'
  li: 'ぃ'
  lu: 'ぅ'
  le: 'ぇ'
  lo: 'ぉ'
  xa: 'ぁ'
  xi: 'ぃ'
  xu: 'ぅ'
  xe: 'ぇ'
  xo: 'ぉ'
  lyi: 'ぃ'
  xyi: 'ぃ'
  lye: 'ぇ'
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
  ve: 'ゔぇ'
  vo: 'ゔぉ'
  vyi: 'ゔぃ'
  vye: 'ゔぇ'
  vya: 'ゔゃ'
  vyu: 'ゔゅ'
  vyo: 'ゔょ'
  ka: 'か'
  ki: 'き'
  ku: 'く'
  ke: 'け'
  ko: 'こ'
  ca: 'か'
  cu: 'く'
  co: 'こ'
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
  su: 'す'
  se: 'せ'
  so: 'そ'
  ci: 'し'
  ce: 'せ'
  shi: 'し'
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
  lya: 'ゃ'
  lyu: 'ゅ'
  lyo: 'ょ'
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
  wa: 'わ'
  wo: 'を'
  lwe: 'ゎ'
  xwa: 'ゎ'
  n: 'ん'
  nn: 'ん'
  xn: 'ん'
  ltsu: 'っ'