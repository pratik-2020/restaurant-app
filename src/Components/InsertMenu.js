import React, { useState } from 'react'
import { Form, FormGroup , Nav, Navbar, NavbarBrand,  Label, Input, Button, CardImg } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from './Tab';
import FormData from 'form-data';
function InsertMenu() {
  const [restaurant, setRestaurant] = useState("");
  const [menu, setMenu] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState(null);
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
                                             Menu name : 
                                         </Label>
                                     </div>
                                     <div className='col-10 col-md-7'>
                                         <Input placeholder='Menu name' onChange={(e) => setMenu(e.target.value)} />
                                     </div>
                                 </div>
                            </FormGroup>
                            <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4'>
                                         <Label>
                                             Image  : 
                                         </Label>
                                     </div>
                                     <div className='col-10 col-md-7'>
                                         <Input type='file' name='img' onChange={(e) => setUrl(e.target.files[0])} />
                                     </div>
                                 </div>
                            </FormGroup>
                            <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4'>
                                         <Label>
                                             Category : 
                                         </Label>
                                     </div>
                                     <div className='col-10 col-md-7 mb-4'>
                                         <Input placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
                                     </div>
                                 </div>
                         </FormGroup>
                            <FormGroup className='mt-4 mb-4'>
                                 <div className='row justify-content-center'>
                                     <div className='col-10 col-md-4 mb-4'>
                                         <Button onClick={() => {
                                             const formdata = new FormData();
                                             formdata.append('img', img);
                                             formdata.append('restaurant', restaurant);
                                             formdata.append('name', menu);
                                             formdata.append('category', category);
                                             axios({
                                                 url: 'http://localhost:3001/insertmenu',
                                                 method: 'POST',
                                                 data: formdata
                                             }).then((response) => {
                                                 alert(response.data);
                                             }).catch((err) => {
                                                 alert(err.message);
                                             })
                                         }}>Add Menu</Button>
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

export default InsertMenu