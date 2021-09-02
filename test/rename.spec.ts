import { mkdirAsync, renameAsync, rmdirAsync, statAsync } from '../src'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('rename', () => {
  it('successful', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/rename')).is.true
    expect(await mkdirAsync('tmp/rename/foo')).is.true
    expect(await renameAsync('tmp/rename/foo', 'tmp/rename/bar')).is.true
    expect(await rmdirAsync('tmp/rename/bar')).is.true
    expect(await rmdirAsync('tmp/rename')).is.true
  })
})
