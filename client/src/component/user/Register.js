import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import axios from "../../config/Axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "../Header";
import "../../App.css";

function UserRegister(props) {
  console.log("register - ", props);
  return (
    <div>
      <Header {...props} />
      <div className="container-fluid p-0">
        <div className="background_img">
          <div className="layer">
            <div className="container">
              <div className="row">
                <div className="offset-8 col-md-4">
                  <div className="register_background">
                    <Formik
                      initialValues={{ username: "", email: "", password: "" }}
                      validationSchema={Yup.object().shape({
                        username: Yup.string().required("Username is required"),
                        email: Yup.string()
                          .email("email is invalid")
                          .required("email is required"),
                        password: Yup.string().required("Password is required"),
                      })}
                      onSubmit={(values) => {
                        axios
                          .post("/users/register", values)
                          .then((response) => {
                            const { user, errors } = response.data;
                            if (user) {
                              props.history.push("/login");
                            } else {
                              alert("Error");
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                            />
                            <div className="errors">
                              {errors.username &&
                                touched.username &&
                                errors.username}
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <div className="errors">
                              {errors.email && touched.email && errors.email}
                            </div>
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <div className="errors">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </div>
                          </FormGroup>
                          <Button type="submit">Submit</Button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect()(UserRegister);
