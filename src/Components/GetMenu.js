import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, CardImg, CardText, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Label } from 'reactstrap';
import Tab from './Tab';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function GetMenu() {
  const [menu, setMenu] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [ordername, setOrderName] = useState([]);
  const [id, setId] = useState("");
  const [ordernamequantity, setOrderNameQuantity] = useState([]);
  let mp = new Map();
  let { table } = useParams();
  useEffect(async () => {
      axios.post('http://localhost:3001/retmenu', {
          table: table
      }).then((response) => {
          console.log(response.data)
          if(response.data != 'Table not registered!!'){
            let f = [];
             setToggle(true);
             let g = {}
            response.data.map((e,key) => {
                f.push(e);
                console.log(e)
                setOrderName([...ordername, e.name]);
                setOrderNameQuantity([...ordernamequantity, 0]);
            });
            console.log(ordernamequantity)
            console.log(order);
            setMenu(f);
          }
          else{
              alert(response.data);
          }
      })
      console.log(menu);
  }, []);
  useEffect(() => {

  },[toggle, order, ordername, ordernamequantity]);
  const renderButton = () => {
        console.log("fgh")
        if(mp.size === 0 && menu.length > 0 && !placed){
            console.log("abd")
            return(
                <div className='col-11 col-md-3 align-self-center'>
                    <Button className='mb-5' onClick={() => {
                        axios.post('http://localhost:3001/insertliveorder', {
                            rest: '',
                            tab: '',
                            status: 'Not Verified'
                        }).then((response) => {
                            if(response.data === 'Status updated'){
                                axios.post('http://localhost:3001/placeorder', {
                                    table: table,
                                    ordername: ordername,
                                    ordernamequantity: ordernamequantity
                                }).then((response) => {
                                    console.log(response.data);
                                    alert(response.data[0]);
                                    setId(response.data[1]);
                                    setPlaced(true);
                                }).catch((err) => {
                                    alert(err);
                                });
                            }
                            else{
                                alert(response.data);
                            }
                        })
                    }}>Place Order</Button>
                </div>
            );
        }
        else if (placed){
            return(
                <div className='col-11 col-md-3 align-self-center'>
                    <Button className="mb-5" onClick={() => {
                        axios.post('http://localhost:3001/retstatus', {
                            id: id
                        }).then((response) => {
                            response.data.map((e,key) => {
                                setOrder([...order, e]);
                            })
                            console.log(order);
                        }).catch((err) => {
                            alert(err.message);
                        })
                        setOpen(true);
                    }}>View Order</Button>
                </div>
            );
        }
    }
    const renderNo = (e) => {
        return(
            <h2>{order.e}</h2>
        );
    }
  const renderCard = () => {
      if(menu.length > 0 && toggle){
           return (
               <div className='row justify-content-center'>
                   {
                       menu.map((e,key) => {
                        return(
                            <div key={key} className='col-12 col-md-3 align-self-center'>
                                <Card className="shadow mb-4">
                                    <CardHeader>
                                        <CardImg src={e.url} />
                                    </CardHeader>
                                    <CardBody>
                                        {e.name}
                                    </CardBody>
                                    <CardFooter>
                                        <div className='row justify-content-center'>
                                            <div className='col-4 align-self-center'>
                                                <Button style={{backgroundColor: "white", borderRadious: "50px",color:"black"}} onClick={() => {
                                                    if(ordername.indexOf(e.name) === -1){
                                                        setOrderName([...ordername, e.name]);
                                                        console.log(e);
                                                        setOrderNameQuantity([...ordernamequantity, 1]);
                                                    }
                                                    else{
                                                        let f = [];
                                                        ordernamequantity.map((g,key) => {
                                                            f.push(g);
                                                        });
                                                        f[ordername.indexOf(e.name)]++;
                                                        setOrderNameQuantity(f);
                                                    }
                                                }}>+</Button>
                                            </div>
                                            <div className='col-4 align-self-center'>
                                                <Button style={{backgroundColor: "white", color:"black", border: "1px solid black"}}>
                                                    <h1>{ordernamequantity[ordername.indexOf(e.name)]}</h1>
                                                </Button>
                                            </div>
                                            <div className='col-4 align-self-center'>
                                                <Button style={{backgroundColor: "white", borderRadious: "1200px", color:"black"}} onClick={() => {
                                                    if( ordernamequantity[ordername.indexOf(e.name)] === 0){
                                                        alert("Cannot reduce the item!!");
                                                    }
                                                    else{
                                                        let f = []
                                                        ordernamequantity.map((g,key) => {
                                                            f.push(g);
                                                        });
                                                        f[ordername.indexOf(e.name)]--;
                                                        setOrderNameQuantity(f);
                                                    }
                                                }}>-</Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        );
                    })
                   }
               </div>
          )
      }
      else{
          return(
              <div className='col-11 align-self-center'>
                  <h1>No dish to serve!!!</h1>
              </div>
          );
      }
  }
  return (
    <div>
        <Tab />
        <Modal isOpen={open}>
            <ModalHeader>
                <h1>Your Order</h1>
                <h5>
                    Verified : {order.length>0?order[0].verified:"abc"}
                </h5>
            </ModalHeader>
            <ModalBody>
                <ListGroup>
                    {
                        () => {
                            if(order.length > 0){
                                order[0].ordername.map((e, key) => {
                                    if(order[0].verified === 'Yes'){
                                        return(
                                            <ListGroupItem>
                                                <div className='row justify-content-center'>
                                                    <div className='col-11 col-md-4'>
                                                        <Label>
                                                            <h2> {e} : </h2>
                                                        </Label>
                                                    </div>
                                                    <div className='col-11 col-md-4'>
                                                        <Label>
                                                            <h2>
                                                                {ordernamequantity[order[0].ordername.indexOf(e)]}
                                                            </h2>
                                                        </Label>
                                                    </div>
                                                    <div className='col-11 col-md-4'>
                                                        <Button style={{backgroundColor: "white", color:"black", border: "1px solid black"}} onClick={() => {
                                                            let f = [];
                                                            ordernamequantity.map((g,key) => {
                                                                f.push(g);
                                                            });
                                                            f[ordername.indexOf(e)]++;
                                                            setOrderNameQuantity(f);
                                                        }}>
                                                            +
                                                        </Button>
                                                    </div>
                                                    <div className='col-11 col-md-4'>
                                                        <Button style={{backgroundColor: "white", color:"black", border: "1px solid black"}} onClick={() => {
                                                            let f = [];
                                                            ordernamequantity.map((g,key) => {
                                                                f.push(g);
                                                            });
                                                            f[ordername.indexOf(e)]--;
                                                            setOrderNameQuantity(f);
                                                        }}>
                                                            -
                                                        </Button>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                        );
                                    }
                                })
                            }
                        }
                    }
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <div className='row justify-content-center'>
                    <div className='col-11 col-md-7'>
                        <Button onClick={() => {
                            axios.post('http://localhost:3001/updateorder', {
                                id: id,
                                ordername: ordername,
                                ordernamequantity: ordernamequantity,
                                table: table,
                                verified: 'Yes',
                                checkout: 'No'
                            }).then((response) => {
                                alert(response.data);
                            }).catch((err) => {
                                alert(err.message);
                            })
                        }}>Update Order</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
        <div className='container'>
            <div className='row justify-content-center'>
                {renderCard()}
            </div>
            <div className='row justify-content-center'>
                {renderButton()}
            </div>
        </div>
    </div>
  )
}

export default GetMenu