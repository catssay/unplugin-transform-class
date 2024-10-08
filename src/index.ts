import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import { transformCode } from './core'

export default createUnplugin((options?: Options) => {
  const rules = options?.rules
  const classNameMatcher = options?.classNameMatcher ?? 'class'

  const filter = createFilter(
    options?.include || [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
    options?.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
  )

  return {
    name: 'unplugin-transform-class',
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    transform(code) {
      return transformCode(code, rules, classNameMatcher)
    },
  }
})
