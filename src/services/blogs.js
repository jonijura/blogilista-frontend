import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (params) => {
  const newBlog = {
    title: params.title,
    author: params.author,
    url: params.url,
    likes: 0,
    userId: params.user.id,
  };

  const request = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: `Bearer ${params.user.token}` },
  });
  return request.data;
};

const update = async (params) => {
  const modifiedBlog = {
    title: params.title,
    author: params.author,
    url: params.url,
    likes: params.likes,
    userId: params.user.id,
  };
  const request = await axios.put(`${baseUrl}/${params.id}`, modifiedBlog);
  return request.data;
};

const remove = async (id, token) => {
  const request = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return request.data;
};

export default { getAll, create, update, remove };
