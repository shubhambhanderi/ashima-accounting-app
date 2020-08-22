import React, { useState, useEffect } from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Alert,
  Col
} from "reactstrap";
import AuthService from "../services/auth.service";

function Register(props) {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [firstnameFocus, setFirstNameFocus] = useState(false);
  const [lastnameFocus, setLastNameFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", (e) => followCursor(e));
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      (e) => followCursor(e));
  }, [squares1to6, squares7and8]);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)"
    );
    setSquares7and8("perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)");
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };
  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);


    AuthService.register(firstname, lastname, username, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        props.history.push("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

  };

  return (
    <>
      <div className="wrapper register-page">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("../assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">sign up</CardTitle>
                    </CardHeader>
                    <CardBody>
                      {!successful && <Form onSubmit={handleRegister} className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": firstnameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="firstname"
                            type="text"
                            value={firstname}
                            required={true}
                            onChange={onChangeFirstname}
                            onFocus={e =>
                              setFirstNameFocus(true)
                            }
                            onBlur={e =>
                              setFirstNameFocus(false)
                            }
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": lastnameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="lastname"
                            type="text"
                            value={lastname}
                            onChange={onChangeLastname}
                            required={true}
                            onFocus={e =>
                              setLastNameFocus(true)
                            }
                            onBlur={e =>
                              setLastNameFocus(false)
                            }
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": usernameFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={onChangeUsername}
                            required={true}
                            onFocus={e => setUsernameFocus(true)}
                            onBlur={e => setUsernameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="text"
                            value={password}
                            onChange={onChangePassword}
                            required={true}
                            onFocus={e =>
                              setPasswordFocus(true)
                            }
                            onBlur={e =>
                              setPasswordFocus(false)
                            }
                          />
                        </InputGroup>
                        <CardFooter>
                          <Button type="submit" className="btn-round" color="primary" size="lg">
                            Sign Up
                        </Button>
                        </CardFooter>
                      </Form>}
                      {message && (
                        <Alert severity="error">{message}</Alert>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}


export default Register;
