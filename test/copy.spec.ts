import assert, { equal } from 'node:assert'
import { copyFileAsync, mkdirAsync, readdirAsync, rmAsync, rmdirAsync, statAsync, writeFileAsync } from '../src'
import { describe, it } from 'mocha'

describe('copy', () => {
  it('copyable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/copy'), true)
    equal(await writeFileAsync('tmp/copy/foo', 'this is foo'), true)
    equal(await copyFileAsync('tmp/copy/foo', 'tmp/copy/bar'), true)
    const files = await readdirAsync('tmp/copy')
    assert(!(files instanceof Error))
    for (const name of files)
      equal(await rmAsync(`tmp/copy/${name}`), true)
    equal(await rmdirAsync('tmp/copy'), true)
  })
})
