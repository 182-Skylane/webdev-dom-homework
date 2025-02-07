import { initAddCommentListener } from './initListeners.js'
import { renderComments } from './renderComments.js'

renderComments()
initAddCommentListener(renderComments)
