import axios from 'axios'
const baseUrl = 'https://phonebook-backend-server.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}

const deletePerson = idToDelete => {
  const request = axios.delete(`${baseUrl}/${idToDelete}`)
  return request.then(response => response.data)
}

const toExport = { 
  getAll: getAll, 
  create: create,
  delete: deletePerson,
  update: update
}
export default toExport