import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet';
import { send } from '@giantmachines/redux-websocket';
import {
  add_package,
  delete_package,
  edit_package,
  center_map,
  select_package,
  toggle_edit_mode,
  toggle_depo_mode,
  add_depo,
  set_route_visibility,
} from '../actions'
import { ATTRIBUTION, MAP_URL } from '../constants/config'
import 'leaflet/dist/leaflet.css';
import './MapView.css';


const Icon = L.Icon.extend({
  options: {iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -32]}
});

const iconDefault = new Icon({
  iconUrl: require('../../img/marker-blue.png'),
  iconRetinaUrl: require('../../img/marker-blue.png')
});

const iconSelected = new Icon({
  iconUrl: require('../../img/marker-red.png'),
  iconRetinaUrl: require('../../img/marker-red.png')
});

const iconDepo = new Icon({
  iconUrl: require('../../img/marker-white.png'),
  iconRetinaUrl: require('../../img/marker-white.png')
});


const mapStateToProps = state => ({
  ...state.map_settings,
  packages: state.packages,
  map_state: state.map_state,
  depo: state.depo,
  selected_package: state.selected_package,
  routes: state.routes,
  depoWrapper: state.depo ? [state.depo] : [],
})

const mapDispatchToProps = dispatch => ({
  add_package: (latitude, longitude) => dispatch(add_package(latitude, longitude)),
  delete_package: index => dispatch(delete_package(index)),
  edit_package: (latitude, longitude) => dispatch(edit_package(latitude, longitude)),
  toggle_edit_mode: index => dispatch(toggle_edit_mode(index)),
  toggle_depo_mode: () => dispatch(toggle_depo_mode()),
  add_depo: (latitude, longitude) => dispatch(add_depo(latitude, longitude)),
  center_map: index => dispatch(center_map(index)),
  select_package: index => dispatch(select_package(index)),
  websocket_send: data => dispatch(send(data)),
  set_route_visibility: (index, isVisible) => dispatch(set_route_visibility(index, isVisible)),
});

class ConnectedMapViev extends Component {
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onPackageClick = this.onPackageClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onDepoClick = this.onDepoClick.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onMapClick(event) {
    const { add_package, edit_package, add_depo, map_state, packages } = this.props;
    const { lat, lng } = event.latlng;

    if (map_state === 'add') {
      add_package(lat, lng);
    } else if (map_state === 'edit') {
      edit_package(lat, lng);
    } else if (map_state === 'depo') {
      add_depo(lat, lng);
    } else {
      console.error('Unknown map_state', map_state);
    }

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

  onEditClick(index) {
    return event => {
      const { toggle_edit_mode } = this.props;
      toggle_edit_mode(index);
    };
  }

  onDepoClick(event) {
    const { toggle_depo_mode } = this.props;
    toggle_depo_mode();
  }

  onDepoMarkerClick(event) {
    // console.log(event);
  }

  onCheckboxChange(index) {
    return event => {
      const { set_route_visibility } = this.props;
      set_route_visibility(index, event.target.checked);
    }
  }

  onSendClick(event) {
    const { websocket_send, packages } = this.props;
    const formated_packages = packages.map(value => ({
      Latitude: value.latitude,
      Longitude: value.longitude
    }));
    // TODO: change
    websocket_send({Id: 1});
  }

  render() {
    const { latitude, longitude, zoom, packages, selected_package, depo, routes, depoWrapper } = this.props;
    const position = [latitude, longitude];

    return (
      <Row>
        <Col sm={9}>
          <Map className="lefleat-map" center={position} zoom={zoom} onClick={this.onMapClick}>
            <TileLayer attribution={ATTRIBUTION} url={MAP_URL}/>
            {packages.map((value, index) => {
              const icon = (index === selected_package) ? iconSelected : iconDefault;
              return (
               <Marker key={index} position={[value.latitude, value.longitude]} icon={icon}
                onClick={this.onMarkerClick(index)}/>
              );
            })}
            {depoWrapper.map((d, _) => {
              return (
                <Marker key="depo" position={[d.latitude, d.longitude]} icon={iconDepo}
                onClick={this.onDepoMarkerClick}/>
              );
            })}

            {routes.filter((route) => !route.hidden).map((value, index) => {
              return (
                <Polyline key={index} positions={value.polyline} color={value.color} />
                )
            })}

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
                  <Button className="float-right mr-2" variant="secondary"
                    onClick={this.onEditClick(index)}>Edit</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <br/>
          <Button className="w-100 mb-2" variant="primary" onClick={this.onDepoClick}>Select depo</Button>

          <div className="form-group BIND ME PLS">
            <label htmlFor="v_num">Number of vehicles</label>
            <input type="number" min="1" className="form-control" id="v_num"/>
          </div>

          <Button className="w-100" variant="success" onClick={this.onSendClick}>Send</Button>

          <h3>Routes</h3>
          {routes.map((value, index) => {
            return (
              <div key={index} className="form-group form-check">
                <input type="checkbox" className="form-check-input" id={index} key={index} onChange={this.onCheckboxChange(index)}></input>
                <label className="form-check-label" htmlFor={index}>{value.name}</label>
              </div>
              )
          })}

        </Col>
      </Row>
    )
  }
}

const MapViev = connect(mapStateToProps, mapDispatchToProps)(ConnectedMapViev);

export default MapViev;
