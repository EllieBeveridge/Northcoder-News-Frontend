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

export const upvoteArticle = (article_id => {
  return axios.patch(`${DB_URL}/articles/${article_id}?vote=up`)
    .then(({ data: { article } }) => {
      return article
    })

})

export const downvoteArticle = (article_id => {
  return axios.patch(`${DB_URL}/articles/${article_id}?vote=down`)
    .then(({ data: { article } }) => {
      return article
    })

})

export const upvoteComment = (comment_id => {
  return axios.patch(`${DB_URL}/comments/${comment_id}?vote=up`)
    .then(({ data: { comment } }) => {
      return comment
    })

})

export const downvoteComment = (comment_id => {
  return axios.patch(`${DB_URL}/comments/${comment_id}?vote=down`)
    .then(({ data: { comment } }) => {
      return comment
    })

})

export const postArticle = (userInput) => {
  return axios.post(`${DB_URL}/topics/${topic}/articles`)
    .then(({ data: { article } }) => {
      return article
    })
}