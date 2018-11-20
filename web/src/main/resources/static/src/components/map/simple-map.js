import React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import './simple-map.css';

/**
 * This component displays address on map
 *
 * usage example: <SimpleMap lat = "52.4308" lng = "30.9975"/>
 * */
const SimpleMap = (props) => {
    return (
        <Map center={[props.lat, props.lng]} zoom='17'>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={[props.lat, props.lng]}>
                <Popup>
                    Chosen address
                </Popup>
            </Marker>
        </Map>
    );
};

export default SimpleMap;