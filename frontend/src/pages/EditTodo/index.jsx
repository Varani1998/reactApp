/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditTodo() {
  const { id } = useParams();
  const [todo, setTodo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const tempTodo = await getData(id);
      setTodo(tempTodo);
      console.log(JSON.stringify(tempTodo));
    };

    fetchData();
  }, []);

  const getData = async (id) => {
    try {
      const finalURL = "http://localhost:3333/student/" + id;
      const res = await axios.get(finalURL);
      //console.log(res);
      //alert(JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    setTodo({
      ...todo,
      [name]: value,
    });
  }

  const onSubmitForm = async (e) => {
    console.log(JSON.stringify(todo));
    try {
      e.preventDefault();

      const res = await axios({
        method: "put",
        baseURL: "http://localhost:3333",
        url: "/student/update" + id,
        data: todo,
        headers: {
          "Content-Type": "application/json",
        },
      });

      //console.log(res.data);
      window.location.assign("http://localhost:3000/student");
      alert("Saved Successfully!");

    } catch (error) {
      console.log(error);
      if (!error.response) {
      } else {
        //this.errorStatus = error.response.data.message;
      }
    }
  };

  console.log(todo);
  if (!todo) {
    return <>Loading the data</>;
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <br></br>
      <form noValidate onSubmit={(e) => onSubmitForm(e)}>
        <div className="form-group">
          <label>Username :</label>
          <input
            type="text"
            name="username"
            defaultValue={todo.username}
            required
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <input
            type="text"
            name="description"
            required
            className="form-control"
            defaultValue={todo.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (In minutes) :</label>
          <input
            type="number"
            name="duration"
            className="form-control"
            defaultValue={todo.duration}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
