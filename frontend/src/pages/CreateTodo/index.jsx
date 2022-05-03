import React,{useState} from "react";
 import axios from "axios";

export default function AddStudents() {

  const[userName,setUserName]=useState("");
  const[description,setDescription]=useState("");
  const[duration,setDuration]=useState("");
 

  function sendData(e){
    e.preventDefault();
    const newStudent={
      userName,
      description,
      duration,
    }
    axios.post("http://localhost:3333/student/add",newStudent).then(()=>{
      alert("Student Added")
      setUserName("");
      setDescription("");
      setDuration("");

    }).catch((err)=>{
      alert(err)
    })
    window.location.reload(false);
  }

  return (
    <form onSubmit={sendData}>
      <h1>Create Exercise Log</h1>
      <div class="form-group">
        <label for="exampleInputUserName">User Name</label>
        <input
          type="text"
          className="form-control"
          id="InputUserName"
          placeholder="userName" onChange={(e)=>{
            setUserName(e.target.value);
            
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputDescription">Description</label>
        <input
          type="text"
          className="form-control"
          id="InputDescription"
          placeholder="description" 
          onChange={(e)=>{
            setDescription(e.target.value);
            
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputDuration">Duration</label>
        <input
          type="number"
          className="form-control"
          id="InputDuration"
          placeholder="duration"  onChange={(e)=>{
            setDuration(e.target.value);
            
          }}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Create Exercise Log
      </button>
    </form>
  );
}
