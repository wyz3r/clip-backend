export const considerationInfo = (marca, dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const consGraphs = await cleanData(dataPostFilter, [1, 2, 3, 4])
      // console.log(allDataConsideration)
      resolve({consGraphs})
    } catch (error) {
      reject(error)
    }
  })
}

const cleanData = (dataPostFilter, numbWaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      const consGraphs = []
      const totalCons = await totalConsFunc(dataPostFilter)
      const wavesCons = await createWave(dataPostFilter, numbWaves, 'BH81a')
      consGraphs.push(totalCons)
      wavesCons.forEach(wave => consGraphs.push(wave))
      // console.log({consideration})
      resolve(consGraphs)
    } catch (error) {
      reject(error)
    }
  })
}

const totalConsFunc = (dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalporcentual = 0
      const obj = {
        'nunca': 0,
        'unica marca': 0,
        'nofirst': 0,
        'nosecond': 0
      }
      dataPostFilter.forEach(element => {
        totalporcentual += element.answers.Factor
        if (element.answers['BH81a'] === 1) {
          obj['nunca'] = obj['nunca'] + element.answers.Factor
        } else if (element.answers['BH81a'] === 2) {
          obj['nosecond'] = obj['nosecond'] + element.answers.Factor
        } else if (element.answers['BH81a'] === 3) {
          obj['nofirst'] = obj['nofirst'] + element.answers.Factor
        } else if (element.answers['BH81a'] === 4) {
          obj['unica marca'] = obj['unica marca'] + element.answers.Factor
        }
      })
      Object.keys(obj).forEach((e) => {
        obj[e] = Math.round((obj[e] / totalporcentual) * 100)
      })
      const balansObj = balans(obj)
      balansObj['name'] = 'total'
      resolve(balansObj)
    } catch (error) {
      reject(error)
    }
  })
}
const createWave = (dataPostFilter, waves, key) => {
  return new Promise((resolve, reject) => {
    try {
      const wavesArra = []
      waves.forEach((wave) => {
        let totalporcentual = 0
        const obj = {
          'nunca': 0,
          'unica marca': 0,
          'nofirst': 0,
          'nosecond': 0
        }
        dataPostFilter.forEach(element => {
          totalporcentual += element.answers.Factor
          if (wave === element.answers['F1']) {
            if (element.answers['BH81a'] === 1) {
              obj['nunca'] = obj['nunca'] + element.answers.Factor
            } else if (element.answers['BH81a'] === 2) {
              obj['nosecond'] = obj['nosecond'] + element.answers.Factor
            } else if (element.answers['BH81a'] === 3) {
              obj['nofirst'] = obj['nofirst'] + element.answers.Factor
            } else if (element.answers['BH81a'] === 4) {
              obj['unica marca'] = obj['unica marca'] + element.answers.Factor
            }
          }
        })

        Object.keys(obj).forEach((e) => {
          if (totalporcentual !== 0) obj[e] = Math.round((obj[e] / totalporcentual) * 100)
        })
        const balansObj = balans(obj)
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
