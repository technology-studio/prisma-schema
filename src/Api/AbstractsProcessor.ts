/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-08T19:05:48+02:00
 * @Copyright: Technology Studio
**/

export const processAbstracts = (schema: string): string => (
  schema.replace(/[^\n]*\/\/\s*@abstract[^}]*}[^\n]*\n\n*/gs, '')
)
