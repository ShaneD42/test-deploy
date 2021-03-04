import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Footer from "./Footer";
import Header2 from "./Header2";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <>
            <Header2/>
            <h1 className="title">Log In To Continue</h1>
            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh"}}
            >
                <div className="container w-100" style={{ maxWidth:"400px"}} >
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} type="submit" className="btn w-100 btn-success">
                                    Login
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </Container>
            <Footer/>
        </>
    )
}