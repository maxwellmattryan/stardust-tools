/**
 * Wraps a timeout in a promise so that it can be awaited.
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
