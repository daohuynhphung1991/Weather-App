import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import {Image} from 'react-bootstrap';

var moment = require('moment');

class HourlyDetail extends Component {
    render() {
        return (
            <div className={'d-inline-block border'}>
                <div className={'d-flex flex-row weather-hourly justify-content-center'}>
                    {this.props.hourly.data && this.props.hourly.data.length && this.props.hourly.data.map((hourly, i) => {
                        const unixTimestamp = hourly.time;
                        // Return the element. Also pass key
                        const unixTimestapCurrent = this.props.formDaily ? hourly.time : moment().tz(this.props.timezone).endOf('day').format("X");
                        if (hourly.time <= unixTimestapCurrent) {
                            return (
                                <div key={i} style={{fontSize: '12px', minWidth: '80px'}}
                                     className={i % 2 !== 0 ? 'd-none' : 'bg-light'}>
                                    <div className={'hourly-summary p-2 border-bottom'} style={{minHeight: '80px'}}>
                                        <Image style={{width: '25px'}}
                                               src={'https://darksky.net/images/weather-icons/' + hourly.icon + '.png'}/>
                                        <br/>
                                        <b>{hourly.summary}</b>
                                    </div>
                                    <div className={'p-2'}>
                                        {i === 0 &&
                                        <div>
                                            <b>Now</b>
                                        </div>
                                        }
                                        {i !== 0 &&
                                        <div>
                                            <b>
                                                <Moment unix tz={this.props.timezone} format={'h A'}>
                                                    {unixTimestamp}
                                                </Moment>
                                            </b>
                                        </div>
                                        }
                                        <div>
                                            {hourly.temperature.toFixed()}°
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default HourlyDetail;