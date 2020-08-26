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
  Spinner,
  Col
} from "reactstrap";
import AuthService from "../services/auth.service";

function Login(props) {
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        props.history.push("/companylist");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };


  return (
    <>
      {console.log(squares1to6)}
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
                      <CardTitle tag="h4">Sign In</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={handleLogin} className="form">
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
                            type="password"
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
                            {loading && (
                              <Spinner color="dark" />

                            )}
                            Sign in
                        </Button>
                        </CardFooter>
                      </Form>
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


export default Login;
