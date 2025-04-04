import { describe, it } from 'mocha'
import { equal } from 'node:assert'
import { mkdirAsync, renameAsync, rmdirAsync, statAsync } from '../src'

describe('rename', () => {
  it('successful', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/rename'), true)
    equal(await mkdirAsync('tmp/rename/foo'), true)
    equal(await renameAsync('tmp/rename/foo', 'tmp/rename/bar'), true)
    equal(await rmdirAsync('tmp/rename/bar'), true)
    equal(await rmdirAsync('tmp/rename'), true)
  })
})
