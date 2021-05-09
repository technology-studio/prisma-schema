/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:27+02:00
 * @Copyright: Technology Studio
**/
import { processorFactory } from './ProcessorFactory'

export const processExtensions = processorFactory(
  '@extend',
  ({ entityManipulatorContent, entityContent }) => {
    return (
      entityContent +
      entityManipulatorContent
    )
  },
)
