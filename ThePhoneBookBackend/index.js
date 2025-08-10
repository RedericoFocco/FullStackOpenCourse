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

app.delete('/api/personas/:id',(request, response) => {
    const id=request.params.id
    console.log("[DELETION] id",id)
    const [selectedInfo] = personas.filter(p=>p.id===id)
    const otherPersonas = personas.filter(p=>p.id !== id)
    console.log(selectedInfo)
    if(selectedInfo)
    {
        response.statusMessage=`Persona with id ${id} succesfully deleted`
        console.log('otherPersonas',otherPersonas)
        //response.status(200).json(otherPersonas)
        response.status(204).end()
    }
    else
    {
        response.statusMessage=`No persona with id ${id} found`
        response.status(404).end() //end important
    }
})

app.post('/api/personas',(request,response) => {

    if (request.body.number===null || request.body.name===null)
    {
        response.statusMessage="please fill number or name"
        response.status(500).json({"error":"name or number missing"})
    }
    else
    {
        const reqBody = {
        id:Math.round(Math.random()*10000),
        name: request.body.name,
        number: request.body.number 
        }

        personas=personas.concat(reqBody)
        response.json(reqBody)
    }

})

app.get('/info',(request, response) => {
    response.send(`Phonebook has info for ${personas.length} people.<br> ${new Date().toString()}`)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})