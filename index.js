let comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤️',
        likes: 75,
        isLiked: true,
    },
]

function renderComments() {
    const commentList = document.querySelector('.comments')
    commentList.innerHTML = ''

    comments.forEach((comment) => {
        const li = document.createElement('li')
        li.classList.add('comment')

        li.innerHTML = `
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    `

        li.addEventListener('click', (event) => {
            if (!event.target.classList.contains('like-button')) {
                const commentInput = document.querySelector('.add-form-text')
                commentInput.value = `${comment.name} : ${comment.text}\n`
            }
        })

        li.querySelector('.like-button').addEventListener('click', () => {
            comment.isLiked = !comment.isLiked
            comment.likes += comment.isLiked ? 1 : -1
            renderComments()
        })

        commentList.appendChild(li)
    })
}

document.querySelector('.add-form-button').addEventListener('click', () => {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')

    nameInput.style.backgroundColor = ''
    commentInput.style.backgroundColor = ''

    let valid = true

    if (nameInput.value.trim() === '') {
        nameInput.style.backgroundColor = 'red'
        nameInput.style.color = 'lightgreen'
        valid = false
    }

    if (commentInput.value.trim() === '') {
        commentInput.style.backgroundColor = 'red'
        commentInput.style.color = 'lightgreen'
        valid = false
    }

    if (!valid) {
        return
    }

    const sanitizeHtml = (input) => {
        return input.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    }

    const now = new Date()
    const dateString =
        now.getDate().toString().padStart(2, '0') +
        '.' +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        '.' +
        now.getFullYear().toString().slice(2) +
        ' ' +
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0')

    comments.push({
        name: sanitizeHtml(nameInput.value),
        date: dateString,
        text: sanitizeHtml(commentInput.value),
        likes: 0,
        isLiked: false,
    })

    renderComments()
    nameInput.value = ''
    commentInput.value = ''
})

renderComments()

console.log('It works!')
