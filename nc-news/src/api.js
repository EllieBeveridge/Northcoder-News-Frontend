import axios from 'axios'

const DB_URL = 'https://ncnewsellieb.herokuapp.com/api'

const withErrorHandling = (func) => {
  return function (...args) {
    return func(...args).catch(err => ({ err }));
  }
}

export const fetchAllArticles = withErrorHandling(() => {
  //insert normal fetchallarticles function
  return axios.get(`${DB_URL}/articles`)
    .then(({ data: { articles } }) => {
      return articles
    })
})

export const fetchArticlesByTopic = (topic) => {
  return axios.get(`${DB_URL}/topics/${topic}/articles`)
    .then(({ data: { articles } }) => {
      return articles
    })
    .catch(err => { throw err })
}

export const fetchArticleById = (article_id) => {
  return axios.get(`${DB_URL}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch(err => { throw err })
}

export const fetchAllComments = (article_id) => {
  return axios.get(`${DB_URL}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments
    })
}

export const voteOnComponent = ((id, direction, type) => {
  if (type === 'comments') {
    return axios.patch(`${DB_URL}/${type}/${id}?vote=${direction}`)
      .then(({ data: { comment } }) => {
        return comment
      })
  } else if (type === 'articles') {
    return axios.patch(`${DB_URL}/${type}/${id}?vote=${direction}`)
      .then(({ data: { article } }) => {
        return article
      })
  }
})

export const voteOnArticle = ((article_id, direction) => {
  return axios.patch(`${DB_URL}/articles/${article_id}?vote=${direction}`)
    .then(({ data: { article } }) => {
      return article
    })
})
//add direction as a parameter and change to variable

export const postArticle = (topic, newArticle) => {
  return axios.post(`${DB_URL}/topics/${topic}/articles`, newArticle)
    .then(({ data: { article } }) => {
      console.log(article)
      return article
    })
    .catch(error => {
      return console.log(error)
    })
}

export const postComment = (newComment, article_id) => {
  return axios.post(`${DB_URL}/articles/${article_id}/comments`, newComment)
    .then(({ data: { comment } }) => {
      console.log(comment)
      return comment
    })
    .catch(error => {
      return console.log(error)
    })
}

export const loginUser = (user) => {
  const { username } = user
  return axios.get(`${DB_URL}/users/${username}`)
    .then(({ data: { user } }) => {
      return user
    })
}

export const deleteComment = (comment_id) => {
  return axios.delete(`${DB_URL}/comments/${comment_id}`)
    .then(({ data: { comment } }) => {
      return comment
    })
}

export const getUserInfo = (username) => {
  return axios.get(`${DB_URL}/users/${username}`)
    .then(({ data: { user } }) => {
      return user
    })
}