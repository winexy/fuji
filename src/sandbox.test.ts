import * as F from './index'

test('', () => {
  // const schema = F.fuji(
  //   F.shape({
  //     user: F.fuji(
  //       F.shape({
  //         name: F.fuji(
  //           F.includes('olz')
  //         ),
  //       })
  //     )
  //     // age: F.fuji(
  //     //   F.number()
  //     // )
  //   })
  // )
  const schema = F.fuji(F.includes('olz'))

  console.log(F.runWith(schema, 'kehas'))
})
