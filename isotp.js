const execa = require('execa')
const { config } = require('./package.json')
const {
  interfaceName,
  sourceId,
  destinationId
} = config

const isotpSend = async (serviceIdentifier, request) => {
  const subprocess = execa('isotpsend', [
    interfaceName,
    '-s', sourceId,
    '-d', destinationId,
    '-p', 'AA:AA'
  ])
  const formattedRequest = request.length ? request.toString('hex').match(/.{1,2}/g).join(' ').trim() : ''
  const formattedBody = `${serviceIdentifier.toString(16).padStart(2, '0')} ${formattedRequest}`
  subprocess.stdin.end(formattedBody.trim())
  await subprocess
}

module.exports = {
  isotpSend
}
