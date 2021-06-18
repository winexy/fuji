import { fmap } from './fmap'
import { string } from '../rules/string'
import { int } from '../rules/int'
import { f, run } from '..'

describe('operators.map', () => {
  it('should correctly fmap value between types', () => {
    const schema = f(
      string(),
      fmap(x => parseInt(x)),
      int()
    )

    const { errors } = run(schema, '42test')

    expect(errors).toBeNull()
  })
})
