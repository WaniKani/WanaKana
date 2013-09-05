wanakana = wanakana || {}

# Support AMD
if typeof define is "function" and define.amd
  define "wanakana", [], ->wanakana

wanakana.HIRAGANA_START = 12353
wanakana.HIRAGANA_END   = 12438
wanakana.KATAKANA_START = 12449
wanakana.KATAKANA_END   = 12538

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

wanakana.toHiragana = (input) ->
  input

wanakana.toKatakana = (input) ->
  input

wanakana.toKana = (input) ->
  input

wanakana.toRomaji = (input) ->
  input