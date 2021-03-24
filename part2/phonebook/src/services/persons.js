import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

const deletePerson = idToDelete => {
  const request = axios.delete(`${baseUrl}/${idToDelete}`)
  return request.then(response => response.data)
  .catch(error => {
      console.log('fail')
  })
}

const toExport = { 
  getAll: getAll, 
  create: create,
  delete: deletePerson
}
export default toExport