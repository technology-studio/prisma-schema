/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:08+02:00
 * @Copyright: Technology Studio
**/

export const processAutoRemove = (schema: string): string => (
  schema.replace(/[^\n]*\/\/\s*@auto-remove[^\n]*\n/gs, '')
)
