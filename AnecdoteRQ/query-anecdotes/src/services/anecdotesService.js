const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const getAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const createNewAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content,  votes:0 }),
  }
  
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

const updateVote = async (id) => {

  console.log('...updatingVote service...')

  const targetAnecdote = await getAnecdote(id)
  console.log(`got targetAnecdote ${targetAnecdote}`)
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content:targetAnecdote.content,votes:targetAnecdote.votes+1}),
  }
  
  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

export default {getAll, createNewAnecdote,updateVote}