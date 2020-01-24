import React, {Component} from 'react';
import 'moment-timezone';

import {Container, Row, Col} from 'react-bootstrap';
import DetailDaily from "./DetailDaily";

class Daily extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className={'daily-wrapper'}>
                            <hr className="border-top w-25" style={{marginTop:"50px"}}/>
                            <h4 style={{margin:"20px"}}>{this.props.daily.summary}</h4>
                            <div className={'daily-list-wrapper'} style={{marginBottom: '100px'}}>
                                {this.props.daily.data && this.props.daily.data.length && this.props.daily.data.map((daily, i) => {
                                    // Return the element. Also pass key
                                    const unixTimestamp = daily.time;
                                    return (
                                        <DetailDaily key={i} ikey={i} daily={daily} timezone={this.props.timezone} unixTimestamp={unixTimestamp}/>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Daily;