import { comments, updateComments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'
import { postComment } from './api.js'

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isLiked = !comment.isLiked

            renderComments()
        })
    }
}

export const initReplyListeners = () => {
    const text = document.getElementById('text-input')
    const commentElements = document.querySelectorAll('.comment')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            text.value = `${currentComment.name}: ${currentComment.text} \n`
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')

    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        if (!name.value || !text.value) {
            console.error('заполните форму')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
            (data) => {

            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                renderComments()
                name.value = ''
                text.value = ''
            },
        ).catch((error) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            if (error.message === 'Failed to fetch') {
                alert('Нет интернета, попробуйте снова')
            }

            if (error.message === 'Сервер не отвечает') {
                alert('Сервер не отвечает')
            }

            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий должны быть не короче 3-х символов')

                name.classList.add('input-error')
                text.classList.add('input-error')

                setTimeout(() => {
                name.classList.remove('input-error')
                text.classList.remove('input-error')
                },1500)
            }
        })
    })
}
