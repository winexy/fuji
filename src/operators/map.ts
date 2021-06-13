import { VFunc } from '../types'

export const map = <A, B>(f: (a: A) => B): VFunc<A, B> => {
  return function MapFunc(ctx) {
    return {
      ...ctx,
      current: f(ctx.current)
    }
  }
}
