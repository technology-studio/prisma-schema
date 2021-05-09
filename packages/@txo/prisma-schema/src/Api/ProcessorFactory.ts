/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-09T08:05:92+02:00
 * @Copyright: Technology Studio
**/

type ProcessorAttributes = {
  schema: string,
  entityType: string,
  entityName: string,
  entityContent: string,
  entityManipulatorContent: string,
}

export const processorFactory = (
  keyword: string,
  contentProcessor: (attributes: ProcessorAttributes) => string,
) => (schema: string): string => {
  const manipulatorsRegExp = new RegExp(`[^\n]*${keyword}[^}]*\\}`, 'gs')
  const manipulators = schema.match(manipulatorsRegExp) ?? []
  manipulators.forEach((manipulator) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const groups = manipulator.match(
      /\s*(?<entityType>\w*)\s*(?<entityName>\w*)\s*\{[^\n]*\n*(?<entityManipulatorContent>[^}]*)\n*\}/,
    )!.groups!
    const { entityType, entityName, entityManipulatorContent } = groups
    const entityToManipulateRegExp = new RegExp(
      `(?<entitySignature>[^\n]*${entityType}\\s*${entityName}[^{]*\\{[^\n]*\n)(?<entityContent>[^}]*)\\}`,
    )
    schema = schema.replace(entityToManipulateRegExp, (...args): string => {
      const { entitySignature, entityContent } = args[args.length - 1]
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      return entitySignature + contentProcessor({
        schema,
        entityContent,
        entityManipulatorContent,
        entityName,
        entityType,
      }) + '}'
    })
  })

  const manipulatorsRemovalRegExp = new RegExp(`\n+[^\n]*${keyword}[^\n]*[^{]*[^}]*\\}\n+`, 'g')
  schema = schema.replace(manipulatorsRemovalRegExp, '\n\n')

  return schema
}
