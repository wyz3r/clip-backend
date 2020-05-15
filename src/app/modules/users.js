import {cassSelectDB, cassInsertDB} from '../db/dbConsult'

export const getRoleUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UserRole = await cassSelectDB('select role_user from autodashboard.users where user_id = ?', [userId])
      resolve(UserRole[0].role_user)
    } catch (error) {
      reject(error)
    }
  })
}
