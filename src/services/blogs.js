import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (params, user) => {
  const newBlog = {
    title: params.title,
    author: params.author,
    url: params.url,
    likes: 0,
    userId: user.id
  }

  const request = await axios.post(baseUrl, newBlog, {headers: {Authorization: `Bearer ${user.token}`}})
  return request.data
}

const modify = async (id, params) => {
  const modifiedBlog = {
    title: params.title,
    author: params.author,
    url: params.url,
    likes: params.likes,
    userId: params.user.id
  }
  const request = await axios.put(`${baseUrl}/${id}`, modifiedBlog)
  return request.data
}

const remove = async (id, user) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {headers: {Authorization: `Bearer ${user.token}`}})
  return request.data
}

export default {getAll, create, modify, remove}