export const totalAdRecall = (marca, dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalAdRecallGraph = await cleanData(marca, dataPostFilter, [1, 2, 3, 4])
      totalAdRecallGraph.push({dummy: 100})
      resolve({totalAdRecallGraph})
    } catch (error) {
      reject(error)
    }
  })
}

const cleanData = (marca, dataPostFilter, numWaves) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const adRecallPayload = []
      const alladRecallData = await totaladRecallFunc(marca, dataPostFilter)
      const wavesAdRecall = []
      numWaves.forEach((wave) => {
        const obj = {}
        obj['name'] = `wave${wave}`
        obj['Ambos' + wave] = wavesadRecallFunc(marca, dataPostFilter, wave)
        wavesAdRecall.push(obj)
      })
      const adRecallPayload = [alladRecallData, ...wavesAdRecall]
      resolve(adRecallPayload)
    } catch (error) {
      reject(error)
    }
  })
}

const totaladRecallFunc = (marca, dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalporcentual = 0
      let preferencetotal = 0
      dataPostFilter.forEach((w) => {
        w['RP1'] = Object.keys(w.answers).filter((s) => {
          return (s.toString().indexOf('AdRecall') !== -1 && w.answers[s] !== ' ')
        }).map((ele) => {
          return w.answers[ele]
        })
      })
      dataPostFilter.forEach((e) => {
        totalporcentual += e.answers.Factor
        if (e['RP1'].includes(parseInt(marca))) {
          preferencetotal += e.answers.Factor
        }
      })
      const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
      const obj = {
        name: 'Total',
        Total: sumaporcentual
      }
      resolve(obj)
    } catch (error) {
      reject(error)
    }
  })
}

const wavesadRecallFunc = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['RP1'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return (s.toString().indexOf('AdRecall') !== -1 && e.answers[s] !== ' ' && e.answers['F1'] === wave)
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['RP1'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}
