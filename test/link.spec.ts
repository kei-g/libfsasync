import assert, { equal } from 'node:assert'
import { describe, it } from 'mocha'
import { linkAsync, lstatAsync, mkdirAsync, readlinkAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src'

describe('link', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/link'), true)
    equal(await writeFileAsync('tmp/link/foo', 'this is foo'), true)
    equal(await linkAsync('tmp/link/foo', 'tmp/link/bar'), true)
    const l = await lstatAsync('tmp/link/bar')
    assert(!(l instanceof Error))
    equal(l.isSymbolicLink(), false)
    equal(await unlinkAsync('tmp/link/bar'), true)
    equal(await rmAsync('tmp/link/foo'), true)
    equal(await rmdirAsync('tmp/link'), true)
  })
  it('not linkable', async () =>
    assert(await linkAsync('tmp/link/non-existing-file', 'tmp/link/zzz') instanceof Error)
  )
})

describe('readlink', () => {
  it('readlinkAsync', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/read-link'), true)
    equal(await mkdirAsync('tmp/read-link/foo'), true)
    equal(await writeFileAsync('tmp/read-link/foo/bar', 'this is foo/bar\n'), true)
    assert(!(await symlinkAsync('../foo/bar', 'tmp/read-link/bar', 'file') instanceof Error))
    const link = await readlinkAsync('tmp/read-link/bar')
    assert(!(link instanceof Error))
    equal(await unlinkAsync('tmp/read-link/foo/bar'), true)
    equal(await rmdirAsync('tmp/read-link/foo'), true)
    equal(await unlinkAsync('tmp/read-link/bar'), true)
    equal(await rmdirAsync('tmp/read-link'), true)
  })
})
