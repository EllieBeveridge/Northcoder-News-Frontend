import axios from 'axios'

const DB_URL = 'https://ncnewsellieb.herokuapp.com/api'


export const fetchArticlesByTopic = (topic) => {
  return axios.get(`${DB_URL}/topics/${topic}/articles`)
    .then(({ data: { articles } }) => {
      return articles
    })
}

export const fetchAllArticles = () => {
  return axios.get(`${DB_URL}/articles`)
    .then(({ data: { articles } }) => {
      return articles
    })
}
