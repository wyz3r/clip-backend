export const digitalAdRecall = (marca, dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const digitalAdRecallGraph = await preparePayload(marca, dataPostFilter, [1, 2, 3, 4])
      resolve({digitalAdRecallGraph})
    } catch (error) {
      reject(error)
    }
  })
}

const preparePayload = (marca, dataPostFilter, numWaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayObject = [{
        name: 'Total',
        facebook: sumaPorcentual(dataPostFilter, 1),
        twitter: sumaPorcentual(dataPostFilter, 2),
        instagram: sumaPorcentual(dataPostFilter, 3),
        youtube: sumaPorcentual(dataPostFilter, 4),
        linkedin: sumaPorcentual(dataPostFilter, 5)
      }]
      numWaves.forEach((wave) => {
        const waves = {
          name: 'wave' + wave,
          facebook: sumaPorcentualWave(dataPostFilter, 1, wave),
          twitter: sumaPorcentualWave(dataPostFilter, 2, wave),
          instagram: sumaPorcentualWave(dataPostFilter, 3, wave),
          youtube: sumaPorcentualWave(dataPostFilter, 4, wave),
          linkedin: sumaPorcentualWave(dataPostFilter, 5, wave)
        }
        arrayObject.push(waves)
      })
      resolve(arrayObject)
    } catch (error) {
      reject(error)
    }
  })
}

const sumaPorcentual = (dataPostFilter, value) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['answers']['DigitalRecall'] === parseInt(value)) {
      preferencetotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}

const sumaPorcentualWave = (dataPostFilter, value, wave) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    if (e.answers['F1'] === wave) {
      totalporcentual += e.answers.Factor
      if (e['answers']['DigitalRecall'] === parseInt(value)) {
        preferencetotal += e.answers.Factor
      }
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}
