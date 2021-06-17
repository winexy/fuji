import type { Fuji, RuleType } from '../types'
import { Rule } from '../types'

export function excludeRules<
  Value,
  ExistingRules extends RuleType,
  RulesToExclude extends ExistingRules
>(
  schema: Fuji<ExistingRules, Value>,
  rulesToExclude: RulesToExclude[]
): Fuji<Exclude<ExistingRules, RulesToExclude>, Value> {
  const set = new Set(rulesToExclude)
  // @ts-expect-error
  const rules = schema.rules.filter(rule => !set.has(rule.type))

  return {
    rules: rules as Rule<Exclude<ExistingRules, RulesToExclude>, Value>[]
  }
}
