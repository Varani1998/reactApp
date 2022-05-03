import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';

export default function AllStudents() {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tempTodo = await getData();
      setStudent(tempTodo);
      console.log(JSON.stringify(tempTodo));
      console.log(JSON.stringify(students));
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const finalURL = "http://localhost:3333/student/";
      const res = await axios.get(finalURL);
      //console.log(JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleData = async (id) => {
    try {
      console.log("Varani");
      const finalURL = "http://localhost:3333/student/" + id;
      const res = await axios.get(finalURL);
      //console.log(res);
      //alert(JSON.stringify(res.data.data));
      return res.data.data.students;
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (_id) => {
    try {
      console.log(_id);
      if (window.confirm("Are you sure?")) {
        fetch("http://localhost:3333/student/delete/" + _id, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
        });
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>All Students</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => (
            <tr key="{item._id}">
              <td>{item.userName}</td>
              <td>{item.description}</td>
              <td>{item.duration}</td>
              <td>
              <Button variant="info" onClick={() => getSingleData(item._id)}>Edit</Button>
              <Button variant="danger" onClick={() => removeTodo(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
