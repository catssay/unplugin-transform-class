export const defaultRules: Record<string, string> = {
  '.': '-d-',
  '/': '-s-',
  ':': '-c-',
  '%': '-p-',
  '!': '-e-',
  '#': '-w-',
  '(': '-bl-',
  ')': '-br-',
  '[': '-fl-',
  ']': '-fr-',
  '$': '-r-',
}

const transformRegExp = /[\.\/:%!#\(\)\[\]$]/

const escapePrefix = '\\'

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function transformSelector(selector: string, rules = defaultRules) {
  if (transformRegExp.test(selector)) {
    for (const transformRule in rules) {
      const replaceReg = new RegExp(`${escapePrefix}${transformRule}`, 'g')
      selector = selector.replace(replaceReg, rules[transformRule])
    }
  }

  return selector
}

export function transformEscapESelector(selector: string, rules = defaultRules) {
  // .bg-\[\#452233\]\:50 => .bg--fl--w-452233-fr--c-40-c-50
  if (transformRegExp.test(selector)) {
    for (const transformRule in rules) {
      const replaceReg = new RegExp(escapeRegExp(`${escapePrefix}${transformRule}`), 'g')
      selector = selector.replace(replaceReg, rules[transformRule])
    }
  }

  return selector
}

export function restoreSelector(selector: string, rules = defaultRules) {
  for (const transformRule in rules) {
    const replaceReg = new RegExp(rules[transformRule], 'g')
    selector = selector.replace(replaceReg, transformRule)
  }
  return selector
}
