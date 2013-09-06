wanakana = wanakana || {}

# Support AMD
if typeof define is "function" and define.amd
  define "wanakana", [], ->wanakana

wanakana.HIRAGANA_START = 12353
wanakana.HIRAGANA_END   = 12438
wanakana.KATAKANA_START = 12449
wanakana.KATAKANA_END   = 12538

wanakana.defaultOptions =
  # Transliterates wi and we to ゐ and ゑ
  useObseleteKana: no
  # Use revised Hepburn macrons (e.g. tōkyō)
  useMacrons: no
  # Use revised Hepburn apostrophes (e.g. on'yomi)
  useApostrophes: yes

wanakana._allTrue = (arr, func) ->
  for val in arr
    if func(val) is false then return false
  true

wanakana._isCharInRange = (char, start, end) ->
  code = char.charCodeAt 0
  return start <= code <= end

###*
* Returns true if input is entirely hiragana.
###
wanakana.isHiragana = (input) ->
  isCharHiragana = (char) ->
    wanakana._isCharInRange(char, wanakana.HIRAGANA_START, wanakana.HIRAGANA_END)
  chars = input.split("")
  wanakana._allTrue( chars, isCharHiragana )


wanakana.isKatakana = (input) ->
  isCharKatakana = (char) ->
    wanakana._isCharInRange(char, wanakana.KATAKANA_START, wanakana.KATAKANA_END)
  chars = input.split("")
  wanakana._allTrue( chars, isCharKatakana )

wanakana.isKana = (input) ->
  chars = input.split("")
  wanakana._allTrue( chars, (char) -> (wanakana.isHiragana char) or (wanakana.isKatakana char) )

wanakana.isRomaji = (input) ->
  input

wanakana._katakanaToHiragana = (kata) ->
  # Shift charcode down.
  hira = ""
  hira

wanakana._hiraganaToKatakana = (hira) ->
  # Shift charcode up.
  kata = ""
  kata

wanakana._hiraganaToRomaji = (hira) ->
  # Transliterate
  roma = ""
  roma

wanakana._romajiToHiragana = (roma) ->
  # Transliterate
  hira = ""
  hira

wanakana.toHiragana = (input) ->
  # wanakana._romajiToHiragana(input) if isRomaji(input)
  # wanakana._katakanaToHiragana(input) if isKatakana(input)
  # otherwise
  input

wanakana.toKatakana = (input) ->
  # wanakana._romajiToHiragana(input) if isRomaji(input)
  # wanakana._hiraganaToKatakana(input) if isHiragana(input)
  #otherwise
  input

wanakana.toKana = (input) ->
  #if isRomaji(input)
    # wanakana._romajiToHiragana(input)
    # if uppercase
      # wanakana._katakanaToHiragana(input)
  #otherwise
  input

wanakana.toRomaji = (input) ->
  # if isKatakana(input)
  #  wanakana._katakanaToHiragana(input)
  # if isHiragana(input)
  #  wanakana._hiraganaToRomaji(input)
  #otherwise
  input