import {
  useParams
} from 'react-router-dom'

const AnecdoteDetail = ({ singleAnecdote }) => {
    console.log("singleAnecdote",singleAnecdote)
    return (
    <div>
        <h2>Anecdote {singleAnecdote.content}</h2>
        <div>Author {singleAnecdote.author}</div>
        <div>Info {singleAnecdote.info}</div>
        <div>Votes {singleAnecdote.votes}</div>
    </div>
)
}

export default AnecdoteDetail