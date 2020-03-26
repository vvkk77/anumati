import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

import '../Login.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    registerEval = async () => {
        this.props.onRegister();
    };

    render() {
        return (
            <div className='form-container'>
                <Formik
                    className='login-form'
                    initialValues={{ email: '', organization: '', password: '', cpassword: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        if (!values.organization) {
                            errors.organization = 'Required';
                        }

                        if (!values.cpassword) {
                            errors.cpassword = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={this.registerEval}>
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type='text' name='name' placeholder='Your Name' />
                            <ErrorMessage name='name' component={FormErrorMessage} />

                            <Field
                                type='email'
                                name='email'
                                placeholder='Email ID (will be your username)'
                            />
                            <ErrorMessage name='email' component={FormErrorMessage} />

                            <Field
                                type='text'
                                name='organization'
                                placeholder='Organization name'
                            />
                            <ErrorMessage name='organization' component={FormErrorMessage} />

                            <Field type='password' name='password' placeholder='Create Password' />
                            <ErrorMessage name='password' component={FormErrorMessage} />

                            <Field
                                type='password'
                                name='cpassword'
                                placeholder='Confirm Password'
                            />
                            <ErrorMessage name='cpassword' component={FormErrorMessage} />
                            <br></br>

                            <Button
                                variant='primary'
                                size='lg'
                                type='submit'
                                disabled={isSubmitting}>
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Register;
