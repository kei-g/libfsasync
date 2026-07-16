import assert, { equal } from 'node:assert'
import { describe, it } from 'node:test'
import { realpathAsync } from '../src/index.ts'

describe('realpath', () => {
  it('import.meta.dirname', async () => {
    const rp = await realpathAsync(import.meta.dirname)
    assert(!(rp instanceof Error))
    equal(rp, import.meta.dirname)
  })
})
