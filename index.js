import { fetchComments } from './api.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

// document.querySelector('.comments').innerHTML =
//     'Пожалуйста подождите, загружаю комментарии...'

export const fetchAndRenederComments = () => {
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenederComments()