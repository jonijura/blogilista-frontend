import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (params, user) => {
  console.log('user', user)
  const newBlog = {
    title: params.title,
    author: params.author,
    url: params.url,
    likes: 12,
    userId: user.id
  }

  const request = await axios.post(baseUrl, newBlog, {headers: {Authorization: `Bearer ${user.token}`}})
  return request.data
}

export default {getAll, create}