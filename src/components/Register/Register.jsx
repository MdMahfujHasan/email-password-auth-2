import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        // console.log(email, password, name);

        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Please enter at least one special character.');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please enter at least one capital letter.');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Please enter at least one digit.');
            return;
        }
        else if (password.length < 8) {
            setError('Please enter at least 8 characters password.');
            return;
        }

        setError('');
        setSuccess('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User has been created successfully!');
                setError('');
                event.target.reset();
                sendVerificationEmail(result.user);
                updateUsersData(result.user, name);
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    };

    const sendVerificationEmail = user => {
        sendEmailVerification(user)
            .then(() => {
                alert('Email verification sent!');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    }

    const updateUsersData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                alert('Profile update!');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <h6 className='text-center text-secondary'>Register</h6>
            <Container className="d-flex justify-content-center">
                <Form onSubmit={handleRegisterSubmit} className='w-25'>

                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Your Name" required />
                    </Form.Group>

                    <Form.Group controlId="email" className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Your Email" required />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Your Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='my-2'>
                        Register
                    </Button>
                </Form>
            </Container>
            <p className='text-center'><small>Already have an account? <Link to="/login"><button className='btn btn-link'>Login</button></Link></small></p>
            <p className='text-danger text-center mt-2'>{error}</p>
            <p className='text-success text-center mt-2'>{success}</p>
        </div>
    );
};

export default Register;
