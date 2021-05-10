import React, {useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import {useForm} from 'react-hook-form';
import GenericAlert from "../Widgets/GenericAlert";
import {updateUserData} from "../../../services/UsersService"
import {useHistory} from "react-router";

const EditUserInfo = (props) => {

    const [update, setUpdate] = useState(false)
    const [error, setErrorr] = useState(false)

    const [formValue, setForm] = useState({
        first_name: "",
        last_name: "",
        password: "",
    });


    const { formState: { errors, touchedFields, isSubmitted }, register, setError, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            first_name: "",
            last_name: "",
            password: ""
        }
    });


    const history = useHistory();


    const onSubmit = async (e) => {
        let modifica = false;
        console.log("form", formValue)
        console.log("id", props.id)
        let newData = {}
        console.log("new data antes de modif", newData)
        if (formValue.first_name !== "") {
            modifica = true;
            newData = { ...newData, first_name: formValue.first_name }
            console.log("new data if name ", newData)
        }
        if (formValue.last_name !== "") {
            modifica = true;
            newData = { ...newData, last_name: formValue.last_name }
            console.log("new data if lastname", newData)
        }
        if (formValue.password !== "") {
            modifica = true;
            newData = { ...newData, password: formValue.password }
            console.log("new data if pass", newData)
        }
        console.log("new data", newData)
        if (modifica) {
            const devuelto = await updateUserData(props.id, newData)
            console.log(devuelto)
            setUpdate(devuelto.update)
            setErrorr(devuelto.error)
        }
        localStorage.setItem("user", {})
        localStorage.setItem("logged", false)
        localStorage.setItem("token", "")
        history.push('/login')
    }

    return (
        <div className="justify-content-center mx-auto" >
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formSUFName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="Nombre"
                        value={formValue.first_name}
                        {...register("first_name", {
                            maxLength: { value: 20, message: "Máximo superado" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, first_name: e.target.value })
                            if (errors.first_name) {
                                setError("first_name", { type: "manul", message: errors.first_name.message })
                            }
                        }}
                        isInvalid={errors.first_name && touchedFields.first_name} />
                    {errors.first_name && <Form.Control.Feedback type="invalid">{errors.first_name.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formSULName">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={formValue.lanme}
                        {...register("last_name", {
                            maxLength: { value: 50, message: "Máximo superado" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, last_name: e.target.value })
                            if (errors.last_name) {
                                setError("last_name", { type: "manul", message: errors.last_name.message })
                            }
                        }}
                        isInvalid={errors.last_name && touchedFields.last_name} />
                    {errors.last_name && <Form.Control.Feedback type="invalid">{errors.last_name.message}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group controlId="formSUnewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nueva contraseña"
                        name="password"
                        value={formValue.password}
                        {...register("password", {
                            // validate: {value: getValues().password === getValues().password, message: "Las contrasenas no coinciden"}, 
                            minLength: { value: 8, message: "minimo 8 carácteres" },
                            pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, message: "Debe contener mayus, números y simbolos" }
                        })}
                        onChange={(e) => {
                            setForm({ ...formValue, password: e.target.value })
                            if (errors.password) {
                                setError("password", { type: "manul", message: errors.password.message })
                            }
                        }
                        }
                        isInvalid={errors.password && touchedFields.password} />
                    {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
                </Form.Group>
                <div>
                    {!error && update && <GenericAlert className="py-5 my-5" mensaje="Operación Exitosa" tipo="success" />}
                </div>
                {error && isSubmitted && !update && <GenericAlert className="py-5 my-5" mensaje="Error actualizando datos" tipo="danger" />}
                {isSubmitted && !touchedFields.first_name && !touchedFields.last_name && !touchedFields.password && <GenericAlert className="py-5 my-5" mensaje="Rellene el formulario" tipo="danger" />}
                <Row></Row>
                <Row className="justify-content-center mx-auto ">
                    <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Confirmar</Button>
                </Row>
            </Form>
        </div>
    )
}

export default EditUserInfo;