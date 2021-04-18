import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CompanyCard (props) {        
    return (
        <CardGroup >
            <Card>
                <Card.Body>
                    <Link to="/companies/health">
                        <Card.Title >Salud y Belleza {props.title}</Card.Title>
                    </Link>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
    );
}

export default CompanyCard;