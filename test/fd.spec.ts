import assert, { equal } from 'node:assert'
import { closeAsync, fstatAsync, mkdirAsync, openAsync, rmdirAsync, unlinkAsync, writeFileAsync } from '../src/index.ts'
import { describe, it } from 'node:test'

describe('open-fstat-close', () => {
  it('open-fstat-close', async () => {
    await mkdirAsync('tmp23')
    equal(await mkdirAsync('tmp23/open'), true)
    equal(await writeFileAsync('tmp23/open/foo', 'this is foo'), true)
    const fd = await openAsync('tmp23/open/foo', 'r')
    assert(!(fd instanceof Error))
    assert(fd >= 0 )
    const stats = await fstatAsync(fd)
    assert(!(stats instanceof Error))
    assert(stats.isFile())
    const success = await closeAsync(fd)
    assert(!(success instanceof Error))
    equal(success, true)
    await unlinkAsync('tmp23/open/foo')
    await rmdirAsync('tmp23/open')
    await rmdirAsync('tmp23')
  })
})
