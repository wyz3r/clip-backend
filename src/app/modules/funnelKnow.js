
export const funnelInfo = (marca, dataPostFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const funnelPayload = await preparePayload(marca, dataPostFilter, [1, 2, 3, 4])
      resolve({funnelPayload})
    } catch (error) {
      reject(error)
    }
  })
}

const preparePayload = (marca, dataPostFilter, numWaves) => {
  return new Promise((resolve, reject) => {
    try {
      const initWavesArray = {
        total: [{
          'preferida': totaPreferences(marca, dataPostFilter),
          'familiaridad': totalFam(marca, dataPostFilter),
          'last month': totaLastMonth(marca, dataPostFilter),
          'last 3m': totaLast3Month(marca, dataPostFilter),
          'awareness': totaAwa(marca, dataPostFilter),
          'TOM': totalTOM(marca, dataPostFilter),
          dummy: 100
        }],
        waves: {}
      }
      numWaves.forEach((wave, index) => {
        initWavesArray.waves['wave ' + wave] = [{
          'preferida': wavePreferences(marca, dataPostFilter, wave),
          'familiaridad': waveTotalFam(marca, dataPostFilter, wave),
          'last month': waveTotaLastMonth(marca, dataPostFilter, wave),
          'last 3m': waveTotaLast3Month(marca, dataPostFilter, wave),
          'awareness': waveTotaAwa(marca, dataPostFilter, wave),
          'TOM': wavetotalTOM(marca, dataPostFilter, wave),
          dummy: 100
        }]
      })
      resolve(initWavesArray)
    } catch (error) {
      reject(error)
    }
  })
}

const totaPreferences = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['answers']['BH7'] === parseInt(marca)) {
      preferencetotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}
const totalTOM = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['answers']['TOM'] === parseInt(marca)) {
      preferencetotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}
const totalFam = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let famtotal = 0
  const brend = 'Fam' + marca
  dataPostFilter.forEach((informante) => {
    // console.log(informante.answers['FamClip'])
    totalporcentual += informante.answers.Factor
    if (informante.answers[brend] === 2 || informante.answers[brend] === 3) {
      famtotal += informante.answers.Factor
    }
  })
  const sumaporcentual = Math.round((famtotal / totalporcentual) * 100)
  return sumaporcentual
}

const totaLastMonth = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  dataPostFilter.forEach((w) => {
    w['Bh6'] = Object.keys(w.answers).filter((s) => {
      return (s.toString().indexOf('LM') !== -1 && w.answers[s] !== ' ')
    }).map(ele => w.answers[ele])
  })

  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh6'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}

const totaAwa = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['Bh3'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return (s.toString().indexOf('TotalAw') !== -1 && e.answers[s] !== ' ')
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh3'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}

const totaLast3Month = (marca, dataPostFilter) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['Bh5'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return (s.toString().indexOf('L3M') !== -1 && e.answers[s] !== ' ')
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh5'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}

const waveTotaLast3Month = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log({wave})
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['Bh5'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return ((s.toString().indexOf('L3M') !== -1 && e.answers[s] !== ' ') && e.answers['F1'] === wave)
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh5'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}

const waveTotaAwa = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['Bh3'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return (s.toString().indexOf('TotalAw') !== -1 && e.answers[s] !== ' ' && e.answers['F1'] === wave)
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh3'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}

const waveTotalFam = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let famtotal = 0
  const brend = 'Fam' + marca
  dataPostFilter.forEach((informante) => {
    // console.log(informante.answers['FamClip'])
    totalporcentual += informante.answers.Factor
    if ((informante.answers[brend] === 2 || informante.answers[brend] === 3) && informante.answers['F1'] === wave) {
      famtotal += informante.answers.Factor
    }
  })
  const sumaporcentual = Math.round((famtotal / totalporcentual) * 100)
  return sumaporcentual
}

const waveTotaLastMonth = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let LastMonthtotal = 0
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    e['Bh6'] = Object.keys(e.answers).filter((s) => {
      // console.log(s.toString().indexOf('LM'))
      return (s.toString().indexOf('LM') !== -1 && e.answers[s] !== ' ' && e.answers['F1'] === wave)
    }).map(ele => e.answers[ele])
  })
  // console.log(dataPostFilter)
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['Bh6'].includes(parseInt(marca))) {
      LastMonthtotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((LastMonthtotal / totalporcentual) * 100)
  return sumaporcentual
}
const wavePreferences = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['answers']['BH7'] === parseInt(marca) && e.answers['F1'] === wave) {
      preferencetotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}

const wavetotalTOM = (marca, dataPostFilter, wave) => {
  let totalporcentual = 0
  let preferencetotal = 0
  dataPostFilter.forEach((e) => {
    totalporcentual += e.answers.Factor
    if (e['answers']['TOM'] === parseInt(marca) && e.answers['F1'] === wave) {
      preferencetotal += e.answers.Factor
    }
  })
  const sumaporcentual = Math.round((preferencetotal / totalporcentual) * 100)
  return sumaporcentual
}
