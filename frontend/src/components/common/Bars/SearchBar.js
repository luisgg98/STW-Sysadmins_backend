import React, {useState} from 'react';
import {Container, Form, FormControl, InputGroup} from 'react-bootstrap';

const SearchBar = (props) => {

    const [nombre, setNombre] = useState()

    const onSearch = props.onSearch;
    const onSubmit = (e) => {
        e.preventDefault()
        onSearch(nombre)
    }

    const keyPress = (e) =>{
        if (e.key === "Escape"){
            console.log("escape pressed")
            setNombre("")
            onSearch("")
        }
        else console.log("nada")
    }

    return (
        <Container fluid="true" className="mx-auto border-0 col-7">
            <Form noValidate onSubmit={onSubmit} onKeyDown={keyPress}>
                <Form.Group controlId="barraBusqueda">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Zitation Search</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Search service"
                            aria-label="Search service"
                            aria-describedby="basic-addon1"
                            type="text"
                            value={nombre}
                            onChange={(e) => {
                                console.log("valoronchange", e.target.value)
                                setNombre(e.target.value)
                            }}
                        />
                    </InputGroup>
                </Form.Group>
            </Form>
        </Container>
    );
};



export default SearchBar;