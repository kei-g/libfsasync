import { chmodAsync, chownAsync, copyFileAsync, lstatAsync, mkdirAsync, readdirAsync, rmAsync, rmdirAsync, statAsync, unlinkAsync } from '../src/lib/fs-async'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('failure', () => {
  it('chmodAsync', async () =>
    expect(await chmodAsync('tmp/non-existing-file', 0o777)).is.instanceOf(Error)
  )
  it('chmodAsync', async () =>
    expect(await chownAsync('tmp/non-existing-file', 0, 0)).is.instanceOf(Error)
  )
  it('copyAsync', async () =>
    expect(await copyFileAsync('tmp/non-existing-file', 'tmp/zzz')).is.instanceOf(Error)
  )
  it('lstatAsync', async () =>
    expect(await lstatAsync('tmp/non-existing-file')).is.instanceOf(Error)
  )
  it('mkdirAsync', async () =>
    expect(await mkdirAsync('tmp/non-existing-file/mkdir')).is.instanceOf(Error)
  )
  it('readdirAsync', async () =>
    expect(await readdirAsync('tmp/non-existing-file')).is.instanceOf(Error)
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
