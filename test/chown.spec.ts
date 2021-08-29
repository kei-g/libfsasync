import { Stats, existsSync } from 'fs'
import { chownAsync, mkdirAsync, rmdirAsync, statAsync } from '../src'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('chown', () => {
  it('successful', async () => {
    if (!existsSync('tmp'))
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/chown')).is.true
    const stats = await statAsync('tmp/chown')
    expect(stats).is.not.instanceOf(Error)
    if (stats instanceof Stats)
      expect(await chownAsync('tmp/chown', stats.uid, stats.gid)).is.true
    expect(await rmdirAsync('tmp/chown')).is.true
  })
})
