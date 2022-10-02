import React, { useState } from "react";
import "./BookingForm.scss";
import { Badge, Button, Card, Col, Form,  InputGroup,  Row, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from 'yup';
import { add, endOfDay, format, startOfDay, sub } from "date-fns";
import { calendarizeDate } from "../../Utils/Formatters";
import { areValidBookingDates } from "../../Utils/Validators";

const BookingForm = ({handleSubmit, thisUserExist, bookings, code}) => {
  
const schema = yup.object().shape({
  email: yup.string().email().required(),
  birthdate: yup.date().max(sub(new Date(), {years:18})).required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().required(),
  checkIn: yup.date().min(startOfDay(new Date())).required(),
  checkOut: yup.date().min(endOfDay(new Date())).required(),
});

const [show, setShow] = useState(false);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values)=>{
        if(areValidBookingDates(bookings, new Date(values.checkIn), new Date(values.checkOut))){
          handleSubmit(values);
        }else{
          setShow(true);
        }
      }}
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        birthdate: calendarizeDate(sub(new Date(), {years:18, days:1})),
        checkIn: calendarizeDate(new Date()),
        checkOut: calendarizeDate(add(new Date(), {days:1})),
        room: code
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>
            User Info
          </h3>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="validationFormik03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik04">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthdate"
                name="birthdate"
                value={values.birthdate}
                onChange={handleChange}
                isInvalid={!!errors.birthdate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthdate}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: +323 231 4564"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={touched.phoneNumber && !errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <h3>
            Booking Info
          </h3>
          <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Check-In</Form.Label>
              <Form.Control
                type="date"
                placeholder="Check-In"
                name="checkIn"
                value={values.checkIn}
                onChange={handleChange}
                isInvalid={!!errors.checkIn}
              />
              <Form.Control.Feedback type="invalid">
                {errors.checkIn}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Check-Out</Form.Label>
              <Form.Control
                type="date"
                placeholder="Check-Out"
                name="checkOut"
                value={values.checkOut}
                onChange={handleChange}
                isInvalid={!!errors.checkOut}
              />
              <Form.Control.Feedback type="invalid">
                {errors.checkOut}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Toast bg={"danger"} className="w-100" onClose={() => setShow(false)} show={show} delay={10000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Invalid Check-In/Check-Out dates!.</Toast.Body>
        </Toast>
          <Button onClick={(e)=>{
            e.preventDefault();
            handleSubmit(values);
          }} type="submit" >Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default BookingForm;