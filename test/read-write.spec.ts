import { describe, it } from 'mocha'
import { expect } from 'chai'
import { mkdirAsync, readFileAsync, rmdirAsync, statAsync, unlinkAsync, writeFileAsync } from '../src/lib/fs-async'

describe('read-write', () => {
  it('not readable', async () =>
    expect(await readFileAsync('tmp/non-existing-directory/test.txt'))
      .instanceOf(Error)
  )
  it('not writable', async () =>
    expect(await writeFileAsync('tmp/non-existing-directory/test.txt', 'test'))
      .instanceOf(Error)
  )
  it('readable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/read')).is.true
    expect(await writeFileAsync('tmp/read/test.txt', 'this is a test')).is.true
    const content = await readFileAsync('tmp/read/test.txt')
    expect(content).instanceOf(Buffer)
    expect(content.toString()).equals('this is a test')
    expect(await unlinkAsync('tmp/read/test.txt')).is.true
    expect(await rmdirAsync('tmp/read')).is.true
  })
  it('writeable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/write')).is.true
    expect(await writeFileAsync('tmp/test.txt', 'this is a test')).is.true
    expect(await unlinkAsync('tmp/test.txt')).is.true
    expect(await rmdirAsync('tmp/write')).is.true
  })
})
