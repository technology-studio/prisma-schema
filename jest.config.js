/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-15T12:05:47+02:00
 * @Copyright: Technology Studio
**/

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json');

const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/__tests__/Tests/**/?(*.)(spec|test).ts'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@txo).+\\.js$'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFiles: [
    '<rootDir>/__tests__/Setup.ts'
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json'
    }]
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } ),
}
