import assert, { equal } from 'node:assert'
import { chownAsync, mkdirAsync, rmdirAsync, statAsync } from '../src'
import { describe, it } from 'mocha'
import { existsSync } from 'node:fs'

describe('chown', () => {
  it('successful', async () => {
    if (!existsSync('tmp'))
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/chown'), true)
    const stats = await statAsync('tmp/chown')
    assert(!(stats instanceof Error))
    equal(await chownAsync('tmp/chown', stats.uid, stats.gid), true)
    equal(await rmdirAsync('tmp/chown'), true)
  })
})
