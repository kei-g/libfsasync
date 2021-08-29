import { describe, it } from 'mocha'
import { expect } from 'chai'
import { realpathAsync } from '../src/index'

describe('realpath', () => {
  it('__dirname', async () => {
    const rp = await realpathAsync(__dirname)
    expect(rp).is.not.instanceOf(Error)
    expect(rp).eq(__dirname)
  })
})
