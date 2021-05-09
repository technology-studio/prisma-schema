/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:77+02:00
 * @Copyright: Technology Studio
**/

import { processorFactory } from './ProcessorFactory'

import { getAttributeName } from './AttributeProcessor'

export const processAttributeRemove = processorFactory(
  '@attribute-remove',
  ({ entityContent, entityName, entityManipulatorContent }) => {
    const manipulatorAttributeList = entityManipulatorContent.split('\n')
    return entityContent.split('\n').reduce((nextContent, attribute) => {
      const attributeName = getAttributeName(attribute)
      if (attributeName) {
        const manipulatorAttribute = manipulatorAttributeList.find(
          manipulatorAttribute => getAttributeName(manipulatorAttribute) === attributeName,
        )
        if (manipulatorAttribute) {
          return nextContent
        }
      }
      return nextContent + (nextContent === '' ? '' : '\n') + attribute
    }, '')
  },
)
