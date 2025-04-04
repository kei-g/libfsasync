import assert, { equal } from 'node:assert'
import { chmodAsync, chownAsync, closeAsync, copyFileAsync, fstatAsync, lstatAsync, mkdirAsync, openAsync, readdirAsync, readlinkAsync, realpathAsync, renameAsync, rmAsync, rmdirAsync, statAsync, unlinkAsync } from '../src'
import { describe, it } from 'mocha'

describe('failure', () => {
  it('chmodAsync', async () =>
    assert(await chmodAsync('tmp/non-existing-file', 0o777) instanceof Error)
  )
  it('chmodAsync', async () =>
    assert(await chownAsync('tmp/non-existing-file', 0, 0) instanceof Error)
  )
  it('closeAsync', async () => {
    await mkdirAsync('tmp')
    const fd = await openAsync('tmp/failure-closeAsync', 'w')
    assert(!(fd instanceof Error))
    equal(await closeAsync(fd), true)
    assert(await closeAsync(fd) instanceof Error)
    await unlinkAsync('tmp/failure-closeAsync')
    await rmdirAsync('tmp')
  })
  it('copyAsync', async () =>
    assert(await copyFileAsync('tmp/non-existing-file', 'tmp/zzz') instanceof Error)
  )
  it('fstatAsync', async () => {
    await mkdirAsync('tmp')
    const fd = await openAsync('tmp/failure-fstatAsync', 'w')
    assert(!(fd instanceof Error))
    const stat = await fstatAsync(fd)
    assert(!(stat instanceof Error))
    assert(stat.isFile())
    equal(await closeAsync(fd), true)
    assert(await fstatAsync(fd) instanceof Error)
    await unlinkAsync('tmp/failure-fstatAsync')
    await rmdirAsync('tmp')
  })
  it('lstatAsync', async () =>
    assert(await lstatAsync('tmp/non-existing-file') instanceof Error)
  )
  it('mkdirAsync', async () =>
    assert(await mkdirAsync('tmp/non-existing-file/mkdir') instanceof Error)
  )
  it('openAsync', async () =>
    assert(await openAsync('tmp/non-existing-file', 'r') instanceof Error)
  )
  it('readdirAsync', async () =>
    assert(await readdirAsync('tmp/non-existing-file') instanceof Error)
  )
  it('readlinkAsync', async () =>
    assert(await readlinkAsync('tmp/non-existing-file') instanceof Error)
  )
  it('realpathAsync', async () =>
    assert(await realpathAsync('tmp/non-existing-file') instanceof Error)
  )
  it('renameAsync', async () =>
    assert(await renameAsync('tmp/non-existing-file', 'tmp/foo') instanceof Error)
  )
  it('rmAsync', async () =>
    assert(await rmAsync('tmp/non-existing-file') instanceof Error)
  )
  it('rmdirAsync', async () =>
    assert(await rmdirAsync('tmp/non-existing-file') instanceof Error)
  )
  it('statAsync', async () =>
    assert(await statAsync('tmp/non-existing-file') instanceof Error)
  )
  it('unlinkAsync', async () =>
    assert(await unlinkAsync('tmp/non-existing-file') instanceof Error)
  )
})
