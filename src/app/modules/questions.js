import {cassSelectDB, cassInsertDB} from '../db/dbConsult'

export const getQuestions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allQuestions = await cassSelectDB('SELECT * FROM autodashboard.questions where project_id = ?', ['abf9e83c-8c34-11e8-8353-d1580c01fad8'])
      const filtro = allQuestions.map((e) => {
        return {
          'clave': e.questions_id,
          'titulo': e.title,
          'tipo': e.type,
          'opciones': JSON.parse(e.opciones).length !== 0 ? JSON.parse(e.opciones) : [],
          'relevancia': e.relevancia
        }
      }
      )
      resolve(filtro)
    } catch (error) {
      console.log('error getQuestions')
      reject(error)
    }
  })
}

export const addquestion = (payload) => {
  return new Promise(async (resolve, reject) => {
    const {clave, titulo, opciones, tipo, relevancia} = payload
    try {
      const queryInsert = 'INSERT INTO autodashboard.questions (project_id, questions_id, title, type, opciones, relevancia ) VALUES (?, ?, ?, ?, ?, ?)'
      await cassInsertDB(queryInsert, ['abf9e83c-8c34-11e8-8353-d1580c01fad8', clave.toUpperCase(), titulo, tipo, JSON.stringify(opciones), relevancia])
      resolve()
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export const archiveQuestion = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryArchive = 'INSERT INTO autodashboard.questions (project_id, questions_id, archive ) VALUES (?, ?, ?)'
      await cassInsertDB(queryArchive, ['abf9e83c-8c34-11e8-8353-d1580c01fad8', 'f6', true])
      resolve()
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
