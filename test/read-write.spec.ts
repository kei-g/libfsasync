import assert, { equal } from 'node:assert'
import { describe, it } from 'node:test'
import { mkdirAsync, readFileAsync, rmdirAsync, statAsync, unlinkAsync, writeFileAsync } from '../src/index.ts'

describe('read-write', () => {
  it('not readable', async () =>
    assert(await readFileAsync('tmp1/non-existing-directory/test.txt') instanceof Error)
  )
  it('not writable', async () =>
    assert(await writeFileAsync('tmp2/non-existing-directory/test.txt', 'test') instanceof Error)
  )
  it('readable', async () => {
    const stats = await statAsync('tmp3')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp3'), true)
    equal(await mkdirAsync('tmp3/read'), true)
    equal(await writeFileAsync('tmp3/read/test.txt', 'this is a test'), true)
    const content = await readFileAsync('tmp3/read/test.txt')
    assert(content instanceof Buffer)
    equal(content.toString(), 'this is a test')
    equal(await unlinkAsync('tmp3/read/test.txt'), true)
    equal(await rmdirAsync('tmp3/read'), true)
  })
  it('writeable', async () => {
    const stats = await statAsync('tmp4')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp4'), true)
    equal(await mkdirAsync('tmp4/write'), true)
    equal(await writeFileAsync('tmp4/write/test.txt', 'this is a test'), true)
    equal(await unlinkAsync('tmp4/write/test.txt'), true)
    equal(await rmdirAsync('tmp4/write'), true)
  })
})
