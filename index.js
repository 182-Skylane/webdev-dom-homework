import { fetchComments } from './api.js'
import { updateComments } from './comments.js'
import { initAddCommentListener } from './initListeners.js'
import { renderComments } from './renderComments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста подождите, загружаю комментарии...'


fetchComments().then((data) => {
    updateComments(data)
    renderComments()
    
document.querySelector('.add-form').style.display = 'flex'
})

initAddCommentListener(renderComments)
