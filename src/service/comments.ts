export interface Comment {
  title: string
  message: string
  preview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

// ApiKey could be public as service is 100% free
const apiKey = '$2b$10$YrqlVp4tjUiE5cltnj1e0OAj1hrcLB4JMMfyphJzkorD3hMgp2oVe'

export const getComments = async () => {
  const response = await fetch('https://api.jsonbin.io/v3/b/64d27be5b89b1e2299cd7065', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}


export const postComment = async (comment: Comment) => {
  const comments = await getComments()

  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

  const response = await fetch('https://api.jsonbin.io/v3/b/64d27be5b89b1e2299cd7065', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}

export const updateComment = async (comment: Comment, id: string) => {
  const comments = await getComments()

  const updatedComment = {...comment, id}
  const commentToUpdate = [...comments, updatedComment]

  const response = await fetch('https://api.jsonbin.io/v3/b/64d27be5b89b1e2299cd7065', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': apiKey
    },
    body: JSON.stringify(commentToUpdate)
  })

  if (!response.ok) {
    throw new Error('Failed to update comment.')
  }

  return updatedComment
}

