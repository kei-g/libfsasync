import { describe, it } from 'node:test'
import { equal } from 'node:assert'
import { mkdirAsync, renameAsync, rmdirAsync, statAsync } from '../src/index.ts'

describe('rename', () => {
  it('successful', async () => {
    const stats = await statAsync('tmp27')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp27'), true)
    equal(await mkdirAsync('tmp27/rename'), true)
    equal(await mkdirAsync('tmp27/rename/foo'), true)
    equal(await renameAsync('tmp27/rename/foo', 'tmp27/rename/bar'), true)
    equal(await rmdirAsync('tmp27/rename/bar'), true)
    equal(await rmdirAsync('tmp27/rename'), true)
  })
})
