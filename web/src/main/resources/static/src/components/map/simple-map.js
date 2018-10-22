import React, {Component} from 'react';
import  {Marker, Popup, TileLayer, Map} from "react-leaflet";
import './simple-map.css';

export default class SimpleMap extends Component {
    constructor() {
        super();
        this.state = {
            lat: 52.439,
            lng: 30.989,
            zoom: 14
        }
    }

    onChangeLocation = (evt) => {
        let pointLatLng = evt.latlng;
        console.log(pointLatLng.lat, pointLatLng.lng);
        this.setState({
            lat: pointLatLng.lat,
            lng: pointLatLng.lng,
            zoom: 14
        });
    };

    render() {
        return (
            <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}
                        onClick={this.onChangeLocation}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={[this.state.lat, this.state.lng]}>
                    <Popup>
                        Your current address
                    </Popup>
                </Marker>
            </Map>
        );
    }
}
