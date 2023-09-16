import { Card, CardBody, CardHeader, Container, Form, FormGroup ,Label,Input, Button,Row,Col,FormFeedback} from "reactstrap";
import Base from "../components/Base";
import React, { useEffect, useState } from 'react';
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
const Signup = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  useEffect(()=>{
    console.log(data);
  },[data])

  //handlechange
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });


    
  };

  //reseting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

   //submit the form
   const submitForm = (event) => {
    event.preventDefault();


    
    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   setError({...error,isError:false})
    //   return;
    // }

    console.log(data)
   
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
     
        toast.success("User is registered successfully !! with userId"+resp.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
       });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   setError({...error,isError:false})
    //   return;
    // }

   }
    return (
       <Base>
        <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(data) } */}
        
        <Col sm={{ size: 6, offset: 3 }}>
            <Card>

                <CardHeader>
                <h1>Register here !!!!</h1>
                </CardHeader>
                <CardBody>
                   <Form onSubmit={submitForm}>
                    <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name ? true : false}
                      />
                       <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                      
                    </FormGroup>

                    <FormGroup>
                    <Label for="emali">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter Here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                      />
                      <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                      
                    </FormGroup>
                   
                    
                   <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                      />
                     
                    </FormGroup>
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>

                    <FormGroup>
                    <Label for="about">Enter About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter Here"
                      id="about"
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                      />
                      
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                      
                    </FormGroup>

                    <FormGroup>
                       <Container className="text-center">
                        <Button color="dark">Register</Button>
                        <Button color="secondary" type="reset"  className="ms-2" onClick={resetData}>Reset</Button>
                       </Container>

                    </FormGroup>

                   </Form>
                </CardBody>
            </Card>
            </Col>
            </Row>
        </Container>
       </Base>
       
    );

};

export default Signup;