import React, { useState, Component } from 'react'
import { Alert, Button, Card, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Footer from "./Footer"
import Header2 from './Header2'
import Chart from './Chart'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.pushState("/login")
        } catch {
            setError("Failed to Log Out")
        }
    }

    return (
        <>
            <Header2/>
            <h1 className="title">Welcome</h1>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh"}}
            >
                <div className="w-100" style={{ maxWidth:"400px"}}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email: </strong> {currentUser.email}
                            <Link to="/update-profile" className="btn w-100 mt-3 btn-success">
                                Update Profile
                            </Link>
                            <Link to="/main-page" className="btn w-100 mt-3 btn-success">
                                On to the Main Page!
                            </Link>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Button variant="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </div>
            </Container>
            <div>
                <Chart />
            </div>
            <Footer/>
        </>
    )
}
