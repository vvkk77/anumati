import React from 'react';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';
import Register from './Register';
import '../Login.css';
import api from '../api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registered: true,

        };
    }

    loginEval = async (params) => {
        const { email, password } = params;
        const { data } = await api.signIn(email, password);

        localStorage.setItem('auth', data.authToken);
        // to send - authToken, organizationId, organization,
        this.props.onLogin(data.accountID, data.authToken, data.organizationID);
    };

    openRegistrationForm = () => {
        this.setState({ registered: false });
    };

    hideRegistrationForm = () => {
        this.setState({ registered: true });
    };

    render() {
        if (!this.state.registered) {
            return <Register onRegister={this.hideRegistrationForm}></Register>;
        }
        return (
            <div className='form-container'>
                <Formik
                    className='login-form'
                    initialValues={{ email: '', password: '' }}
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

                        return errors;
                    }}
                    onSubmit={this.loginEval}>
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type='email' name='email' placeholder='Email ID' />
                            <ErrorMessage name='email' component={FormErrorMessage} />

                            <Field type='password' name='password' placeholder='Create Password' />
                            <ErrorMessage name='password' component={FormErrorMessage} />

                            <br></br>

                            <Button
                                variant='primary'
                                size='lg'
                                type='submit'
                                disabled={isSubmitting}>
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>

                <div onClick={this.openRegistrationForm} className='create-acc-link'>
                    Create a new account
                </div>
            </div>
        );
    }
}

export default Login;
