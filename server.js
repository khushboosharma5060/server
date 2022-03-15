const express = require('express')
const Api = express();
Api.use(express.json());
const port = 3000;
const { validate, ValidationError, Joi } = require('express-validation')


const output = [];
const personValidation = {
    body: Joi.object({
      name: Joi.string()
           .min(3)
           .max(10)
           .required(),

      age: Joi.number()
          .min(1)
          .max(100)

         .required(),
      id : Joi.number()
         .min(1)
         .required(),
     location: Joi.string()     
    }),
  }
  
Api.post('/addperson' ,validate(personValidation, {}, {}),(req, res, next) => {
     const person = req.body
        output.push(person)
        res.send('ok')
    }); 


Api.get('/getperson', (req, res) => {
    res.send(output)
});


Api.get('/getperson/:id', (req, res) => {
    if(Number.isNaN(+req.params.id) || +req.params.id < 1){
        return res.send('id galat hai');
    }
    const id = +req.params.id
    const personid = output.find(obj => obj.id === id)
    res.send(personid)
});


Api.put('/updateperson/:id',(req, res) => {
    if(Number.isNaN(+req.params.id)){
        return res.send('id galat hai');
    }
    const id = +req.params.id
    const body = req.body
    const person = output.find(obj => obj.id === id)
    person.name = body.name
    res.send('updated')
})


Api.delete('/deleteperson/:id', (req, res) => {
    const id = +req.params.id
    const sum = output.findIndex(obj => obj.id === id)
    output.splice(sum, 1)
    res.send("deleted")
}, (req, res) => {
});


Api.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err.details.body)
    }
    return res.status(500).json(err)
    })


Api.listen(port, () => {
    console.log('server is going on')
});

 












const express = require('express');
const App = express();
const use = (express.json());

const port = 3000;

const output = [];


App.post('/addperson', (req, res) => {
    const input = req.body;
    output.push(input)
    res.send('added')
});



App.get('/getperson', (req, res) => {
    res.send(output)
});




 
