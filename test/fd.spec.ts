import { Stats } from 'fs'
import { closeAsync, fstatAsync, mkdirAsync, openAsync, rmdirAsync, unlinkAsync, writeFileAsync } from '../src'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('open-fstat-close', () => {
  it('open-fstat-close', async () => {
    await mkdirAsync('tmp')
    expect(await mkdirAsync('tmp/open')).to.be.true
    expect(await writeFileAsync('tmp/open/foo', 'this is foo')).to.be.true
    const fd = await openAsync('tmp/open/foo', 'r')
    expect(fd).to.not.be.an.instanceOf(Error)
    expect(fd).to.be.greaterThanOrEqual(0)
    if (!(fd instanceof Error)) {
      const stats = await fstatAsync(fd)
      expect(stats).to.not.be.an.instanceOf(Error)
      expect(stats).to.satisfy((stats: Stats) => stats.isFile())
      const success = await closeAsync(fd)
      expect(success).to.not.be.an.instanceOf(Error)
      expect(success).to.be.true
    }
    await unlinkAsync('tmp/open/foo')
    await rmdirAsync('tmp/open')
    await rmdirAsync('tmp')
  })
})
