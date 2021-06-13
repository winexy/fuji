import { RuleRunner } from './types'

export const runner: RuleRunner = (schema, context) => {
  const { failFast } = context.config
  let runnerContext = context

  for (let i = 0; i < schema.rules.length; i++) {
    const rule = schema.rules[i]
    const nextContext = rule(runnerContext)

    if (failFast && nextContext.errors.length > 0) {
      return nextContext
    }

    runnerContext = nextContext
  }

  return runnerContext
}
