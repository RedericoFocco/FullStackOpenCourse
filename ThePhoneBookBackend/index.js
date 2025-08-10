console.log("hello w")

const express = require('express')
const app = express()

app.use(express.json())

personas=[
    { 
      "id": "1",
      "name": "Arto Hellass", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/personas',(request, response) => {
    response.json(personas)
})

app.get('/api/personas/:id',(request, response) => {
    const id=request.params.id
    console.log("id",id)
    const [selectedInfo] = personas.filter(p=>p.id===id)
    console.log(selectedInfo)
    if(selectedInfo)
    {
        response.json(selectedInfo)
    }
    else
    {
        response.statusMessage=`No persona with id ${id} found`
        response.status(404).end() //end important
    }
})


app.get('/info',(request, response) => {
    response.send(`Phonebook has info for ${personas.length} people.<br> ${new Date().toString()}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})