import { copyFileAsync, mkdirAsync, readdirAsync, rmAsync, rmdirAsync, statAsync, writeFileAsync } from '../src'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('copy', () => {
  it('copiable', async () => {
    const stats = await statAsync('tmp')
    if (stats instanceof Error)
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/copy')).is.true
    expect(await writeFileAsync('tmp/copy/foo', 'this is foo')).is.true
    expect(await copyFileAsync('tmp/copy/foo', 'tmp/copy/bar')).is.true
    const files = await readdirAsync('tmp/copy')
    expect(files).is.not.instanceOf(Error)
    if (files instanceof Error)
      return
    for (const name of files)
      expect(await rmAsync(`tmp/copy/${name}`)).is.true
    expect(await rmdirAsync('tmp/copy')).is.true
  })
})
