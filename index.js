const split = require('split')
const express = require('express')
const { readDataByIdentifier } = require('./uds')

const initServer = () => {
  const app = express()
  const port = process.env.PORT || 3000
  app.get('/uds/:pid', async (req, res) => {
    try {
      res.end(await readDataByIdentifier(req.params.pid))
    } catch (err) {
      res.status(500).send(err.stack)
    }
  })
  app.listen(port, () => console.log('Listening...'))
}

const initMessageHandler = () => {
  const handleMessage = (data) => {
    data = Buffer.from(data.replace(/ /g, ''), 'hex')
    const serviceIdentifier = data[0]
    if (serviceIdentifier === 0x62) {
      const pid = data.slice(1, 3).toString('hex')
      const value = data.slice(3).toString('hex')
      emitter.emit(`readDataByIdentifier:${pid}`, value)
    }
  }
  process.stdin
    .pipe(split())
    .on('data', handleMessage)
}

initMessageHandler()
initServer()
