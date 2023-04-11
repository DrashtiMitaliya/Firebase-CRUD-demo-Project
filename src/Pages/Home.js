import React, { useState, useEffect } from 'react';
import { database } from '../Context/firebase';
import { Link } from 'react-router-dom';
import { get, ref, child, remove } from "firebase/database";
import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import {GrView} from 'react-icons/gr'

import './Home.css'
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), 'contacts')).then(val => setData(val.val()))
  }, [])

  const onDelete = (id) => {
    if (window.confirm('Are You sure that You wanted to delete that contact?')) {
      remove(ref(database, 'contacts/' + id)).then(() => {
        toast.success('contact deleted successfully')
      }).catch(() => {
        toast.error('can not delete data')
      })
    }
  }

  return (
    <div className='container-fluid mt-5 '>
      <table className='styled-table'>
        <thead>
          <tr>
            <th className='text-center'> Number</th>
            <th className='text-center'> Name</th>
            <th className='text-center'> Email</th>
            <th className='text-center'> Contact</th>
            <th className='text-center'> Action</th>
          </tr>
        </thead>
        <tbody>

          {data && Object.keys(data).map((id, index) => {

            return (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='button btn-edit'><FaEdit size={20}/></button>
                  </Link>

                  <button className='button btn-delete '
                    onClick={() => onDelete(id)}>
                    <MdDelete size={20}/>
                  </button>

                  <Link to={`/view/${id}`}>
                    <button className='button btn-view'><GrView size={20}/></button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home