/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2022-08-21T13:08:66+02:00
 * @Copyright: Technology Studio
**/

module.exports = {
  branches: [
    'main',
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      present: 'conventionalcommits',
      releaseRules: [
        { breaking: true, release: 'major' },
        { revert: true, release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { scope: 'no-release', release: false },
      ],
    }],
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
      presetConfig: {
        types: [
          { type: 'build', section: 'Build system / dependencies' },
          { type: 'ci', section: 'CI' },
          { type: 'docs', section: 'Documentation' },
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug fixes' },
          { type: 'perf', section: 'Performance' },
          { type: 'refactor', section: 'Refactoring' },
          { type: 'test', section: 'Testing' },
        ],
      },
    }],
    ['semantic-release-slack-bot',
      {
        notifyOnSuccess: true,
        notifyOnFail: true,
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
    }],
  ],
}
