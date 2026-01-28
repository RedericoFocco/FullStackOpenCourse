const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

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

  const anecdotesList = await getAll()
  const targetedVote = anecdotesList.filter(a=>a.id===id)

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content:targetedVote.content, votes:targetedVote.votes+1}),
  }
  
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

export default {getAll, createNewAnecdote,updateVote}