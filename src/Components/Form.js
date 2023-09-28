import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import array from './Array';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateOrUpdate() {
    const { id } = useParams();
    const history = useNavigate();

    // State variables to store form data
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        age: Yup.number().required('Age is required').positive('Age must be a positive number'),
        dateOfBirth: Yup.string().required('DateOfBirth is required'),
        designation: Yup.string().required('Designation is required'),
        experience: Yup.number().required('Experience is required').positive('Experience must be a positive number'),
        expectedSalary: Yup.number().required('Expected Salary is required').positive('Expected Salary must be a positive number'),
    });

    useEffect(() => {
        if (id) {
            // If an id is provided, fetch the existing data
            const entry = array.find(item => item.id === id);
            console.log(entry);
            if (entry) {
                formik.setValues({
                    name: entry.Name || '',
                    age: entry.Age || '',
                    dateOfBirth: entry.DateOfBirth || '',
                    designation: entry.Designation || '',
                    experience: entry.Experience || '',
                    expectedSalary: entry.ExpectedSalary || 0,
                });
            } else {
                // Handle entry not found, you can redirect to an error page or handle it differently.
                // For now, we'll just go back to the home page.
                history('/');
            }
        }
    }, [id, history]);

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            dateOfBirth: '',
            designation: '',
            experience: '',
            expectedSalary: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here...

            if (id) {
                // Update logic
                const updatedArray = array.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            Name: values.name,
                            Age: values.age,
                            DateOfBirth: values.dateOfBirth,
                            Designation: values.designation,
                            Experience: values.experience,
                            ExpectedSalary: values.expectedSalary,
                        };
                    }
                    return item;
                });

                array.splice(0, array.length, ...updatedArray);
            } else {
                // Create logic
                const newId = uuid();
                const newEntry = {
                    id: newId.slice(0, 8),
                    Name: values.name,
                    Age: values.age,
                    DateOfBirth: values.dateOfBirth,
                    Designation: values.designation,
                    Experience: values.experience,
                    ExpectedSalary: values.expectedSalary,
                };

                array.push(newEntry);
            }

            // Update local storage
            // localStorage.setItem('array', JSON.stringify(array));

            // Redirect to the home page after updating or creating
            history('/');
        },
    });

    return (
        <div style={{ backgroundImage: 'url("https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHx8fDE2OTU3MTE4OTh8MA&ixlib=rb-4.0.3")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='container w-50 mt-5 p-0' style={{ position: 'absolute' }}>
                <Form className="bg-light p-5 rounded-3 " style={{}}>
                    <h3 className='text-center text-primary mb-3'>Employee Form</h3>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && formik.errors.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.age && formik.errors.age}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.age}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDesignation">
                        <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            name="dateOfBirth"
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDesignation">
                        <Form.Control
                            type="text"
                            placeholder="Designation"
                            name="designation"
                            value={formik.values.designation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.designation && formik.errors.designation}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.designation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExperience">
                        <Form.Control
                            type="number"
                            placeholder="Experience"
                            name="experience"
                            value={formik.values.experience}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.experience && formik.errors.experience}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.experience}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExpectedSalary">
                        <Form.Control
                            type="number"
                            placeholder="Expected Salary"
                            name="expectedSalary"
                            value={formik.values.expectedSalary}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.expectedSalary && formik.errors.expectedSalary}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.expectedSalary}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button
                            onClick={formik.handleSubmit}
                            variant="primary"
                            type="submit"
                        >
                            {id ? 'Update' : 'Submit'}
                        </Button>

                        {/* Redirecting back to home page */}
                        <Link className="ms-3" to='/'>
                            <Button variant="info" size="lg">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreateOrUpdate;
