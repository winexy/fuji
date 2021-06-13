import { map } from './map'
import { string } from '../rules/string'
import { int } from '../rules/int'
import { fuji, runWith } from '..'

describe('operators.map', () => {
  it('should correctly map value between types', () => {
    const schema = fuji(
      string(),
      map(x => parseInt(x)),
      int()
    )

    const errors = runWith(schema, '42test')

    expect(errors).toBeEmpty()
  })
})
