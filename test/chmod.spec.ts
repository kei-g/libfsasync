import { chmodAsync, mkdirAsync, rmdirAsync } from '../src'
import { describe, it } from 'mocha'
import { existsSync } from 'fs'
import { expect } from 'chai'

describe('chmod', () => {
  it('successful', async () => {
    if (!existsSync('tmp'))
      expect(await mkdirAsync('tmp')).is.true
    expect(await mkdirAsync('tmp/chmod')).is.true
    expect(await chmodAsync('tmp/chmod', 0o777)).is.true
    expect(await rmdirAsync('tmp/chmod')).is.true
  })
})
