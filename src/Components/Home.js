import React, { useState } from 'react';
import { Button, Table, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import array from './Array';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    let history = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(array);

    // Function for deleting an entry
    function deleted(id) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        history('/');
    }

    // Filter the data based on the search query
    const filteredData = data.filter(item => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            item.Name.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Age.toString().includes(searchQuery) ||
            item.DateOfBirth.includes(searchQuery) ||
            item.Designation.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Experience.toString().includes(searchQuery) ||
            item.ExpectedSalary.toString().includes(searchQuery)
        );
    });

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?cs=srgb&dl=pexels-pixabay-235985.jpg&fm=jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

            <div className='container'>
                <h1 className='text-center text-white'>Table</h1>
                <div className="d-flex justify-content-between mb-3">
                    <Form className="mb-0">
                        <InputGroup> {/* Wrap the input in InputGroup */}
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <InputGroup.Text><i className='bx bx-search'></i></InputGroup.Text> {/* Add the search icon */}
                        </InputGroup>

                    </Form>
                    <Link to='/create'>
                        <Button variant="success" size="lg"><i className='bx bx-plus'></i> Add</Button>
                    </Link>
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Date of Birth</th>
                            <th>Designation</th>
                            <th>Experience</th>
                            <th>Expected Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Age}</td>
                                    <td>{item.DateOfBirth}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Experience}</td>
                                    <td>{item.ExpectedSalary}</td>
                                    <td className='d-flexx'>
                                        <Link to={`/edit/${item.id}`}>
                                            <Button variant="primary">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => deleted(item.id)}
                                            className='ms-3'
                                            variant="danger">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Home;
