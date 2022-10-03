import { AddressParser } from './address-parser'
import { performance } from 'perf_hooks'

const NUM_ADDRESSES = 1_000_000
const ADDRESS = 'smr1zqc4nvg4ufcj3dkmzmd4uc034fx8pkz2nxl820a28mnsmxkec6ntwcu0ld0'
const ADDRESSES = Array.from({ length: NUM_ADDRESSES }).map(() => ADDRESS)

function runAddressParser(): void {
    const startTime = performance.now()

    const parser = new AddressParser()

    const times: number[] = []
    for (const address of ADDRESSES) {
        const startTimeInner = performance.now()
        parser.parseAddress(address)
        console.log(parser.parseAddress(address))
        const endTimeInner = performance.now()
        times.push(endTimeInner - startTimeInner)
    }

    const endTime = performance.now()
    logTimeInformation(startTime, endTime, times)
}
function logTimeInformation(startTime: number, endTime: number, times: number[]): void {
    console.log(`Num addresses: ${NUM_ADDRESSES}`)

    console.log(`Total time: ${endTime - startTime} ms`)

    const totalTime = times.reduce((time, total) => time + total, 0)
    console.log(`Average parsing time: ${totalTime / times.length} ms`)
}

runAddressParser()
