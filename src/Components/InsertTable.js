import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup , Nav, Navbar, NavbarBrand,  Label, Input, Button, CardImg } from 'reactstrap';
import axios from 'axios';
import Tab from './Tab';
function InsertTable() {
    const [restaurant, setRestaurant] = useState("");
    const [table, setTable] = useState(0);
  return (
      <div>
        <Tab />
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-10 align-self-center'>
                    <CardImg className='shadow-lg' src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' style={{ width: '50%', height: '50%'}} />
                </div>
            </div>
              <div className='row justify-content-center'>
                 <div className='col-10 align-self-center'>
                     <Form className='shadow-lg'>
                         <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4 mt-4'>
                                         <Label>
                                             Restaurant id : 
                                         </Label>
                                     </div>
                                     <div className='col-10 col-md-7 mt-4'>
                                         <Input onChange={(e) => setRestaurant(e.target.value)} placeholder='Restaurant id' />
                                     </div>
                                 </div>
                            </FormGroup>
                            <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4'>
                                         <Label>
                                             Number of Table : 
                                         </Label>
                                     </div>
                                     <div className='col-10 col-md-7'>
                                         <Input type='number' placeholder='Menu name' onChange={(e) => setTable(e.target.value)} />
                                     </div>
                                 </div>
                            </FormGroup>
                            <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4 mb-4'>
                                         <Button onClick={() => {
                                             for(var i = 0; i<table; i++){
                                                axios.post('http://localhost:3001/inserttable', {
                                                    restaurant : restaurant
                                                }).then()
                                             }
                                             alert('All tables are added');
                                         }}>Add Table</Button>
                                     </div>
                                 </div>
                         </FormGroup>
                     </Form>
                 </div> 
              </div>
          </div>
      </div>
  )
}

export default InsertTable