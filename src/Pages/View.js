import React, { useEffect, useState } from 'react';
import { database } from '../Context/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { Button } from 'react-bootstrap';
// import './View.css';
import Card from 'react-bootstrap/Card';

const View = () => {
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    get((ref(database, 'contacts/' + id)))
      .then((val) => {
        setUser(val.val())
      })
      .catch(() => {
        setUser({})
      })

  }, [id])

 
  return (
    <>
      {
        user && <div className='container mt-5'>
          <div className="row m-auto">
            <Card className="w-75 m-auto p-0">
              <Card.Header className='m-0' ><h2 className='text-dark p-1'>Contact Details</h2></Card.Header>
              <Card.Body className='text-center font-weight-normal'>

                <Card.Text> Id : {id}</Card.Text>
                <Card.Text> Name : {user.name}</Card.Text>
                <Card.Text> Email : {user.email} </Card.Text>
                <Card.Text> Contact No :{user.contact} </Card.Text>

              </Card.Body>

              <Card.Footer ><Button className="btn-primary w-25 m-auto  " onClick={()=>{navigate('/')}}>Go Back</Button> </Card.Footer>
            </Card>
          </div>
        </div>
      }
    </>
  )
}

export default View