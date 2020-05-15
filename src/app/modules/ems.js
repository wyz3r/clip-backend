export const ems = (dataPostFilter, especificwave) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filterToWave = dataPostFilter.filter((informante) => {
        return (informante.answers['F1'].toString() === especificwave)
      }).map((info) => info)

      const dg6Payload = await cleanData(filterToWave)
      resolve({dg6Payload})
    } catch (error) {
      reject(error)
    }
  })
}

const cleanData = (filterToWave) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [{
        name: 'EM1', 'EM1': top2box(filterToWave, 'EM1')
      },
      {
        name: 'EM4', 'EM4': top2box(filterToWave, 'EM4')
      },
      {
        name: 'EM7', 'EM7': top2box(filterToWave, 'EM7')
      },
      {
        name: 'EM5', 'EM5': top2box(filterToWave, 'EM5')
      },
      {
        name: 'EM6', 'EM6': top2box(filterToWave, 'EM6')
      },
      {
        name: 'dummy', dummy: 100
      }
      ]
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

const top2box = (filterToWave, clave) => {
  let totalporcentual = 0
  let valor = 0
  filterToWave.forEach((infor) => {
    totalporcentual += infor.answers.Factor
    if (infor.answers[clave] >= 8) {
      valor += infor.answers.Factor
    }
  })
  const total = (valor === 0 && totalporcentual === 0 ? 0 : Math.round((valor / totalporcentual) * 100))
  return total
}
