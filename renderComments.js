export function renderComments() {
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
