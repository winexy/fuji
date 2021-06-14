import { Rule } from '../types'

export type MapType = 'map'

export const map = <A, B>(f: (a: A) => B): Rule<MapType, A, B> => ({
  type: 'map',
  func: ctx => ({
    ...ctx,
    current: f(ctx.current)
  })
})
