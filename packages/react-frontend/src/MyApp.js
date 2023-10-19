// src/MyApp.js
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from './Form';

function MyApp() {
  const [characters,setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
    });
    let user = characters[index];
    deleteUser(user)
      .then(response => { 
        if(response.status !== 204){ Promise.reject(response);}
      })
      .then(() => {
        setCharacters(updated);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  function deleteUser(user){
    let id = user["_id"];
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then(response => { if(response.status !== 201){ Promise.reject(response);}else return response.json();})
      .then((user) => setCharacters([...characters, user]))
      .catch((error) => {
        console.log(error);
      })
  }
  
  function fetchUsers(){
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person){
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
    .then((res)=>res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error)=> {console.log(error);});
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}



export default MyApp;