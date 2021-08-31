import { Stats } from 'fs'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { lstatAsync, mkdirAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src'

describe('symlink', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/symlink')).is.true
    expect(await writeFileAsync('tmp/symlink/foo', 'this is foo')).is.true
    expect(await symlinkAsync('tmp/symlink/foo', 'tmp/symlink/bar', 'file')).is.true
    const lstats = await lstatAsync('tmp/symlink/bar')
    expect(lstats).is.not.instanceOf(Error)
    if (lstats instanceof Stats)
      expect(lstats.isSymbolicLink()).is.true
    expect(await unlinkAsync('tmp/symlink/bar')).is.true
    expect(await rmAsync('tmp/symlink/foo')).is.true
    expect(await rmdirAsync('tmp/symlink')).is.true
  })
  it('not linkable', async () =>
    expect(await symlinkAsync('tmp/link/non-existing-file', 'tmp/link/zzz', 'file')).is.instanceOf(Error)
  )
})
