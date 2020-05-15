export const dg6 = (dataPostFilter, especificwave) => {
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
        name: 'DG6-2', 'DG6-2': top3box(filterToWave, 'DG6-2')
      },
      {
        name: 'DG6-5', 'DG6-5': top3box(filterToWave, 'DG6-5')
      },
      {
        name: 'DG6-1', 'DG6-1': top3box(filterToWave, 'DG6-1')
      },
      {
        name: 'DG6-3', 'DG6-3': top3box(filterToWave, 'DG6-3')
      },
      {
        name: 'DG6-4', 'DG6-4': top3box(filterToWave, 'DG6-4')
      },
      {
        name: 'DG6-6', 'DG6-6': top3box(filterToWave, 'DG6-6')
      },
      {
        name: 'DG6-7', 'DG6-7': top3box(filterToWave, 'DG6-7')
      },
      {
        name: 'DG6-8', 'DG6-8': top3box(filterToWave, 'DG6-8')
      },
      {
        name: 'DG6-9', 'DG6-9': top3box(filterToWave, 'DG6-9')
      },
      {
        name: 'DG6-10', 'DG6-10': top3box(filterToWave, 'DG6-10')
      },
      {
        name: 'DG6-11', 'DG6-11': top3box(filterToWave, 'DG6-11')
      },
      {
        name: 'DG6-12', 'DG6-12': top3box(filterToWave, 'DG6-12')
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

const top3box = (filterToWave, clave) => {
  let totalporcentual = 0
  let valor = 0
  filterToWave.forEach((infor) => {
    totalporcentual += infor.answers.Factor
    if (infor.answers[clave] >= 4) {
      valor += infor.answers.Factor
    }
  })
  const total = (valor === 0 && totalporcentual === 0 ? 0 : Math.round((valor / totalporcentual) * 100))
  return total
}
