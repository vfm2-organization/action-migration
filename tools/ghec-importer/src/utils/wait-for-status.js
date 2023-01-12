const checkStatus = require('../queries/check-status')
const sleep = require('./sleep')
const Logger = require('../utils/logger')

module.exports = async (migration, status) => {
  const waitTimes = [10, 5, 20, 30, 45, 60, 120, 150]
  const logger = new Logger(migration)

  let state
  let checks = 0

  do {
    if (checks > 0) {
      // The first time is smaller intentionally. Hence counter starts at 1.
      const sleepTime = waitTimes[checks % waitTimes.length]

      logger.sleep(sleepTime)
      await sleep(sleepTime)
    }

    state = await checkStatus(migration)

    logger.state(state)

    checks++
  } while (!status.includes(state))

  return state
}
