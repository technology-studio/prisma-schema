/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T14:05:01+02:00
 * @Copyright: Technology Studio
**/

import yargs from 'yargs'

import { processCommand } from '../Commands/ProcessCommand'

yargs
  .usage('Usage: $0 <command> [options]\n\nPrima schema client tools.')
  .command(processCommand)
  .demandCommand()
  .recommendCommands()
  .strict()
  .help()
  .wrap(yargs.terminalWidth())
  .parse()
