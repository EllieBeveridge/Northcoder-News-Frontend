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

export const fetchArticleById = (article_id) => {
  return axios.get(`${DB_URL}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
}

export const fetchAllComments = (article_id) => {
  return axios.get(`${DB_URL}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments
    })
}
