export const tvAdRecall = (dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tvPayload = await cleanData(dataPostFilter, [1, 2, 3, 4])
      resolve({tvPayload})
    } catch (error) {
      reject(error)
    }
  })
}

const cleanData = (dataPostFilter, numwaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = {
        Total: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave1: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave2: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave3: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave4: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ]
      }
      payload['Total'] = await totalTvRecall(dataPostFilter)
      numwaves.forEach(async (wave) => {
        payload['wave' + wave] = await createWave(dataPostFilter, wave)
      })
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

const totalTvRecall = (dataPostFilter) => {
  return new Promise((resolve, reject) => {
    try {
      const arrayObj = [
        { name: 'si', value: 0 },
        { name: 'no', value: 0 }
      ]
      let totalporcentual = 0
      let valor = 0
      dataPostFilter.forEach((informante) => {
        totalporcentual += informante.answers.Factor
        if (informante.answers['EMO'] === 1) {
          valor += informante.answers.Factor
        }
      })
      arrayObj[0]['value'] = Math.round((valor / totalporcentual) * 100)
      if (arrayObj[0]['value'] !== 0) arrayObj[1]['value'] = 100 - arrayObj[0]['value']
      resolve(arrayObj)
    } catch (error) {
      reject(error)
    }
  })
}

const createWave = (dataPostFilter, wave) => {
  return new Promise((resolve, reject) => {
    try {
      const arrayObj = [
        { name: 'si', value: 0 },
        { name: 'no', value: 0 }
      ]
      let totalporcentual = 0
      let valor = 0
      dataPostFilter.forEach((informante) => {
        if (informante.answers['F1'] === wave) {
          totalporcentual += informante.answers.Factor
          if (informante.answers['EMO'] === 1) {
            valor += informante.answers.Factor
          }
        }
      })
      arrayObj[0]['value'] = Math.round((valor / totalporcentual) * 100)
      if (arrayObj[0]['value'] !== 0) arrayObj[1]['value'] = 100 - arrayObj[0]['value']
      resolve(arrayObj)
    } catch (error) {
      reject(error)
    }
  })
}
