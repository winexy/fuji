import { Rule } from '../types'

export type MapType = 'fmap'

export const fmap = <A, B>(f: (a: A) => B): Rule<MapType, A, B> => ({
  type: 'fmap',
  func: ctx => ({
    ...ctx,
    current: f(ctx.current)
  })
})
