const abc = 'LDZETHIJKUQCGASMWVOYPRXNBF'.split('')


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