import axios from 'axios'

const baseUrl = 'api/persons'
const fetchAll = () => {
  return axios
         .get(baseUrl)
         .then(response => response.data)
}

const addToServer = (person) => {
  return axios
         .post(baseUrl, person)
         .then(response => response.data)
}

const updatePerson = (id, person) => {
  return axios
         .put(`${baseUrl}/${id}`, person)
         .then(response => response)
         .catch(error => {
           console.log(error.response.status)
           return error.response})
}

const deletePerson = (id) => {
  return axios
         .delete(`${baseUrl}/${id}`)
         .then(() => fetchAll())
       }


export default {fetchAll, addToServer, updatePerson, deletePerson}
