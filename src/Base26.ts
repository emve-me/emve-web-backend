const abc = 'LDZETHIJKUQCGASMWVOYPRXNBF'.split('')

const charCode = (char: string) => {
  char = char.toUpperCase()
  return abc.findIndex(c => c === char) + 1
}

export const fromBase26 = (alpha: string): number => {
  alpha = alpha.toUpperCase()
  if (!/^[A-Z]+$/.test(alpha)) {
    throw new Error('Input must be a non-empty string comprised of only characters A-Z')
  }

  const letters = alpha.split('')
  let out = 0

  for (let i = 0; i < letters.length; i++) {
    out += (charCode(letters[letters.length - 1 - i])) * Math.pow(26, i)
  }

  return out
}

export const toBase26 = (decimal: number | string): string => {

  if (typeof decimal === 'string') {
    decimal = +decimal
  }

  if (decimal <= 0) {
    throw new Error('Number must be > 0')
  }

  let out = ''

  while (true) {
    out = abc[((decimal - 1) % 26)] + out
    decimal = Math.floor((decimal - 1) / 26)

    if (decimal === 0) {
      break
    }
  }

  return out
}