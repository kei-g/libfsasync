import assert, { equal } from 'node:assert'
import { chownAsync, mkdirAsync, rmdirAsync, statAsync } from '../src/index.ts'
import { describe, it } from 'node:test'
import { existsSync } from 'node:fs'

describe('chown', () => {
  it('successful', async () => {
    if (!existsSync('tmp5'))
      equal(await mkdirAsync('tmp5'), true)
    equal(await mkdirAsync('tmp5/chown'), true)
    const stats = await statAsync('tmp5/chown')
    assert(!(stats instanceof Error))
    equal(await chownAsync('tmp5/chown', stats.uid, stats.gid), true)
    equal(await rmdirAsync('tmp5/chown'), true)
  })
})
