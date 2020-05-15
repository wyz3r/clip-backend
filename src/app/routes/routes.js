import { Router } from 'express'
import { getQuestions, addquestion, archiveQuestion } from '../modules/questions'
import { getRoleUser } from '../modules/users'
import { insertData } from '../modules/informantes'

import Promise from 'bluebird'
import {parseUser} from './helpers'
export const appRouter = Router()

// add question endpoints
appRouter.post('/addquestion', async (req, res) => {
  const {payload} = req.body
  try {
    await addquestion(payload)
    const allQuestions = await getQuestions()
    res.json(allQuestions)
    // res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

// pruebas
appRouter.get('/getquestions', async (req, res) => {
  try {
    const obQuestions = await getQuestions()
    res.json(obQuestions)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouter.get('/archivequestion', async (req, res) => {
  try {
    await archiveQuestion()
    const obQuestions = await getQuestions()
    res.json(obQuestions)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouter.post('/validatelogin', async (req, res) => {
  try {
    console.log(req.body)
    const {idToken} = req.body
    const algo = await parseUser(idToken)
    console.log(algo.email)
    const role = await getRoleUser(algo.email)
    res.json({role})
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouter.post('/saveinformantes', async (req, res) => {
  try {
    const {header, tbody} = req.body
    // console.log(year + '-' + mes + '-' + tbody[0][0])
    let newObjectArray = []
    tbody.forEach((fila, bodyIndex) => {
      const obj = {}
      header.forEach((head, headIndex) => {
        obj[head] = fila[headIndex]
        // if (headIndex === 0) obj[head] = year + mes + fila[headIndex]
        if (headIndex === 0) obj['idRegister'] = fila[1] + '-' + fila[0]
      })
      // obj['ola'] = year + mes
      newObjectArray.push(obj)
    })

    Promise.map(
      newObjectArray,
      async (newObjectArray) => {
        // console.log(newObjectArray['Response ID'])
        await insertData(newObjectArray)
        return newObjectArray
      },
      {concurrency: 5}
    )
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})
