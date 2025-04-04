import assert, { equal } from 'node:assert'
import { describe, it } from 'mocha'
import { realpathAsync } from '../src'

describe('realpath', () => {
  it('__dirname', async () => {
    const rp = await realpathAsync(__dirname)
    assert(!(rp instanceof Error))
    equal(rp, __dirname)
  })
})
