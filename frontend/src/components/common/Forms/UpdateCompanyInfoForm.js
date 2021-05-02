import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap"
import GenericAlert from '../Widgets/GenericAlert';
import LoadingSpinner from '../Widgets/LoadingSpinner';
import TimePicker from 'react-bootstrap-time-picker'
import { loginUser } from '../../../services/UsersService';

const UpdateCompanyInfoForm = () => {

    // Datos del formulario
    const [loading, setLoading] = useState(false);
    const [formValue, setForm] = useState({
        description: "",
        service_duration: 0,
        schedule: "",
        password: ""
    });


    const [dobleturno, setDobleturno] = useState(false)

    // Mensaje de error
    const [apiError, setApiError] = useState(false);




    const { formState: { errors, touchedFields }, register, setError, reset, handleSubmit } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            description: "",
            service_duration: 0,
            schedule: "",
            password: ""
        }
    });

    const [mon_op, setMon_op] = useState([])
    const [tue_op, setTue_op] = useState([])
    const [wed_op, setWed_op] = useState([])
    const [thu_op, setThu_op] = useState([])
    const [fri_op, setFri_op] = useState([])
    const [sat_op, setSat_op] = useState([])
    const [sun_op, setSun_op] = useState([])

    const [mon_cl, setMon_cl] = useState([])
    const [tue_cl, setTue_cl] = useState([])
    const [wed_cl, setWed_cl] = useState([])
    const [thu_cl, setThu_cl] = useState([])
    const [fri_cl, setFri_cl] = useState([])
    const [sat_cl, setSat_cl] = useState([])
    const [sun_cl, setSun_cl] = useState([])

    const [mon_op_2, setMon_op_2] = useState([])
    const [tue_op_2, setTue_op_2] = useState([])
    const [wed_op_2, setWed_op_2] = useState([])
    const [thu_op_2, setThu_op_2] = useState([])
    const [fri_op_2, setFri_op_2] = useState([])
    const [sat_op_2, setSat_op_2] = useState([])
    const [sun_op_2, setSun_op_2] = useState([])

    const [mon_cl_2, setMon_cl_2] = useState([])
    const [tue_cl_2, setTue_cl_2] = useState([])
    const [wed_cl_2, setWed_cl_2] = useState([])
    const [thu_cl_2, setThu_cl_2] = useState([])
    const [fri_cl_2, setFri_cl_2] = useState([])
    const [sat_cl_2, setSat_cl_2] = useState([])
    const [sun_cl_2, setSun_cl_2] = useState([])

    const TablaHorario = (props) => {
        const { texto, open, close, array } = props;
        return (
            <Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>{texto}</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miercoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sábado</th>
                            <th>Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Horario apertura {open}</td>
                            {array === 0 && <td> <TimePicker onChange={time => setMon_op(time)} value={mon_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setTue_op(time)} value={tue_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setWed_op(time)} value={wed_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setThu_op(time)} value={thu_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setFri_op(time)} value={fri_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setSat_op(time)} value={sat_op} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setSun_op(time)} value={sun_op} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setMon_op_2(time)} value={mon_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setTue_op_2(time)} value={tue_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setWed_op_2(time)} value={wed_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setThu_op_2(time)} value={thu_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setFri_op_2(time)} value={fri_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setSat_op_2(time)} value={sat_op_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setSun_op_2(time)} value={sun_op_2} step={30} format={24} /> </td>}

                        </tr>
                        <tr>
                            <td>Horario cierre {close} </td>
                            {array === 0 && <td> <TimePicker onChange={time => setMon_cl(time)} value={mon_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setTue_cl(time)} value={tue_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setWed_cl(time)} value={wed_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setThu_cl(time)} value={thu_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setFri_cl(time)} value={fri_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setSat_cl(time)} value={sat_cl} step={30} format={24} /> </td>}
                            {array === 0 && <td> <TimePicker onChange={time => setSun_cl(time)} value={sun_cl} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setMon_cl_2(time)} value={mon_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setTue_cl_2(time)} value={tue_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setWed_cl_2(time)} value={wed_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setThu_cl_2(time)} value={thu_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setFri_cl_2(time)} value={fri_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setSat_cl_2(time)} value={sat_cl_2} step={30} format={24} /> </td>}
                            {array === 1 && <td> <TimePicker onChange={time => setSun_cl_2(time)} value={sun_cl_2} step={30} format={24} /> </td>}

                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
        )
    }



    const onSubmit = async () => {
        setForm({
            ...formValue, schedule: {
            "monday": {
                "open_1": new Date(mon_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(mon_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(mon_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(mon_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "tuesday": {
                "open_1":  new Date(tue_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(tue_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(tue_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(tue_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "wednesday": {
                "open_1":  new Date(wed_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(wed_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(wed_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(wed_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "thursday": {
                "open_1":  new Date(thu_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(thu_cl * 1000).toISOString().substr(11, 5),
                "open_2":  new Date(thu_op_2 * 1000).toISOString().substr(11, 5),
                "close_2": new  Date(thu_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "friday": {
                "open_1":  new Date(fri_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(fri_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(fri_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(fri_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "saturday": {
                "open_1":  new Date(sat_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(sat_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(sat_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(sat_cl_2 * 1000).toISOString().substr(11, 5)
            },
            "sunday": {
                "open_1":  new Date(sun_op * 1000).toISOString().substr(11, 5),
                "close_1": new  Date(sun_cl * 1000).toISOString().substr(11, 5) ,
                "open_2":  new Date(sun_op_2 * 1000).toISOString().substr(11, 5) ,
                "close_2": new  Date(sun_cl_2 * 1000).toISOString().substr(11, 5)
            }
        }})
        console.log("trying login")
        const comp = JSON.parse(localStorage.getItem("company"))
        const resp = await loginUser('/companies/login', {email: comp.email, password: formValue.password}, true)
        if (resp)
            console.log("login intrue")
}

return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formDescription" >
            <Form.Label>Descripción de su empresa.</Form.Label>
            <Form.Control
                type="text"
                name="description"
                as="textarea"
                rows="4"
                placeholder="Escribe una descripción de tu empresa"
                {...register("description", {
                    required: { value: true, message: "Es necesaria una descripción detallada de la empresa." },
                    minLength: { value: 50, message: "Se mas preciso en la descripción. Mínimo 50 carácteres" },
                    maxLength: { value: 500, message: "Carácteres de descripción excedidos" }
                })}
                onChange={(e) => {
                    setForm({ ...formValue, description: e.target.value })
                    if (errors.description) {
                        setError("description", { type: "manual", message: errors.description.message })
                    }
                }
                }
                isInvalid={errors.description && touchedFields.description}
            />
            {errors.description && <Form.Control.Feedback type="invalid">{errors.description.message}</Form.Control.Feedback>}
            <Form.Text className="text-muted">Cuantos más detalles mejor para tus clientes.</Form.Text>
        </Form.Group>


        <Form.Group controlId="formCapacity">
            <Form.Label>Duración media de los servicios que ofrece
                </Form.Label>
            <Form.Control
                type="number"
                name="service_duration"
                placeholder="1"
                value={formValue.service_duration}
                // defaultValue="1"
                {...register("service_duration", {
                    required: { value: true, message: "Es necesario que especifiques este dato." },
                    // valueAsNumber: true
                })}
                onChange={(e) => {
                    setForm({ ...formValue, service_duration: Number(e.target.value) })
                    if (errors.service_duration) {
                        setError("service_duration", { type: "manual", message: errors.service_duration.message })
                    }

                }}
                isInvalid={errors.service_duration && touchedFields.service_duration}

            />
            {errors.capacity && <Form.Control.Feedback type="invalid">{errors.capacity.message}</Form.Control.Feedback>}
        </Form.Group>



        <Form.Group controlId="formBasicCheckbox">
            <Form.Check
                type="checkbox"
                label="¿Dispongo de horario partido?"
                onChange={(e) => {
                    console.log("doble turno", !dobleturno)
                    setDobleturno(!dobleturno)
                }} />
        </Form.Group>

        {!dobleturno && <TablaHorario texto="Turno único" open="" close="" array={0} />}
        {dobleturno && <TablaHorario texto="Turno 1" open="turno 1" close="turno 1" array={0} />}
        {dobleturno && <TablaHorario texto="Turno 2" open="turno 2" close="turno 2" array={1} />}
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={formValue.password}
                {...register("password", {
                    required: { value: true, message: "la contraseña es obligatorio" },
                })}
                onChange={(e) => {
                    setForm({ ...formValue, password: e.target.value })
                    if (errors.password) {
                        setError("password", { type: "manul", message: errors.password.message })
                    }
                }
                }
                isInvalid={errors.password && touchedFields.password} />
            {errors.password &&
                <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
        </Form.Group>

        {loading && <LoadingSpinner loading={true} />}
        <Row className="justify-content-center mx-auto ">
            <Button variant="primary" type="submit" onSubmit={handleSubmit(onSubmit)}>Registrar servicio</Button>
        </Row>
        <Row className="justify-content-center mx-auto pt-2">
            {apiError && <GenericAlert message="Error en el registro del servicio" tipo="danger" />}
        </Row>
    </Form>
)
}

export default UpdateCompanyInfoForm;