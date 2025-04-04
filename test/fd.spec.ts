import assert, { equal } from 'node:assert'
import { closeAsync, fstatAsync, mkdirAsync, openAsync, rmdirAsync, unlinkAsync, writeFileAsync } from '../src'
import { describe, it } from 'mocha'

describe('open-fstat-close', () => {
  it('open-fstat-close', async () => {
    await mkdirAsync('tmp')
    equal(await mkdirAsync('tmp/open'), true)
    equal(await writeFileAsync('tmp/open/foo', 'this is foo'), true)
    const fd = await openAsync('tmp/open/foo', 'r')
    assert(!(fd instanceof Error))
    assert(0 <= fd)
    const stats = await fstatAsync(fd)
    assert(!(stats instanceof Error))
    assert(stats.isFile())
    const success = await closeAsync(fd)
    assert(!(success instanceof Error))
    equal(success, true)
    await unlinkAsync('tmp/open/foo')
    await rmdirAsync('tmp/open')
    await rmdirAsync('tmp')
  })
})
