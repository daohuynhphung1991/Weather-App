import React, {Component} from 'react';

import {Col, Button, Collapse, Image, ProgressBar, Row} from 'react-bootstrap';
import Moment from "react-moment";
import HourlyDetail from "./HourlyDetail";

const axios = require('axios');

class DetailDaily extends Component {
    // Initialize the state
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            hourly: {
                data: []
            },
            timezone: '',
            lat: 10.75,
            lon: 106.6667,
            isLoaded: false,
        };

        this.handleElement = this.handleElement.bind(this);
    }

    handleElement = param => e => {
        this.setState({open: !this.state.open},
            () => {
                this.getList(param);
            });
    };

    // Retrieves the list of items from the Express app
    getList = param => {
        const params = {
            'lat' : this.state.lat,
            'lon': this.state.lon,
            'timezone': param ? param : ''
        };
        axios.get('/weather',{
            params
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        timezone: result.data.timezone,
                        hourly: result.data.hourly,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
    };

    render() {
        return (
            <div style={{marginTop: "15px"}}>
                <Row key={this.props.ikey} className={'justify-content-center align-items-center'}>
                    <Col sm={1} className={'text-left'}>
                        <Image style={{width: '25px', marginRight: '5px'}} className={'align-text-bottom'}
                               src={'https://darksky.net/images/weather-icons/' + this.props.daily.icon + '.png'}/>
                        <Moment unix tz={this.props.timezone} format={'ddd'}>
                            {this.props.unixTimestamp}
                        </Moment>
                    </Col>
                    <Col sm={1} className={'text-right'}>
                        {this.props.daily.temperatureMin.toFixed()}°
                    </Col>
                    <Col sm={6}>
                        <ProgressBar now={this.props.daily.temperatureMax.toFixed()}
                                     min={0}
                                     max={100}/>
                    </Col>
                    <Col sm={1} className={'text-left'}>
                        {this.props.daily.temperatureMax.toFixed()}°
                    </Col>
                    <Col sm={1}>
                        <Button
                            onClick={this.handleElement(this.props.daily.time)}
                            aria-controls={"example-collapse-"+this.props.ikey}
                            aria-expanded={this.state.open}
                        >
                            Detail
                        </Button>
                    </Col>
                </Row>
                <Collapse in={this.state.open}>
                    <div id={"example-collapse-"+this.props.ikey}>
                        <div>
                            <h5 style={{fontSize: '16px'}}>{this.props.daily.summary}</h5>
                        </div>
                        <div className={'d-flex justify-content-center align-items-center'}>
                            <div>
                                <b>
                                    {this.props.daily.temperatureMin}°
                                </b>
                                <sub>
                                    <Moment unix tz={this.props.timezone} format={'h A'}>
                                        {this.props.daily.temperatureLowTime}
                                    </Moment>
                                </sub>
                                <span style={{marginLeft: '15px', marginRight: '15px'}}>→</span>
                                <b>
                                    {this.props.daily.temperatureMax}°
                                </b>
                                <sub>
                                    <Moment unix tz={this.props.timezone} format={'h A'}>
                                        {this.props.daily.temperatureHighTime}
                                    </Moment>
                                </sub>
                            </div>
                            <div style={{marginLeft: '45px', marginRight: '45px'}}>
                                <div className={'d-inline-block'} style={{marginRight: '10px'}}>
                                    <Image style={{width: '25px'}} className={'align-middle'}
                                           src={'https://darksky.net/images/sunrise.png'}/>
                                    <Moment unix tz={this.props.timezone} format={'h A'} className={'align-middle'}>
                                        {this.props.daily.sunriseTime}
                                    </Moment>
                                </div>

                                <div className={'d-inline-block'}>
                                    <Image style={{width: '25px'}} className={'align-middle'}
                                           src={'https://darksky.net/images/sunset.png'}/>
                                    <Moment unix tz={this.props.timezone} format={'h A'} className={'align-middle'}>
                                        {this.props.daily.sunsetTime}
                                    </Moment>
                                </div>
                            </div>
                            <div>
                                <b>Rain </b>
                                {this.props.daily.precipIntensity.toFixed()} in
                            </div>
                        </div>

                        <div style={{marginTop: '30px'}}>
                            <HourlyDetail key={this.props.ikey} currently={this.state.currently} hourly={this.state.hourly}
                                          timezone={this.state.timezone}
                                          formDaily={true}
                            />
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default DetailDaily;