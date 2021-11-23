module.exports = (migration, userMappings) => {
  let mappings = userMappings
    .map(mapping => {
      if (mapping) {
        mapping = mapping.split(',')

        return `{
        modelName: "user",
        sourceUrl: "${migration.userMappingsSourceUrl}/${mapping[0]}",
        targetUrl: "https://github.com/${mapping[1]}",
        action: MAP
      }`
      }
    })
    .join(',')
  mappings = '[' + mappings + ']'

  return mappings
}
