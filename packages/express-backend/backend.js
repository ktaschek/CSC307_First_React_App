import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}
const deleteUser = (id) => {
    let idx = users["users_list"].findIndex((user) => user['id'] === id);
    if(idx === -1){
        res.status(404).send("Resource not found.");
    }else{
        users["users_list"].splice(idx,1);
    }
}

const findUserByJob = (users_list,job) => { 
    return users_list['users_list']
        .filter( (user) => user['job'] === job); 
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let filt_users;
    if (name != undefined){
        let result = findUserByName(name);
        filt_users = {users_list: result};
    }else{
        filt_users = users;
    }
    if (job!=undefined){
        let result = findUserByJob(filt_users,job);
        filt_users = {users_list: result};
    }
    res.send(filt_users);
}); 

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});


app.delete('/users/:id', (req,res) =>{
    const userToDelete = req.params['id'];
    deleteUser(userToDelete);
    res.status(200).send("User Deleted Successfully");
})

app.listen(port, () =>{
    console.log('Example app listening at http://localhost:${port}');
});