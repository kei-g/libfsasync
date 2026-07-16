import assert, { equal } from 'node:assert'
import { describe, it } from 'node:test'
import { linkAsync, lstatAsync, mkdirAsync, readlinkAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src/index.ts'

describe('link', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp24')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp24'), true)
    equal(await mkdirAsync('tmp24/link'), true)
    equal(await writeFileAsync('tmp24/link/foo', 'this is foo'), true)
    equal(await linkAsync('tmp24/link/foo', 'tmp24/link/bar'), true)
    const l = await lstatAsync('tmp24/link/bar')
    assert(!(l instanceof Error))
    equal(l.isSymbolicLink(), false)
    equal(await unlinkAsync('tmp24/link/bar'), true)
    equal(await rmAsync('tmp24/link/foo'), true)
    equal(await rmdirAsync('tmp24/link'), true)
  })
  it('not linkable', async () =>
    assert(await linkAsync('tmp25/link/non-existing-file', 'tmp25/link/zzz') instanceof Error)
  )
})

describe('readlink', () => {
  it('readlinkAsync', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp26'), true)
    equal(await mkdirAsync('tmp26/read-link'), true)
    equal(await mkdirAsync('tmp26/read-link/foo'), true)
    equal(await writeFileAsync('tmp26/read-link/foo/bar', 'this is foo/bar\n'), true)
    assert(!(await symlinkAsync('../foo/bar', 'tmp26/read-link/bar', 'file') instanceof Error))
    const link = await readlinkAsync('tmp26/read-link/bar')
    assert(!(link instanceof Error))
    equal(await unlinkAsync('tmp26/read-link/foo/bar'), true)
    equal(await rmdirAsync('tmp26/read-link/foo'), true)
    equal(await unlinkAsync('tmp26/read-link/bar'), true)
    equal(await rmdirAsync('tmp26/read-link'), true)
  })
})
