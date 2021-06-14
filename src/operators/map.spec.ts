import { map } from './map'
import { string } from '../rules/string'
import { int } from '../rules/int'
import { f, run } from '..'

describe('operators.map', () => {
  it('should correctly map value between types', () => {
    const schema = f(
      string(),
      map(x => parseInt(x)),
      int()
    )

    const { errors } = run(schema, '42test')

    expect(errors).toBeNull()
  })
})
