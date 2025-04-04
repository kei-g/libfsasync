import assert, { equal } from 'node:assert'
import { describe, it } from 'mocha'
import { mkdirAsync, readFileAsync, rmdirAsync, statAsync, unlinkAsync, writeFileAsync } from '../src'

describe('read-write', () => {
  it('not readable', async () =>
    assert(await readFileAsync('tmp/non-existing-directory/test.txt') instanceof Error)
  )
  it('not writable', async () =>
    assert(await writeFileAsync('tmp/non-existing-directory/test.txt', 'test') instanceof Error)
  )
  it('readable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/read'), true)
    equal(await writeFileAsync('tmp/read/test.txt', 'this is a test'), true)
    const content = await readFileAsync('tmp/read/test.txt')
    assert(content instanceof Buffer)
    equal(content.toString(), 'this is a test')
    equal(await unlinkAsync('tmp/read/test.txt'), true)
    equal(await rmdirAsync('tmp/read'), true)
  })
  it('writeable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/write'), true)
    equal(await writeFileAsync('tmp/write/test.txt', 'this is a test'), true)
    equal(await unlinkAsync('tmp/write/test.txt'), true)
    equal(await rmdirAsync('tmp/write'), true)
  })
})
