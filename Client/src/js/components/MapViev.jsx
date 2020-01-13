import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';
import { send } from '@giantmachines/redux-websocket';
import { add_package, delete_package, center_map, select_package } from '../actions'
import { ATTRIBUTION, MAP_URL } from '../constants/config'
import 'leaflet/dist/leaflet.css';
import './MapView.css';


const icon = L.icon({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const mapStateToProps = state => ({
  ...state.map_settings,
  packages: state.packages,
  selected_package: state.selected_package
})

const mapDispatchToProps = dispatch => ({
  add_package: (latitude, longitude) => dispatch(add_package(latitude, longitude)),
  delete_package: index => dispatch(delete_package(index)),
  center_map: index => dispatch(center_map(index)),
  select_package: index => dispatch(select_package(index)),
  websocket_send: data => dispatch(send(data))
})

class ConnectedMapViev extends Component {
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onPackageClick = this.onPackageClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
  }

  onMapClick(event) {
    const { add_package } = this.props;
    const { lat, lng } = event.latlng;
    add_package(lat, lng);
  }

  onMarkerClick(index) {
    return event => {
      const { select_package } = this.props;
      select_package(index);
    };
  }

  onPackageClick(index) {
    return event => {
      const { center_map } = this.props;
      center_map(index);
    };
  }

  onDeleteClick(index) {
    return event => {
      const { delete_package } = this.props;
      delete_package(index);
    };
  }

  onSendClick(event) {
    const { websocket_send, packages } = this.props;
    const formated_packages = packages.map(value => ({
      Latitude: value.latitude,
      Longitude: value.longitude
    }));

    // example
    const [Base, ...Points] = formated_packages;
    const data = {
      Base,
      Points,
      VehicleCount: 5
    };
    websocket_send(data);
  }

  render() {
    const { latitude, longitude, zoom, packages, selected_package } = this.props;
    const position = [latitude, longitude];

    return (
      <Row>
        <Col sm={9}>
          <Map className="lefleat-map" center={position} zoom={zoom} onClick={this.onMapClick}>
            <TileLayer attribution={ATTRIBUTION} url={MAP_URL}/>
            {packages.map((value, index) => (
               <Marker key={index} position={[value.latitude, value.longitude]} icon={icon}
                onClick={this.onMarkerClick(index)}/>
            ))}
          </Map>
        </Col>
        <Col>
          <h2>Packages</h2>
          <ListGroup>
            {packages.map((_, index) => (
              <ListGroup.Item key={index} active={index === selected_package}
                onClick={this.onPackageClick(index)}>
                  {index}
                  <Button className="float-right" variant="danger"
                    onClick={this.onDeleteClick(index)}>Delete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br/>
          <Button className="w-100" variant="primary" onClick={this.onSendClick}>Send</Button>
        </Col>
      </Row>
    )
  }
}

const MapViev = connect(mapStateToProps, mapDispatchToProps)(ConnectedMapViev);

export default MapViev;
