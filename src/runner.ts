import { RuleRunner } from './types'
import { shouldSkipCheck } from './utils'

export const runner: RuleRunner = (schema, context) => {
  const { failFast } = context.config
  let runnerContext = context

  for (let i = 0; i < schema.rules.length; i++) {
    const rule = schema.rules[i]

    if (rule.canSkipCheck && shouldSkipCheck(runnerContext)) {
      continue
    }

    const nextContext = rule.func(runnerContext)

    if (failFast && nextContext.errors.length > 0) {
      return nextContext
    }

    runnerContext = nextContext
  }

  return runnerContext
}
