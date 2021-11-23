const checkStatus = require('../queries/check-status')
const sleep = require('./sleep')
const Logger = require('../utils/logger')

module.exports = async (migration, status) => {
  const logger = new Logger(migration)

  let state
  let checks = 0

  do {
    if (checks > 0) {
      logger.sleep(10)
      await sleep(10)
    }

    state = await checkStatus(migration)

    logger.state(state)

    checks++
  } while (!status.includes(state))

  return state
}
