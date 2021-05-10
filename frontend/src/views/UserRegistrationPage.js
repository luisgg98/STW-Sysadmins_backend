import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import UserSUForm from "../components/common/Forms/UserSignUpForm"
import {UserContext} from "../UserContext";
import {Container, Row} from "react-bootstrap";
import ZitationHeader from "../components/common/Headers/ZitationHeader";
import PageDescription from "../components/common/Widgets/PageDescription";

const UserRegistrationPage = () => {

    const { user, setUser } = useContext(UserContext);


    return (
        <Container>
            <Row className="justify-content-center mx-auto">
                <ZitationHeader className="mx-auto" />
            </Row>
            { localStorage.getItem("logged")==="true" ? (
                // <div className="Perfil">
                //     <h1>Mi cuenta registrada</h1>
                //     <p>
                //         <span>{user.email}</span>
                //         <span>{user.phone}</span>
                //     </p>
                //     <Link to="/">
                //         <button onClick={logOut}>LogOut</button>
                //     </Link>
                // </div>
                <Redirect to="/cuenta" />
            ) : (
                <div >
                    <Row className="justify-content-center">
                        <PageDescription />
                    </Row>
                    <Row className="justify-content-center">
                        <UserSUForm />
                    </Row>
                </div>

            )
            }
        </Container >
    )
};

export default UserRegistrationPage;