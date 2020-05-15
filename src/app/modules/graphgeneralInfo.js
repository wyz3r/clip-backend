import {cassSelectDB} from '../db/dbConsult'

export const getAllInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allInformantes = await cassSelectDB('select * from autodashboard.informantes where project_id = ?', ['abf9e83c-8c34-11e8-8353-d1580c01fad8'])
      const allParseInfo = allInformantes.map((informante) => {
        informante['answers'] = JSON.parse(informante['answers'])
        return informante
      })
      // console.log(allInformantes.length)
      resolve(allParseInfo)
    } catch (error) {
      reject(error)
    }
  })
}

export const generalInfo = (allInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const filterEmpty =
      const objectPayload = {
        paymentTools: [],
        terminal: []
      }
      const filterp5a = allInfo.filter((infor) => {
        return (infor['answers']['P5a'] !== ' ')
      }).map((e) => e)
      const filterp5aa = filterp5a.filter((infor) => {
        return (infor['answers']['P5a'] !== 2)
      }).map((e) => e)

      const totalPayment = await generaltotal(filterp5a, 'P5a')
      const dataArrays5a = await createWave(filterp5a, [1, 2, 3, 4], 'P5a')

      const totalterminalType = await generaltotal(filterp5aa, 'P5aa')
      const dataArrays5aa = await createWave(filterp5aa, [1, 2, 3, 4], 'P5aa')
      // console.log({dataArrays5aa})
      // console.log({totalterminalType})
      objectPayload.terminal.push(totalterminalType)
      objectPayload.paymentTools.push(totalPayment)
      dataArrays5aa.forEach(wave => objectPayload.terminal.push(wave))
      dataArrays5a.forEach(wave => objectPayload.paymentTools.push(wave))

      // objectPayload['paymentTools'] = await balans(objectPayload)
      resolve(objectPayload)
    } catch (error) {
      reject(error)
    }
  })
}

const generaltotal = (filterpS, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalporcentual = 0
      const obj = {
        'Ambos': 0,
        'Lector': 0,
        'Terminal bancaria': 0
      }
      filterpS.forEach((element) => {
        totalporcentual += element.answers.Factor
        if (element.answers[key] === 1) {
          obj['Terminal bancaria'] = obj['Terminal bancaria'] + element.answers.Factor
        } else if (element.answers[key] === 2) {
          obj['Lector'] = obj['Lector'] + element.answers.Factor
        } else {
          obj['Ambos'] = obj['Ambos'] + element.answers.Factor
        }
      })
      Object.keys(obj).forEach((e) => {
        obj[e] = Math.round((obj[e] / totalporcentual) * 100)
      })
      // console.log(obj)
      const balansObj = await balans(obj)
      balansObj['name'] = 'total'
      resolve(obj)
    } catch (error) {
      reject(error)
    }
  })
}

const balans = (objectPayload) => {
  return new Promise((resolve, reject) => {
    try {
      const sum = Object.keys(objectPayload).map((keyValue) => {
        return objectPayload[keyValue]
      }).reduce((acc, currentvalue) => { return acc + currentvalue })
      if (sum === 99) {
        const obj = normalization(objectPayload)
        resolve(obj)
      } else if (sum === 101) {
        const obj = normalization2(objectPayload)
        resolve(obj)
      }
      resolve(objectPayload)
    } catch (error) {
      reject(error)
    }
  })
}

const normalization = (arreglo) => {
  const numeros = Object.keys(arreglo)
    .filter(llave => {
      return llave.toString() !== 'name'
    }).map(e => arreglo[e])
  const min = Math.min(...numeros)
  // console.log({numeros})
  Object.keys(arreglo).forEach(element => {
    if (arreglo[element] === min) {
      arreglo[element] = arreglo[element] + 1
    }
  })
  return arreglo
}

const normalization2 = (arreglo) => {
  const numeros = Object.keys(arreglo)
    .filter(llave => {
      return llave.toString() !== 'name'
    }).map(e => arreglo[e])
  const max = Math.max(...numeros)
  // console.log({numeros})
  Object.keys(arreglo).forEach(element => {
    if (arreglo[element] === max) {
      arreglo[element] = parseInt(arreglo[element] - 1)
    }
  })
  return arreglo
}

const createWave = (filterp5a, waves, key) => {
  return new Promise((resolve, reject) => {
    try {
      const wavesArra = []
      waves.forEach(async (wave) => {
        let totalporcentual = 0
        const obj = {
          'Ambos': 0,
          'Lector': 0,
          'Terminal bancaria': 0
        }
        filterp5a.forEach((element) => {
          if (wave === element.answers['F1']) {
            totalporcentual += element.answers.Factor
            if (element.answers[key] === 1) {
              obj['Terminal bancaria'] = obj['Terminal bancaria'] + element.answers.Factor
            } else if (element.answers[key] === 2) {
              obj['Lector'] = obj['Lector'] + element.answers.Factor
            } else {
              obj['Ambos'] = obj['Ambos'] + element.answers.Factor
            }
          }
        })

        Object.keys(obj).forEach((e) => {
          if (totalporcentual !== 0) obj[e] = Math.round((obj[e] / totalporcentual) * 100)
        })
        const balansObj = await balans(obj)
        balansObj['name'] = 'wave ' + wave
        wavesArra.push(obj)
        // console.log(totalporcentual)
      })
      resolve(wavesArra)
    } catch (error) {
      reject(error)
    }
  })
}
