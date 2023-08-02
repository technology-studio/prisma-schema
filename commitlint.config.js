/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2022-08-21T12:08:59+02:00
 * @Copyright: Technology Studio
**/

const automaticCommitPattern = /^chore\(release\):.*\[skip ci]/

const commitlintConfig = {
  extends: [
    '@commitlint/config-conventional',
  ],

  ignores: [
    commitMsg => automaticCommitPattern.test(commitMsg),
  ],
}

module.exports = commitlintConfig
