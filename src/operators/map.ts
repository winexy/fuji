import { VFunc } from '../types'

export const map = <A, B>(f: (a: A) => B): VFunc<A, B> => {
  return function MapFunc(ctx) {
    const next = f(ctx.current)
    
    return {
      ...ctx,
      current: next,
      result: next
    }
  }
}
