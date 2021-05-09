/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-09T10:05:94+02:00
 * @Copyright: Technology Studio
**/

export const getAttributeName = (attribute: string): string | null => (
  attribute.trim().match(/\w+/)?.[0] ?? null
)
