export const keyCopyPoints = (dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const keypointPayload = await cleanData(dataPostFilter, [1, 2, 3, 4])
      resolve({keypointPayload})
    } catch (error) {
      reject(error)
    }
  })
}

const cleanData = (dataPostFilter, numwaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = []
      numwaves.forEach((wave) => {
        const obje = {
          name: 'wave' + wave,
          'EM18-1': prepareIntervals(wave, dataPostFilter, 'EM18-1'),
          'EM18-2': prepareIntervals(wave, dataPostFilter, 'EM18-2'),
          'EM18-3': prepareIntervals(wave, dataPostFilter, 'EM18-3'),
          'EM18-4': prepareIntervals(wave, dataPostFilter, 'EM18-4')
        }
        payload.push(obje)
      })
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

const prepareIntervals = (wave, dataPostFilter, clave) => {
  let totalporcentual = 0
  let valor = 0
  dataPostFilter.forEach((infor) => {
    if (infor.answers['F1'] === wave) {
      totalporcentual += infor.answers.Factor
      if (infor.answers[clave] >= 8) {
        valor += infor.answers.Factor
      }
    }
  })
  const total = (valor === 0 && totalporcentual === 0 ? 0 : Math.round((valor / totalporcentual) * 100))
  return total
}
