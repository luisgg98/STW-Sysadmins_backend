import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {getUsers} from "../../services/UsersService";

function UsersTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response.data)
        })
    }, []);


    function handleClick() {
        //TODO implementar borrado
        console.log("Cuando este implementado borrare el usuario")
    }

    return (

        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>
                            <Button variant="outline-danger" onClick={handleClick}>Borrar</Button>
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}

export default UsersTable
