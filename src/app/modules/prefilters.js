export const filtros = (allData, filtrosData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const genderFilter = await filterRadio(allData, filtrosData, 'F4')
      const ageFilter = await filterCheck(genderFilter, filtrosData, 'F5')
      const merchantFilter = await filterRadio(ageFilter, filtrosData, 'users')
      merchantFilter.forEach(element => {
        // console.log(element.answers)
        if (element.answers.Folio === 4) {
          console.log(element)
        }
      })
      const sampleFilter = await filterCheck(merchantFilter, filtrosData, 'sample')
      // const selFilter = await filterCheck(ageFilter, filtrosData, 'A1')
      const areaFilter = await filterCheck(sampleFilter, filtrosData, 'F6')
      const selFilter = await filterCheck(areaFilter, filtrosData, 'A1')
      resolve(selFilter)
    } catch (error) {
      reject(error)
    }
  })
}

const filterRadio = (dataArray, filtrosData, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const radioFilterData = dataArray.filter((informante) => {
        if (filtrosData[key] === '') return true
        return ((informante.answers[key] === filtrosData[key]))
      }).map((e) => e)
      resolve(radioFilterData)
    } catch (error) {
      reject(error)
    }
  })
}

const filterCheck = (dataArray, filtrosData, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkFilterData = dataArray.filter((informante) => {
        if (filtrosData[key].length === 0) return true
        return (filtrosData[key].includes(informante.answers[key]))
      }).map((e) => e)
      resolve(checkFilterData)
    } catch (error) {
      reject(error)
    }
  })
}
