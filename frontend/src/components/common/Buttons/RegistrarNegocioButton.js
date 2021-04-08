import React from "react";

import { Link } from "react-router-dom";
import { Row, Button } from 'react-bootstrap';
const RegistrarNegocioButton = () => {
  return (
    <Row className=" justify-content-center mx-auto">
      <Link to="/registrarNegocio">
        <Button >
          Registrar Negocio
        </Button>
      </Link>
    </Row>
  )
}
export default RegistrarNegocioButton;
