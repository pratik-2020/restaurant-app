import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardImg, Button, CardBody, Card,  Nav, Navbar, NavbarBrand, Modal, ModalBody, ModalHeader, ModalFooter, CardHeader } from 'reactstrap';
import axios from 'axios';
import QRCode from 'react-qr-code';
import Tab from './Tab';
function Register() {
    const [table, setTable] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [oder, setOder] = useState([]);
    const [live, setLive] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/gettable', {
            email: localStorage.getItem('resemail')
        }).then((response) => {
            let g = [];
            response.data.map((e,key) => {
                g.push(e);
            });
            setTable(g);
        });
        axios.post('http://localhost:3001/getliveorder', {
            email: localStorage.getItem('resemail')
        }).then((response) => {
            if(response.data === 'User not registered'){
                alert(response.data);
            }
            else{
                let h = [];
                console.log(response.data);
                response.data.map((e,key) => {
                    h.push(e.table);
                });
                setLive(h);
            }
        })
    }, [live]);
  return (
      <div>
          <Tab />
            <div className='container'>
                <div className='row justiy-content-center'>
                    <div className='col-11 align-self-center'>
                        <CardImg className='shadow-lg' src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' style={{ width: '50%', height: '50%'}} />
                    </div>
                </div>
                <div className='row justify-content-center'>
                {
                    table.map((e,key) => {
                        if(live.length > 0 && live.includes(e._id) && live[live.includes(e._id)].status === 'Verified'){
                            return(
                                <div key={key} className='col-11 col-md-3 mt-5'>
                                    <Card key={key} className='shadow-lg p-3 mb-5 mr-auto ml-3 bg-body rounded align-self-center' style={{borderColor: 'green'}} onClick={() => {
                                        localStorage.setItem('restable', e._id);
                                        window.location = 'http://localhost:3000/order';
                                    }} >
                                        <CardHeader>
                                            <QRCode value={'http://localhost:3001/order/'+e._id}  />
                                        </CardHeader>
                                        <CardBody>
                                            {e._id}
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        }
                        else if(live.length > 0 && live.includes(e._id) && live[live.includes(e._id)].status === 'Not Verified') {
                            return(
                                <div key={key} className='col-11 col-md-3 mt-5'>
                                    <Card key={key} className='shadow-lg p-3 mb-5 mr-auto ml-3 bg-body rounded align-self-center' style={{borderColor: 'yellow'}} onClick={() => {
                                        localStorage.setItem('restable', e._id);
                                        window.location = 'http://localhost:3000/order';
                                    }}>
                                        <CardHeader>
                                            <QRCode value={'http://localhost:3001/order/'+e._id}  />
                                        </CardHeader>
                                        <CardBody>
                                            {e._id}
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        }
                        else{
                            return(
                                <div key={key} className='col-11 col-md-3 mt-5'>
                                    <Card key={key} className='shadow-lg p-3 mb-5 mr-auto ml-3 bg-body rounded align-self-center' onClick={() => {
                                        localStorage.setItem('restable', e._id);
                                        window.location = 'http://localhost:3000/order';
                                    }}>
                                        <CardHeader>
                                            <QRCode value={'http://localhost:3001/order/'+e._id}  />
                                        </CardHeader>
                                        <CardBody>
                                            {e._id}
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        }
                    })
                }
                </div>
            </div>
      </div>
  )
}

export default Register