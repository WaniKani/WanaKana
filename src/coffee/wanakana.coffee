wanakana = wanakana || {}

# Support AMD
if typeof define is "function" and define.amd
  define "wanakana", [], ->wanakana

wanakana.toHiragana = (input) ->
  input

wanakana.toKatakana = (input) ->
  input

wanakana.toRomaji = (input) ->
  input