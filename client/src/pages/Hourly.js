import React, {Component} from 'react';
import 'moment-timezone';

import {Container, Row, Col, Image} from 'react-bootstrap';
import HourlyDetail from "./HourlyDetail";

class Hourly extends Component {
    render() {
        return (
            <div>
                <div className={'top'}>
                    <Container>
                        <Row>
                            <Col sm><strong>Wind:</strong> {this.props.currently.windSpeed}mph</Col>
                            <Col sm><strong>Humidity:</strong> {this.props.currently.humidity}%</Col>
                            <Col sm><strong>Dew Pt:</strong> {this.props.currently.dewPoint}˚</Col>
                            <Col sm><strong>UV Index:</strong> {this.props.currently.uvIndex}</Col>
                            <Col sm><strong>Visibility:</strong> {this.props.currently.visibility}mi</Col>
                            <Col sm><strong>Pressure:</strong> {this.props.currently.pressure}mb</Col>
                        </Row>
                    </Container>
                </div>
                <div className={'weather-detail'}>
                    <Container>
                        <Row style={{margin: '30px'}}>
                            <Col md={{span: 6, offset: 3}}>
                                <div>
                                    <Image style={{width: '85px'}}
                                           src={'https://darksky.net/images/weather-icons/' + this.props.currently.icon + '.png'}/>
                                    <b style={{fontSize: '24px'}}>{this.props.currently.temperature}˚ {this.props.currently.summary}.</b>
                                </div>
                                <Row>
                                    <Col sm>
                                        Feels Like: {this.props.currently.apparentTemperature.toFixed()}˚
                                    </Col>
                                    <Col sm>
                                        Low: {this.props.min}˚
                                    </Col>
                                    <Col sm>
                                        High: {this.props.max}˚
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3 style={{fontSize: '36px', margin: '30px'}}>{this.props.hourly ? this.props.hourly.summary : "It is fine!"}</h3>
                            </Col>
                        </Row>

                        <HourlyDetail hourly={this.props.hourly} timezone={this.props.timezone}/>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Hourly;