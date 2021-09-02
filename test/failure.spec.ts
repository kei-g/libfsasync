import { Stats } from 'fs'
import { chmodAsync, chownAsync, closeAsync, copyFileAsync, fstatAsync, lstatAsync, mkdirAsync, openAsync, readdirAsync, readlinkAsync, realpathAsync, rmAsync, rmdirAsync, statAsync, unlinkAsync } from '../src'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('failure', () => {
  it('chmodAsync', async () =>
    expect(await chmodAsync('tmp/non-existing-file', 0o777)).is.instanceOf(Error)
  )
  it('chmodAsync', async () =>
    expect(await chownAsync('tmp/non-existing-file', 0, 0)).is.instanceOf(Error)
  )
  it('closeAsync', async () => {
    await mkdirAsync('tmp')
    const fd = await openAsync('tmp/failure-closeAsync', 'w')
    expect(fd).to.be.not.an.instanceOf(Error)
    if (!(fd instanceof Error)) {
      expect(await closeAsync(fd)).to.be.true
      expect(await closeAsync(fd)).is.instanceOf(Error)
    }
    await unlinkAsync('tmp/failure-closeAsync')
    await rmdirAsync('tmp')
  })
  it('copyAsync', async () =>
    expect(await copyFileAsync('tmp/non-existing-file', 'tmp/zzz')).is.instanceOf(Error)
  )
  it('fstatAsync', async () => {
    await mkdirAsync('tmp')
    const fd = await openAsync('tmp/failure-fstatAsync', 'w')
    expect(fd).to.be.not.an.instanceOf(Error)
    if (!(fd instanceof Error)) {
      expect(await fstatAsync(fd)).to.satisfy((stats: Stats) => stats.isFile())
      expect(await closeAsync(fd)).to.be.true
      expect(await fstatAsync(fd)).is.instanceOf(Error)
    }
    await unlinkAsync('tmp/failure-fstatAsync')
    await rmdirAsync('tmp')
  })
  it('lstatAsync', async () =>
    expect(await lstatAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('mkdirAsync', async () =>
    expect(await mkdirAsync('tmp/non-existing-file/mkdir')).is.instanceOf(Error)
  )
  it('openAsync', async () =>
    expect(await openAsync('tmp/non-existing-file', 'r')).is.instanceOf(Error)
  )
  it('readdirAsync', async () =>
    expect(await readdirAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('readlinkAsync', async () =>
    expect(await readlinkAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('realpathAsync', async () =>
    expect(await realpathAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('rmAsync', async () =>
    expect(await rmAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('rmdirAsync', async () =>
    expect(await rmdirAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('statAsync', async () =>
    expect(await statAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('unlinkAsync', async () =>
    expect(await unlinkAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
})
