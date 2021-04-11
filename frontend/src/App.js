import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrarNegocio from "./views/CompanyRegistrationPage";
import UserRegistrationPage from "./views/UserRegistrationPage";
import MapPage from "./views/MapPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { Container } from 'react-bootstrap'
import AdminPage from "./views/AdminPage";
import AccountPage from "./views/AccountPage";



export default function App() {
    const [user, setUser] = useState({ name: "", email: "" });


    return (
        <Router>
            <Container fluid="true" className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/registro">
                            <UserRegistrationPage />
                        </Route>
                        <Route path="/registrarNegocio">
                            <RegistrarNegocio />
                        </Route>
                        <Route path="/mapa">
                            <MapPage />
                        </Route>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        <Route path="/cuenta">
                            <AccountPage />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </UserContext.Provider>
            </Container>
        </Router>
    );
}
