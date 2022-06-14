import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavbarBrand, Card, CardBody, Button, CardFooter, CardText } from 'reactstrap';
import axios from 'axios';
import Tab from './Tab';
function Order() {
    const [order, setOrder] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/retrieveorder', {
            id: localStorage.getItem('restable')
        }).then((response) => {
            let g = [];
            response.data.map((e,key) => {
                g.push(e);
            });
            setOrder(g);
        })
    }, [order]);
  return (
      <div>
          <Tab />
            <div className='container'>
                <div className='row justify-content-center'>
                    {
                        order.map((e,key) => {
                            if(e.checkout === 'No'){
                                return(
                                    <div className='col-11 col-md-3'>
                                        <Card key={key} className='shadow mt-3'>
                                            <CardBody>
                                                {
                                                    // Object.keys(e.order).map((g,ke) => {
                                                    //     return(
                                                    //         <div key={ke} className='row justify-content-center'>
                                                    //             <div className='col-7'>
                                                    //                 {g}
                                                    //             </div>
                                                    //             <div className='col-4'>
                                                    //                 {e.order[g]}
                                                    //             </div>
                                                    //         </div>
                                                    //     );
                                                    // })
                                                    e.ordername.map((g,ke) => {
                                                        return(
                                                            <div key={ke} className='row justify-content-center'>
                                                                 <div className='col-7'>
                                                                     <h4> {g} : </h4>
                                                                 </div>
                                                                 <div className='col-4'>
                                                                     {e.ordernamequantity[e.ordernam.indexOf(g)]}
                                                                 </div>
                                                             </div>
                                                        );
                                                    })
                                                }
                                            </CardBody>
                                            <CardFooter>
                                                <Button onClick={() => {
                                                    let v = {
                                                        _id: e._id,
                                                        table: e.table,
                                                        ordername: e.ordername,
                                                        ordernamequantity: e.ordernamequantity,
                                                        checkout: 'Yes'
                                                    }
                                                    axios.post('http://localhost:3001/checkout', {
                                                        id: e._id,
                                                        order: v
                                                    }).then((response) => {
                                                        axios.post('http://localhost:3001/deleteliveorder', {
                                                            table: localStorage.getItem('restable')
                                                        }).then((resp) => {
                                                            
                                                        })
                                                        alert(response.data);
                                                    }).catch((err) => {
                                                        alert(err.mesage);
                                                    })
                                                }}>Checkout</Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                );
                            }
                            else{
                                return(
                                    <div className='col-11 col-md-3'>
                                        <Card key={key}>
                                            <CardBody>
                                                {
                                                    Object.keys(e.order).map((g,ke) => {
                                                        return(
                                                            <div key={ke} className='row justify-content-center'>
                                                                <div className='col-7'>
                                                                    {g}
                                                                </div>
                                                                <div className='col-4'>
                                                                    {e.order[g]}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
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

export default Order