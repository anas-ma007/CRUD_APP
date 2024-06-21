
import './App.css'
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from "axios"
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import FormTable from './components/FormTable';


axios.defaults.baseURL = "http://localhost:8080"
function App() {
  const [addSection, setAddSection] = useState(true)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  })
  const [formEditData, setFormEditData] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  })
  const [dataLists, setDataLists] = useState([])

  const handelOnChange = (e) => {
    const { value, name } = e.target
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }

    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    // console.log(data.data, "axios data");
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name : "",
        email : "",
        mobile : ""
      })
    }
  }

  const getFetchData = async () => {
    let data = await axios.get("/")
    // console.log(data.data.data, "data in getFetchFunction");
    setDataLists(data.data.data)
  }
  useEffect(() => {
    getFetchData()
  }, [])
  console.log(dataLists, "data lists");


  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }
  const handelEditOnChange = async (e) => {
    const { value, name } = e.target
    setFormEditData((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }

    })
  }
  const handleEdit = async (i) => {
    console.log(i, "i log");
    setFormEditData(i)
    console.log(formEditData, "form edit data log");
    setEditSection(true)
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update", formEditData)
    console.log(data, "update data log");
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }

  return (
    <>
      <div className="container">
        <button onClick={() => setAddSection(true)} className='btn btn-add'>
          Add
        </button>

        {
          addSection && (
            <FormTable handleSubmit={handleSubmit} handelOnChange={handelOnChange} rest={formData} handleClose={() => setAddSection(false)} />
          ) 
        }

        {
          editSection && (
            <FormTable handleSubmit={handleUpdate} handelOnChange={handelEditOnChange} rest={formEditData} handleClose={() => setEditSection(false)} />

          )
        }


        {
          !addSection &&
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th> Name</th>
                  <th> Email</th>
                  <th> Mobile</th>
                  <th>
                    <button className='btn btn-edit'>Edit</button>
                    <button className='btn btn-delete'>Delete</button>
                  </th>
                </tr>
              </thead>
              {dataLists.length === 0 ? (
                <p className='no-data' >No data available..!</p>
              ) : (<tbody>
                {
                  dataLists.map((i) => {
                    return (
                      <tr key={dataLists._id}>
                        <td> {i.name}</td>
                        <td> {i.email}</td>
                        <td> {i.mobile}</td>
                        <td>
                          <button className='btn btn-editIcon' onClick={() => handleEdit(i)}><CiEdit /></button>
                          <button className='btn btn-deleteIcon' onClick={() => handleDelete(i._id)}><MdDelete /></button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>)}

            </table>
          </div>
        }


      </div>

    </>
  )
}

export default App
