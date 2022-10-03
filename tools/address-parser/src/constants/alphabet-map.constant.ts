import { AlphabetMap } from '../types'

import { ALPHABET } from './alphabet.constant'

export const ALPHABET_MAP: AlphabetMap = createAlphabetMap(ALPHABET)

function createAlphabetMap(alphabet: string): AlphabetMap {
    const alphabetMap: AlphabetMap = {}
    for (let z = 0; z < alphabet.length; z++) {
        const x = alphabet.charAt(z)
        alphabetMap[x] = z
    }
    return alphabetMap
}
