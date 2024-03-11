import React, { useState, useRef } from 'react';
import { Container, Col, Form, Button, InputGroup } from "react-bootstrap";
import { container, input1, input2, submitBtn, hiddenButton } from "../login/LoginUser1.module.css";
import { alertcustom } from '../../utils/alertCustom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginUser = () => {
  const formDataRef = useRef({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current = {
      ...formDataRef.current,
      [name]: value
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formDataRef.current.email) {
      newErrors.email = 'Ingrese su email';
    }

    if (!formDataRef.current.password) {
      newErrors.password = 'Ingrese su contrseña';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formDataRef);
      alertcustom("logueado", "Felicidades", "successfull")
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Col id={container} className="d-flex"  >
      <Container>
        <div className="d-flex justify-content-center aling-items-center my-3 pb-3 border border-light border-0 border-bottom">
          <div className="ms-4 text-center">
            <h1 className="display-5 fw-semibold text-black"> Login</h1>
          </div>
        </div>


        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='fw-bold text-black'>Email address</Form.Label>
            <Form.Control
              id={input1}
              type="email"
              placeholder="Enter email"
              name='email'
              defaultValue={formDataRef.current.email}
              onChange={handleChange}
              isValid={formDataRef.current.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-bold text-black">password</Form.Label>
            <InputGroup>
            <Form.Control
              id={input2}
              type={passwordVisible ? "text" : "password"}
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
              name='password'
              defaultValue={formDataRef.current.password}
              onChange={handleChange}
              isValid={formDataRef.current.password && !errors.password}
              isInvalid={!!errors.password}
              />
            <div className="input-group-append">
              <button
                id={hiddenButton}
                type="button"
                className="toggle-password-visibility"
                onClick={togglePasswordVisibility}
                
              >
                 <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </button>
            </div></InputGroup>

            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>          
            <Form.Control.Feedback type='valid'>
            </Form.Control.Feedback>

          </Form.Group>

          <div className="fw-bold text-black">¿Todavía no te registraste?
            <a className="m-1" href="/register">Regístrate ahora</a>
          </div>

          <Button
            id={submitBtn}
            className="my-3"
            variant="primary"
            type="submit">Login
          </Button>
        </Form>
      </Container>
    </Col>
  )
};

export default LoginUser;