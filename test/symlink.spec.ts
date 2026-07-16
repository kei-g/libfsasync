import assert, { equal } from 'node:assert'
import { describe, it } from 'node:test'
import { lstatAsync, mkdirAsync, rmAsync, rmdirAsync, statAsync, symlinkAsync, unlinkAsync, writeFileAsync } from '../src/index.ts'

describe('symlink', () => {
  it('linkable', async () => {
    const stats = await statAsync('tmp28')
    if (stats instanceof Error)
      equal(await mkdirAsync('tmp28'), true)
    equal(await mkdirAsync('tmp28/symlink'), true)
    equal(await writeFileAsync('tmp28/symlink/foo', 'this is foo'), true)
    equal(await symlinkAsync('tmp28/symlink/foo', 'tmp28/symlink/bar', 'file'), true)
    const l = await lstatAsync('tmp28/symlink/bar')
    assert(!(l instanceof Error))
    equal(l.isSymbolicLink(), true)
    equal(await unlinkAsync('tmp28/symlink/bar'), true)
    equal(await rmAsync('tmp28/symlink/foo'), true)
    equal(await rmdirAsync('tmp28/symlink'), true)
  })
  it('not linkable', async () =>
    assert(await symlinkAsync('tmp29/link/non-existing-file', 'tmp29/link/zzz', 'file') instanceof Error)
  )
})
