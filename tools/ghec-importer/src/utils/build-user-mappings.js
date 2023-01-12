module.exports = (migration, userMappings) => {
  let mappings = userMappings
    .map(mapping => {
      if (mapping) {
        mapping = mapping.split(',')

        const sourceUrl = mapping[0].startsWith('http') ? mapping[0] : `${migration.userMappingsSourceUrl}/${mapping[0]}`
        const targetUrl = mapping[1].startsWith('http') ? mapping[1] : `https://github.com/${mapping[1]}`

        return `{
        modelName: "user",
        sourceUrl: "${sourceUrl}",
        targetUrl: "${targetUrl}",
        action: MAP
      }`
      }
    })
    .join(',')
  mappings = '[' + mappings + ']'

  return mappings
}
