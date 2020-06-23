import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import InputGroup from 'react-bootstrap/InputGroup';

import covidImage from '../../image/covid.jpg'
import city from '../../image/icons/casa.svg'
import population from '../../image/icons/grupo.svg'
import confirm from '../../image/icons/confirme.svg'
import deaths from '../../image/icons/bacterias.svg'

import map from '../../image/mapa.jpeg'

import {DebounceInput} from 'react-debounce-input';

import moment from 'moment'

import './styles.css';
import { useState } from 'react';
import axios from 'axios';
export default function Inicio() {

    const [dados, setDados] = useState(false)
    const [busca, setBusca] = useState('')
    let getData = async () => {
        let res = await axios.get('https://brasil.io/api/dataset/covid19/caso/data?', {
            params: {
                is_Last: 'True',
                city: busca
            }
        });


        setDados(res.data.results[0])


    }

    // const cidade = dados[0]['city']
    // console.log(cidade);


    useEffect(() => {
        getData()
    })

    function handleChange(event){
        setBusca(event.target.value)

        console.log('Executado');
        
    }
    if (dados === false) {
        return (
            <div>Carregando dados...</div>
        )
    } else {
        return (
            <div className="inicio-container">
                <header>
                    <img src={covidImage} alt="Papel de parede do covid"></img>
                </header>
                <InputGroup.Prepend>
                    {/* <InputGroup.Text><FaSearch></FaSearch></InputGroup.Text> */}
                    <DebounceInput placeholder="Pesquisar cidade" className="input" minLength={2} debounceTimeout={1000} onChange={handleChange}></DebounceInput>
                    {/* <input type="text" placeholder="Pesquisar cidade" value={busca} onChange={handleChange}></input> */}
                    {/* <Button onClick={handleChange}>Buscar</Button> */}
                </InputGroup.Prepend>
                <br />
                <Card >

                    <Card.Body className="data-atualizacao">
                        <Card.Title>Data da última atualização</Card.Title>
                        <Card.Text>{moment(dados.date).format('DD/MM/YYYY')}</Card.Text>
                    </Card.Body>

                </Card>
                <CardGroup className="card-group">

                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Body>
                            <Card.Title>Cidade</Card.Title>
                            <Card.Text>
                                {dados.city}, {dados.state}
                            </Card.Text>
                            <Card.Img src={city} alt="cidade"/>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>População</Card.Title>

                            <Card.Text>{dados.estimated_population_2019}</Card.Text>
                            <Card.Img src={population} alt="População"/>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Casos confirmados</Card.Title>

                            <Card.Text>{dados.confirmed}</Card.Text>
                            <Card.Img src={confirm} alt="Confirmados"/>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Óbitos</Card.Title>

                            <Card.Text>{dados.deaths}</Card.Text>
                            <Card.Img src={deaths} alt="Óbitos"/>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <div >
                    <img className="mapa-covid"  src={map} alt="Mapa"></img>
                </div>
            </div>
        );
    }
}

