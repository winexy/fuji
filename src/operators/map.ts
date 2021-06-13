import { Rule } from '../types'

export const map = <A, B>(f: (a: A) => B): Rule<A, B> => {
  return function MapFunc(ctx) {
    return {
      ...ctx,
      current: f(ctx.current)
    }
  }
}
