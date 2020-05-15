import {cassInsertDB} from '../db/dbConsult'

export const insertData = (arreglo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await cassInsertDB('INSERT INTO autodashboard.informantes (project_id, informante_id, answers ) VALUES (?, ?, ?);', ['abf9e83c-8c34-11e8-8353-d1580c01fad8', arreglo['idRegister'], JSON.stringify(arreglo)])
      resolve()
    } catch (error) {
      console.log('error getQuestions')
      reject(error)
    }
  })
}
