import { Stats } from 'fs'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { linkAsync, lstatAsync, mkdirAsync, readlinkAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src'

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

describe('readlink', () => {
  it('readlinkAsync', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/read-link')).is.true
    expect(await mkdirAsync('tmp/read-link/foo')).is.true
    expect(await writeFileAsync('tmp/read-link/foo/bar', 'this is foo/bar\n')).is.true
    expect(await symlinkAsync('../foo/bar', 'tmp/read-link/bar', 'file')).to.be.not.instanceOf(Error)
    const link = await readlinkAsync('tmp/read-link/bar')
    expect(link).to.be.not.instanceOf(Error)
    expect(await unlinkAsync('tmp/read-link/foo/bar')).is.true
    expect(await rmdirAsync('tmp/read-link/foo')).is.true
    expect(await unlinkAsync('tmp/read-link/bar')).is.true
    expect(await rmdirAsync('tmp/read-link')).is.true
  })
})
