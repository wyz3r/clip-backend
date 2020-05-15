import express from 'express'
import { appRouter } from './app/routes/routes'
import { appRouterNew } from './app/routes/graphRoutes'

// import {cassInsertDB, cassSelectDB} from './app/db/dbConsult'

import bodyParser from 'body-parser'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, filters, especificwave')
  next()
})
app.use(express.json({limit: '50mb'}))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  console.log('hello clip backend ')
  res.status(200).send('hello clip backend')
})

app.listen(8081, () => {
  logger.info(`listening in port ${8081}`)
})

app.use(appRouter)
app.use(appRouterNew)

export default app
