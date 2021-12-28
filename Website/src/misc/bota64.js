class Bota {
  encode(string, base64) {
    const compile = string
      .replace(/a/g, "𑫀")
      .replace(/b/g, "𑫁")
      .replace(/c/g, "𑫂")
      .replace(/d/g, "𑫃")
      .replace(/e/g, "𑫄")
      .replace(/f/g, "𑫅")
      .replace(/g/g, "𑫆")
      .replace(/h/g, "𑫇")
      .replace(/i/g, "𑫈")
      .replace(/j/g, "𑫉")
      .replace(/k/g, "𑫊")
      .replace(/l/g, "𑫋")
      .replace(/m/g, "𑫌")
      .replace(/n/g, "𑫍")
      .replace(/o/g, "𑫎")
      .replace(/p/g, "𑫏")
      .replace(/q/g, "𑫐")
      .replace(/r/g, "𑫑")
      .replace(/s/g, "𑫒")
      .replace(/t/g, "𑫓")
      .replace(/u/g, "𑫣")
      .replace(/v/g, "𑫔")
      .replace(/w/g, "𑫕")
      .replace(/x/g, "𑫖")
      .replace(/y/g, "𑫗")
      .replace(/z/g, "𑫘")

      // ENCODE ABC CASE
      .replace(/A/g, "𐓆")
      .replace(/B/g, "𐓍")
      .replace(/C/g, "𐒱")
      .replace(/D/g, "𐒴")
      .replace(/E/g, "𐒄")
      .replace(/F/g, "𐑙")
      .replace(/G/g, "𐑿")
      .replace(/H/g, "𐑼")
      .replace(/I/g, "𐒏")
      .replace(/J/g, "𐒤")
      .replace(/K/g, "𐓌")
      .replace(/L/g, "𐓉")
      .replace(/M/g, "𐓋")
      .replace(/N/g, "𐓊")
      .replace(/O/g, "𐓒")
      .replace(/P/g, "𐓏")
      .replace(/Q/g, "𐓑")
      .replace(/R/g, "𐓐")
      .replace(/S/g, "𐒁")
      .replace(/T/g, "𐒀")
      .replace(/U/g, "𐒘")
      .replace(/V/g, "𐒲")
      .replace(/W/g, "𐓓")
      .replace(/X/g, "𐒅")
      .replace(/Y/g, "𐒻")
      .replace(/Z/g, "𐒕")

      // other letters
      .replace(/⣿/g, "ֆ")
      .replace(/:/g, "𑀭")
      .replace(/ /g, "𑁈")
      .replace(/\(/g, "]")
      .replace(/\)/g, "[")
      .replace(/"/g, "ᛏ")
      .replace(/!/g, "᜵")
      .replace(/\//g, "᜶")
      .replace(/\?/g, "⸿");

    if (base64) {
      return window.btoa(unescape(encodeURIComponent(compile.trim())));
    } else {
      return compile.trim();
    }
  }

  decode(string, base64) {
    const compile = string
      // decode abc case
      .replace(/𑫀/g, "a")
      .replace(/𑫁/g, "b")
      .replace(/𑫂/g, "c")
      .replace(/𑫃/g, "d")
      .replace(/𑫄/g, "e")
      .replace(/𑫅/g, "f")
      .replace(/𑫆/g, "g")
      .replace(/𑫇/g, "h")
      .replace(/𑫈/g, "i")
      .replace(/𑫉/g, "j")
      .replace(/𑫊/g, "k")
      .replace(/𑫋/g, "l")
      .replace(/𑫌/g, "m")
      .replace(/𑫍/g, "n")
      .replace(/𑫎/g, "o")
      .replace(/𑫏/g, "p")
      .replace(/𑫐/g, "q")
      .replace(/𑫑/g, "r")
      .replace(/𑫒/g, "s")
      .replace(/𑫓/g, "t")
      .replace(/𑫣/g, "u")
      .replace(/𑫔/g, "v")
      .replace(/𑫕/g, "w")
      .replace(/𑫖/g, "x")
      .replace(/𑫗/g, "y")
      .replace(/𑫘/g, "z")

      // DECODE ABC CASE
      .replace(/𐓆/g, "A")
      .replace(/𐓍/g, "B")
      .replace(/𐒱/g, "C")
      .replace(/𐒴/g, "D")
      .replace(/𐒄/g, "E")
      .replace(/𐑙/g, "F")
      .replace(/𐑿/g, "G")
      .replace(/𐑼/g, "H")
      .replace(/𐒏/g, "I")
      .replace(/𐒤/g, "J")
      .replace(/𐓌/g, "K")
      .replace(/𐓉/g, "L")
      .replace(/𐓋/g, "M")
      .replace(/𐓊/g, "N")
      .replace(/𐓒/g, "O")
      .replace(/𐓏/g, "P")
      .replace(/𐓑/g, "Q")
      .replace(/𐓐/g, "R")
      .replace(/𐒁/g, "S")
      .replace(/𐒀/g, "T")
      .replace(/𐒘/g, "U")
      .replace(/𐒲/g, "V")
      .replace(/𐓓/g, "W")
      .replace(/𐒅/g, "X")
      .replace(/𐒻/g, "Y")
      .replace(/𐒕/g, "Z")

      // other letters
      .replace(/ֆ/g, "⣿")
      .replace(/𑀭/g, ":")
      .replace(/𑁈/g, " ")
      .replace(/\]/g, "(")
      .replace(/\[/g, ")")
      .replace(/ᛏ/g, '"')
      .replace(/᜵/g, "!")
      .replace(/᜶/g, "/")
      .replace(/⸿/g, "?");

    if (base64) {
      return decodeURIComponent(escape(window.atob(decode(compile.trim(), false))));
    } else {
      return compile.trim();
    }
  }
}
export default Bota;
