import assert, { equal } from 'node:assert'
import { describe, it } from 'mocha'
import { lstatAsync, mkdirAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src'

describe('symlink', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp'), true)
    equal(await mkdirAsync('tmp/symlink'), true)
    equal(await writeFileAsync('tmp/symlink/foo', 'this is foo'), true)
    equal(await symlinkAsync('tmp/symlink/foo', 'tmp/symlink/bar', 'file'), true)
    const l = await lstatAsync('tmp/symlink/bar')
    assert(!(l instanceof Error))
    equal(l.isSymbolicLink(), true)
    equal(await unlinkAsync('tmp/symlink/bar'), true)
    equal(await rmAsync('tmp/symlink/foo'), true)
    equal(await rmdirAsync('tmp/symlink'), true)
  })
  it('not linkable', async () =>
    assert(await symlinkAsync('tmp/link/non-existing-file', 'tmp/link/zzz', 'file') instanceof Error)
  )
})
