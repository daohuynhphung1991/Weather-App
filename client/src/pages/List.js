import React, {Component} from 'react';
import 'moment-timezone';
import Hourly from './Hourly';
import Daily from './Daily';
import {Button, Form, FormControl} from "react-bootstrap";

const axios = require('axios');

class List extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            timezone: '',
            currently: {},
            hourly: {
                data: []
            },
            lat: 10.75,
            lon: 106.6667,
            daily: {},
            flags: {},
            error: {}
        };

        this.handleElement = this.handleElement.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }

    handleElement(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getList(e);
    }

    // Retrieves the list of items from the Express app
    getList = (e) => {
        const params = {
            'lat' : this.state.lat,
            'lon': this.state.lon
        };
        axios.get('/weather',{
            params
        })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        timezone: result.data.timezone,
                        currently: result.data.currently,
                        hourly: result.data.hourly,
                        daily: result.data.daily,
                        flags: result.data.flags,
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
            this.state.isLoaded ? (
                <div className="App" style={{marginTop: '30px'}}>
                    <Form style={{margin: '30px'}} inline className="justify-content-center align-items-center" onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Lat (...)" className="mr-sm-2" name={'lat'} value={this.state.lat} onChange={this.handleElement}/>
                        <FormControl type="text" placeholder="Long (...)" className="mr-sm-2" name={'lon'} value={this.state.lon} onChange={this.handleElement}/>
                        <Button variant="outline-success" type={'submit'}>Search</Button>
                    </Form>
                    <Hourly currently={this.state.currently} hourly={this.state.hourly} timezone={this.state.timezone}
                        min={this.state.daily.data[0].temperatureMin.toFixed()}
                            max={this.state.daily.data[0].temperatureMax.toFixed()}
                            isLoaded={this.state.isLoaded}
                    />
                    <Daily daily={this.state.daily}/>
                </div>
            ) : (
                ""
            )
        )
    }
}

export default List;