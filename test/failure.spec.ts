import assert, { equal } from 'node:assert'
import { chmodAsync, chownAsync, closeAsync, copyFileAsync, fstatAsync, lstatAsync, mkdirAsync, openAsync, readdirAsync, readlinkAsync, realpathAsync, renameAsync, rmAsync, rmdirAsync, statAsync, unlinkAsync } from '../src/index.ts'
import { describe, it } from 'node:test'

describe('failure', () => {
  it('chmodAsync', async () =>
    assert(await chmodAsync('tmp7/non-existing-file', 0o777) instanceof Error)
  )
  it('chmodAsync', async () =>
    assert(await chownAsync('tmp8/non-existing-file', 0, 0) instanceof Error)
  )
  it('closeAsync', async () => {
    await mkdirAsync('tmp9')
    const fd = await openAsync('tmp9/failure-closeAsync', 'w')
    assert(!(fd instanceof Error))
    equal(await closeAsync(fd), true)
    assert(await closeAsync(fd) instanceof Error)
    await unlinkAsync('tmp9/failure-closeAsync')
    await rmdirAsync('tmp9')
  })
  it('copyAsync', async () =>
    assert(await copyFileAsync('tmp10/non-existing-file', 'tmp10/zzz') instanceof Error)
  )
  it('fstatAsync', async () => {
    await mkdirAsync('tmp11')
    const fd = await openAsync('tmp11/failure-fstatAsync', 'w')
    assert(!(fd instanceof Error))
    const stat = await fstatAsync(fd)
    assert(!(stat instanceof Error))
    assert(stat.isFile())
    equal(await closeAsync(fd), true)
    assert(await fstatAsync(fd) instanceof Error)
    await unlinkAsync('tmp11/failure-fstatAsync')
    await rmdirAsync('tmp11')
  })
  it('lstatAsync', async () =>
    assert(await lstatAsync('tmp12/non-existing-file') instanceof Error)
  )
  it('mkdirAsync', async () =>
    assert(await mkdirAsync('tmp13/non-existing-file/mkdir') instanceof Error)
  )
  it('openAsync', async () =>
    assert(await openAsync('tmp14/non-existing-file', 'r') instanceof Error)
  )
  it('readdirAsync', async () =>
    assert(await readdirAsync('tmp15/non-existing-file') instanceof Error)
  )
  it('readlinkAsync', async () =>
    assert(await readlinkAsync('tmp16/non-existing-file') instanceof Error)
  )
  it('realpathAsync', async () =>
    assert(await realpathAsync('tmp17/non-existing-file') instanceof Error)
  )
  it('renameAsync', async () =>
    assert(await renameAsync('tmp18/non-existing-file', 'tmp18/foo') instanceof Error)
  )
  it('rmAsync', async () =>
    assert(await rmAsync('tmp19/non-existing-file') instanceof Error)
  )
  it('rmdirAsync', async () =>
    assert(await rmdirAsync('tmp20/non-existing-file') instanceof Error)
  )
  it('statAsync', async () =>
    assert(await statAsync('tmp21/non-existing-file') instanceof Error)
  )
  it('unlinkAsync', async () =>
    assert(await unlinkAsync('tmp22/non-existing-file') instanceof Error)
  )
})
