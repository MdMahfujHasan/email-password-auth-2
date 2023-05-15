import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        setError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                // console.log(result.user);
                if (!result.user.emailVerified) {
                    alert('Email is not verified!');
                    return;
                }
                setSuccess('Logged in successfully!');
                setError('');
                event.target.reset();
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })
    };

    const handleResetPassword = () => {
        // console.log(emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide an email address.');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <h6 className='text-center text-secondary'>Login</h6>
            <Container className="d-flex justify-content-center">
                <Form onSubmit={handleLoginSubmit} className='w-25'>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" ref={emailRef} placeholder="Your Email" required />
                    </Form.Group>

                    <Form.Group controlId="password" className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Your Password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
            <p className='text-center'><button onClick={handleResetPassword} className='btn btn-link'><small>Forgotten password?</small></button></p>
            <p className='text-center'><small>New user? <Link to="/register"><button className='btn btn-link'>Register</button></Link></small></p>
            <p className='text-danger text-center'>{error}</p>
            <p className='text-success text-center'>{success}</p>
        </div>
    );
};

export default Login;