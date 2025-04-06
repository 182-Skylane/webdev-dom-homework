import { fetchComments } from './api.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

export const fetchAndRenederComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Пожалуйста подождите, загружаю комментарии...</p>`
    }

    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchAndRenederComments(true)