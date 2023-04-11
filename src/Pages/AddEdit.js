import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import { database } from '../Context/firebase';
import { toast } from 'react-toastify';
import { set, ref, get, child, update } from 'firebase/database';


const initialState = {
  name: '',
  email: '',
  contact: ''
}

const AddEdit = () => {
  const navigate =useNavigate()
  const { id } = useParams()
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;

  useEffect(() => {
    get(child(ref(database), 'contacts')).then(val => setData(val.val()))
  }, [id])

  useEffect(() => {
    if (id) {
      setState({ ...data[id] })
    }
    else {
      setState({ ...initialState })
    }
    return () => {
      setState({ ...initialState })
    }
  }, [id, data])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('please fill the field ')
    }
    else {
      if (!id) {
        set(ref(database, 'contacts/' + Date.now()),
          state
        )
        toast.success('contact is added successfully')
      }
      else {
        update(ref(database, `contacts/${id}`),
          state
        )
        toast.success('contact is updated successfully')
        navigate('/')
      }
    }
  }


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
}

return (
  <div style={{ marginTop: '100px' }}>
    <form onSubmit={handleSubmit} style={{
      margin: 'auto',
      padding: '15px',
      maxWidth: '400px',
      alignContent: 'center'
    }}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        placeholder='Your Name.. '
        value={name || ""}
        onChange={handleInputChange}
      />
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        name='email'
        placeholder='Your Email.. '
        value={email || ""}
        onChange={handleInputChange}
      />
      <label htmlFor='contact'>Contact</label>
      <input
        type='number'
        name='contact'
        placeholder='Your Contact Number.. '
        value={contact || ""}
        onChange={handleInputChange}
      />

      <input type="submit" value={id ? "Update" : "Save"} className='btn btn-primary mt-3  w-100' />
    </form>
  </div>
)
}


export default AddEdit