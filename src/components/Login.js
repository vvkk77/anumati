import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import '../Login.css';

class Login extends React.Component {

    render() {
        return(
            <div>
                <Formik
                    className="login-form"
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor="email" style={{ display: "block" }}>
                                Email
                            </label>
                            <Field
                                label="Email ID"
                                type="email"
                                name="email"
                                placeholder="Enter Email ID" />
                            <ErrorMessage name="email" component="div" />
                            <label htmlFor="password" style={{ display: "block" }}>
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                label="Password" />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" disabled={isSubmitting} style={{ display: "block" }}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Login;