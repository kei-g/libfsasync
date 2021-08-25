import { Stats } from 'fs'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { linkAsync, lstatAsync, mkdirAsync, rmAsync, rmdirAsync, statAsync, unlinkAsync, writeFileAsync } from '../src/lib/fs-async'

describe('link', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/link')).is.true
    expect(await writeFileAsync('tmp/link/foo', 'this is foo')).is.true
    expect(await linkAsync('tmp/link/foo', 'tmp/link/bar')).is.true
    const lstats = await lstatAsync('tmp/link/bar')
    expect(lstats).is.not.instanceOf(Error)
    if (lstats instanceof Stats)
      expect(lstats.isSymbolicLink()).is.false
    expect(await unlinkAsync('tmp/link/bar')).is.true
    expect(await rmAsync('tmp/link/foo')).is.true
    expect(await rmdirAsync('tmp/link')).is.true
  })
  it('not linkable', async () =>
    expect(await linkAsync('tmp/link/non-existing-file', 'tmp/link/zzz')).is.instanceOf(Error)
  )
})
