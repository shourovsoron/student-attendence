import { useState } from 'react'
import './App.css'
import React from 'react'

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [edtiableStudent, setEditAbleStudent] = useState([]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (studentName === "") {
      alert("Provide Student Name")
    }
    else {
      editMode ? updateHandler() : createHandler();

    }
  }

  const changeHandler = (e) => {
    setStudentName(e.target.value)
  }

  const createHandler = () => {
    const newStudent = {
      id: Date.now() + "",
      name: studentName,
      isPresent: undefined
    }

    setStudents([...students, newStudent])
    setStudentName("")

  }

  const editHandler =(student)=>{
    setEditMode(true);
    setStudentName(student.name);
    setEditAbleStudent(student)

  }

  const updateHandler = () => {
   const updateStudentList = students.map(student =>{
    if(student.id===edtiableStudent.id){
      return({...student, name:studentName})
    }
    return(
      student
    )
   })

   setStudents(updateStudentList);
   setEditMode(false)
   setStudentName("")
   setEditAbleStudent(null)
  }

  const removeHandler= (student)=>{
   const updateStudent = students.filter(item => item.id !== student.id);
   setStudents(updateStudent);

  }

  const presentHandler= (student)=>{
    if(student.isPresent!==undefined){
      alert(`This Student already added in ${student.isPresent? "Present List" : "Absent List"}`)

    }else{
      const updateStudent = students.map(item =>{
        if(item.id === student.id){
          return({...item, isPresent:true})
        }
        return item;
      });

      setStudents(updateStudent);
    }


  
    


  };

  const absentHandler =(student)=>{
    if(student.isPresent!==undefined ){
      alert(`This Student already added in ${student.isPresent? "Present List" : "Absent List"}`)

    }else{
      const updateStudent = students.map(item =>{
        if(item.id === student.id){
          return({...item, isPresent:false})
        }
        return item;
      });

      setStudents(updateStudent);
    }

  }

  const accidendallyAddedHandler =(student)=>{

    const updatestudent = students.map(item =>{
      if(item.id == student.id){
        return({...item, isPresent: !item.isPresent })
      }
      return(item)
    })

    setStudents(updatestudent);



  }







  return (
    <div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <input type="text" value={studentName} placeholder='Student Name' onChange={changeHandler} />
          <button type='submit'>
            {editMode ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>


      <div className="student-section">
        <div className="student-list all-student">

          <h2>All Student</h2>
          <hr></hr>

          <ul>
            {students.map(student => {
              return (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button onClick={()=>{editHandler(student)}}>Edit</button>
                  <button  onClick={()=>{removeHandler(student)}}>Remove</button>
                  <button className='absent-btn' onClick={()=>{absentHandler(student)}}>Absent</button>
                  <button className='present-btn' onClick={()=>{presentHandler(student)}}>Present</button>
                </li>

              )
            })}
          </ul>


        </div>

        <div className="student-list present-student">
          <h2>Present List</h2>
          <hr></hr>



          <ul>
            {
              students.filter(item=> item.isPresent === true).map(student =>{
                return (
                  <li key={student.id}><span>{student.name}</span> <button onClick={()=>{accidendallyAddedHandler(student)}} className='accident-button'>Accidentally Added</button></li>
                )
              })
            }
          </ul>
        </div>

        <div className="student-list absent-student">
          <h2>Absent List</h2>
          <hr></hr>

          <ul>
          {
              students.filter(item=> item.isPresent === false).map(student =>{
                return (
                  <li key={student.id}><span>{student.name}</span> <button onClick={()=>{accidendallyAddedHandler(student)}} className='accident-button'>Accidentally Added</button></li>
                )
              })
            }
          </ul>

        </div>



      </div>

    </div>
  )
}

export default App

