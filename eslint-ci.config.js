const ciRules = require('./eslint-ci-rules.json')

module.exports = (async function config() {
  const { default: defaultConfigPromise } = await import('./eslint.config.js')
  const defaultConfig = await defaultConfigPromise
  return [
    ...defaultConfig,
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: ciRules.reduce((acc, rule) => ({ ...acc, [rule]: 'warn' }), {}),
    },
  ]
})()
