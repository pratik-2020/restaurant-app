import React, { useState, useEffect} from 'react'
import { Card, CardImg, CardBody, Nav, Navbar, NavbarBrand, CardHeader, CardFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Tab from './Tab';
import { AiFillDelete } from 'react-icons/ai';
function RetrieveMenu() {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/getmenu', {
            restaurant: 'Hotel ABC164570161962924'
        }).then((response) => {
            let g = [];
            response.data.map((e,key) => {
                g.push(e);
            });
            setMenu(g);
        })
    }, [menu]);
    const renderMeun = () => {
                console.log(menu.length)
                if(menu.length > 0){
                    return(
                        menu.map((e,key) => {
                            console.log('hi')
                            return(
                                <div key={key} className='col-11 col-md-3'>
                                    <Card key={key} className='shadow-lg p-3 mb-5 mr-auto ml-3 bg-body rounded align-self-center'>
                                        <CardHeader>
                                            <h2>{e.name}</h2>
                                            <CardImg src={e.url} style={{width:'70%', height:'70%'}} />
                                        </CardHeader>
                                        <CardBody>
                                            <h3>{e.category}</h3>
                                        </CardBody>
                                        <CardFooter>
                                            <AiFillDelete onClick={() => {
                                                axios.post('http://localhost:3001/deletemenu', {
                                                    menuid: e._id
                                                }).then((response) => {
                                                    alert(response.data);
                                                }).catch((err) => {
                                                    alert(err.message);
                                                })
                                            }} />
                                        </CardFooter>
                                    </Card>
                                </div>
                            );
                        })
                    );
                }
                else{
                    return(
                        <div>scfvsnlvksvc</div>
                    );
                }
            }
  return (
      <div>
          <Tab />
          <div className='container px-4'>
              <div className='row jusify-content-center gx-5'>
                  {renderMeun()}
              </div>
          </div>
      </div>
  )
}

export default RetrieveMenu