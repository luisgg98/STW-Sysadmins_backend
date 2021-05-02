import React, {useState} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

function MapFilterForm(props) {

    const [healthZones, setHealthZones] = props.healthZonesState;
    const [filters, setFilters] = props.filtersState;
    const [casosCovid, setCasosCovid] = useState(0);

    const categories = ["Ocio", "Comercio", "Deporte", "Administración pública", "Salud y Belleza"]

    function toggleHealthZoneByName(healthZoneName) {
        if (filters.blackListHealthZones.includes(healthZoneName)) {
            setFilters({
                ...filters,
                blackListHealthZones: filters.blackListHealthZones.filter(healthZone => healthZone !== healthZoneName)
            });
        } else {
            setFilters({
                ...filters,
                blackListHealthZones: filters.blackListHealthZones.concat([healthZoneName])
            });
        }
    }

    function toggleCompanyByCategory(category) {
        if (filters.blackListCategories.includes(category)) {
            setFilters({
                ...filters,
                blackListCategories: filters.blackListCategories.filter(categoryOld => categoryOld !== category)
            });
        } else {
            setFilters({
                ...filters,
                blackListCategories: filters.blackListCategories.concat([category])
            });
        }
    }

    return (
        <Form>
            <Card>
                <Card.Title>Casos COVID</Card.Title>
                <RangeSlider
                    variant="primary"
                    tooltip="auto"
                    tooltipPlacement="top"
                    step={5}
                    max={200}
                    value={casosCovid}
                    onChange={changeEvent => {
                        setCasosCovid(changeEvent.target.value);
                    }}
                    onAfterChange={() => setFilters({...filters, minCases: casosCovid})}
                />
                <div>Casos: {casosCovid}</div>

            </Card>
            <Card>
                <Card.Title>Categorías</Card.Title>
                <Form.Label>
                    {categories.sort().map((categoria) => (
                        <Form.Check key={categoria} type="checkbox" label={categoria} defaultChecked={true}
                                    onChange={() => toggleCompanyByCategory(categoria)}/>
                    ))}
                </Form.Label>
            </Card>
            <Card style={{overflowY: "scroll", height: "50vh"}}>
                <Card.Title>Zonas de salud</Card.Title>
                {Array.from(healthZones).map((healthZone) => (
                    <Form.Check key={healthZone.name} type="checkbox" label={healthZone.name} defaultChecked={true}
                                onChange={() => toggleHealthZoneByName(healthZone.name)}>
                    </Form.Check>
                ))}
            </Card>
        </Form>
    );
}

export default MapFilterForm;
