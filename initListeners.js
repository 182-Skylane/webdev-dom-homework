import { comments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'
import { dateString } from './commentDate.js'
import { renderComments } from './renderComments.js'

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

export const initAddCommentListener = () => {
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')

    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        if (!name.value || !text.value) {
            console.error('заполните форму')
            return
        }

        const newComment = {
            name: sanitizeHtml(name.value),
            date: dateString,
            text: sanitizeHtml(text.value),
            likes: 0,
            isLiked: false,
        }

        comments.push(newComment)

        renderComments()

        name.value = ''
        text.value = ''
    })
}
