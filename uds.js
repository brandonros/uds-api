const { isotpSend } = require('./isotp')
const emitter = require('./emitter')

const readDataByIdentifier = async (parameterIdentifier) => {
  await isotpSend(0x22, Buffer.from(parameterIdentifier, 'hex'))
  return new Promise(resolve => emitter.once(`readDataByIdentifier:${parameterIdentifier}`, resolve))
}

module.exports = {
  readDataByIdentifier
}
