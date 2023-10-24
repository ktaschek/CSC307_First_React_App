import express from "express";
import cors from "cors";
import mut from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    mut.getUsers(name, job)
        .then(users => {return {users_list: users};})
        .then(users => {return res.send(users);})
        .catch((error) => {return res.send(error);});
}); 

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    mut.findUserById(id)
        .then((result) => {
            if (result === undefined) {
                res.status(404).send('Resource not found.');
            } else {
                res.send(result);
            }
        })
        .catch((error) => { return res.send(error);})
    
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    mut.addUser(userToAdd)
        .then((user) => { return res.status(201).send(user);})
        .catch(error => { return res.send(error);});
});


app.delete('/users/:id', (req,res) =>{
    const id = req.params['id'];
    mut.deleteUser(id)
        .then((result) => {
            if (result === undefined) {
                res.status(404).send('Resource not found.');
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => { return res.send(error);});
    // if(idx !== -1){
    //     users["users_list"].splice(idx,1);
    //     res.status(204).send();
    // }else{
    //     res.status(404).send("Resource not found.");
    // }
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});