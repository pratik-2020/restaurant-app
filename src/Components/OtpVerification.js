import React, { useState} from 'react'
import { Form, FormGroup , Nav, Navbar, NavbarBrand,  Label, Input, Button, CardImg } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function OtpVerification() {
    const [otp, setOtp] = useState("");
    return (
        <div>
            <Nav>
                <Navbar>
                    <NavbarBrand>
                        <h1>Restaurant</h1>
                    </NavbarBrand>
                </Navbar>
            </Nav>
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
                                            OTP : 
                                        </Label>
                                    </div>
                                    <div className='col-10 col-md-7 mt-4'>
                                        <Input onChange={(e) => setOtp(e.target.value)} placeholder='Enter the otp sent to registered email id' />
                                    </div>
                                </div>
                            </FormGroup>
                                <FormGroup className='mt-4 mb-4'>
                                    <div className='row justify-content-center'>
                                        <div className='col-10 col-md-4 mb-4'>
                                            <Button onClick={() => {
                                                axios.post('http://localhost:3001/otpverification', {
                                                    email : localStorage.getItem('resemail'),
                                                    otp: otp
                                                }).then((response) => {
                                                    if(response.data === 'User can Proceed!!'){
                                                        window.location = 'http://localhost:3000/retrievetable';
                                                    }
                                                })
                                            }}>Login</Button>
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

export default OtpVerification