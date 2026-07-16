import assert, { equal } from 'node:assert'
import { copyFileAsync, mkdirAsync, readdirAsync, rmAsync, rmdirAsync, statAsync, writeFileAsync } from '../src/index.ts'
import { describe, it } from 'node:test'

describe('copy', () => {
  it('copyable', async () => {
    const stats = await statAsync('tmp6')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp6'), true)
    equal(await mkdirAsync('tmp6/copy'), true)
    equal(await writeFileAsync('tmp6/copy/foo', 'this is foo'), true)
    equal(await copyFileAsync('tmp6/copy/foo', 'tmp6/copy/bar'), true)
    const files = await readdirAsync('tmp6/copy')
    assert(!(files instanceof Error))
    for (const name of files)
      equal(await rmAsync(`tmp6/copy/${name}`), true)
    equal(await rmdirAsync('tmp6/copy'), true)
  })
})
