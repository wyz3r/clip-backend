import { Router } from 'express'
import {getAllInfo, generalInfo} from '../modules/graphgeneralInfo'
import {considerationInfo} from '../modules/consideration'
import {totalAdRecall} from '../modules/totalAdRecall'
import {digitalAdRecall} from '../modules/digitalAdRecall'
import {engageAdRecallInfo} from '../modules/engageAdRecall'
import {tvAdRecall} from '../modules/tvAdRecall'
import {funnelInfo} from '../modules/funnelKnow'
import {keyCopyPoints} from '../modules/keyCopyPoints'
import {dg6} from '../modules/dg6'
import {ems} from '../modules/ems'

import {filtros} from '../modules/prefilters'

export const appRouterNew = Router()

const filterMidleware = async (req, res, next) => {
  try {
    const {filters} = req.headers
    const filtrosData = JSON.parse(filters)
    const alldata = await getAllInfo()
    req.dataPostFilter = await filtros(alldata, filtrosData)
    next()
  } catch (error) {
    console.log(error)
  }
  // const filtrosData = JSON.parse(filters)
}

appRouterNew.get('/infogeneral', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  try {
    const payload = await generalInfo(dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/funnel', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {filters} = req.headers
  const {marca} = JSON.parse(filters)
  try {
    const payload = await funnelInfo(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/consideration', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {filters} = req.headers
  const {marca} = JSON.parse(filters)
  try {
    const payload = await considerationInfo(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/totaladrecall', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {filters} = req.headers
  const {marca} = JSON.parse(filters)
  try {
    // const payload = await funnelInfo(marca, dataPostFilter)
    const payload = await totalAdRecall(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/digitaladrecall', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {filters} = req.headers
  const {marca} = JSON.parse(filters)
  try {
    const payload = await digitalAdRecall(marca, dataPostFilter)
    // const payload = await totalAdRecall(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/engageadrecall', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  // const {filters} = req.headers
  // const {marca} = JSON.parse(filters)
  try {
    const payload = await engageAdRecallInfo(dataPostFilter)
    // const payload = await totalAdRecall(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/tvadrecall', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  // const {filters} = req.headers
  // const {marca} = JSON.parse(filters)
  try {
    const payload = await tvAdRecall(dataPostFilter)
    // const payload = await totalAdRecall(marca, dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/keyCopyPoints', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  // const {filters} = req.headers
  // const {marca} = JSON.parse(filters)
  try {
    const payload = await keyCopyPoints(dataPostFilter)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/dg6', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {especificwave} = req.headers
  // const {marca} = JSON.parse(filters)
  try {
    const payload = await dg6(dataPostFilter, especificwave)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})

appRouterNew.get('/ems', filterMidleware, async (req, res) => {
  const {dataPostFilter} = req
  const {especificwave} = req.headers
  // const {marca} = JSON.parse(filters)
  try {
    const payload = await ems(dataPostFilter, especificwave)
    res.json(payload)
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }
})
