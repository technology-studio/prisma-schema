/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-03-26T06:03:02+01:00
 * @Copyright: Technology Studio
**/

import {
  configManager,
  Level,
} from '@txo-peer-dep/log'
import * as ConsoleLogger from '@txo/log-console'
// import * as ReactotronLogger from '@txo/log-reactotron'

configManager.update({
  loggerConfigMap: {
    [ConsoleLogger.LOGGER_KEY]: {
      writeLog: ConsoleLogger.writeLog,
      nodeEnvironmentList: ['production', 'development'],
    },
    // [ReactotronLogger.LOGGER_KEY]: {
    //   writeLog: ReactotronLogger.writeLog,
    //   nodeEnvironmentList: ['development'],
    // },
  },
  defaultLevelForNodeEnvironmentMap: {
    production: Level.ERROR,
    development: Level.INFO,
  },
  levelOverride: {
    level: Level.DEBUG,
    namespacePatternList: [
      // '@txo.data-table.src.Api.TableProxy',
    ],
  },
})
