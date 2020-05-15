export const engageAdRecallInfo = (dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const funnelPayload = []
      const engagePayload = await preparePayload(dataPostFilter, [1, 2, 3, 4])
      resolve({engagePayload})
    } catch (error) {
      reject(error)
    }
  })
}

const preparePayload = (dataPostFilter, numWaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayObj = []
      const objTotal = {
        uno: sumatotalPorcentual(1, dataPostFilter),
        dos: sumatotalPorcentual(2, dataPostFilter),
        tres: sumatotalPorcentual(3, dataPostFilter),
        cuatro: sumatotalPorcentual(4, dataPostFilter),
        cinco: sumatotalPorcentual(5, dataPostFilter)
      }
      const balansObjtot = await balans(objTotal)
      balansObjtot['name'] = 'Total'
      arrayObj.push(balansObjtot)
      numWaves.forEach(async (wave) => {
        const waveObj = {
          uno: createWave(1, dataPostFilter, wave),
          dos: createWave(2, dataPostFilter, wave),
          tres: createWave(3, dataPostFilter, wave),
          cuatro: createWave(4, dataPostFilter, wave),
          cinco: createWave(5, dataPostFilter, wave)
        }
        const balansObjWave = await balans(waveObj)
        balansObjWave['name'] = 'wave' + wave
        arrayObj.push(balansObjWave)
      })
      resolve(arrayObj)
    } catch (error) {
      reject(error)
    }
  })
}

const balans = (objectPayload) => {
  const sum = Object.keys(objectPayload).map((keyValue) => {
    return objectPayload[keyValue]
  }).reduce((acc, currentvalue) => { return acc + currentvalue })
  if (sum === 99) {
    const obj = normalization(objectPayload)
    return obj
  } else if (sum === 101) {
    const obj = normalization2(objectPayload)
    return obj
  }
  return objectPayload
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

const sumatotalPorcentual = (value, dataPostFilter) => {
  let totalporcentual = 0
  let valor = 0
  dataPostFilter.forEach(element => {
    totalporcentual += element.answers.Factor
    if (element.answers['DG4'] === value) {
      valor = valor + element.answers.Factor
    }
  })
  const total = Math.round((valor / totalporcentual) * 100)
  return total
}

const createWave = (value, dataPostFilter, wave) => {
  let totalporcentual = 0
  let valor = 0
  dataPostFilter.forEach(element => {
    if (element.answers['F1'] === wave) {
      totalporcentual += element.answers.Factor
      if (element.answers['DG4'] === value) {
        valor = valor + element.answers.Factor
      }
    }
  })
  const total = Math.round((valor / totalporcentual) * 100)
  return total
}
