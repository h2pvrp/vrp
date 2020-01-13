import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, TileLayer } from "react-leaflet";
import { ATTRIBUTION, MAP_URL } from "../../constants/config";
import "leaflet/dist/leaflet.css";
import "../MapView.css";

const mapStateToProps = state => ({
  ...state.map_settings,
  selected_package: state.selected_package
});

class StatisticsMap extends Component {
  render() {
    const { latitude, longitude } = this.props;
    const position = [latitude, longitude];
    const zoom = 4; //countries
    return (
      <Map
        className="lefleat-map"
        center={position}
        zoom={zoom}
        onClick={this.onMapClick}
      >
        <TileLayer attribution={ATTRIBUTION} url={MAP_URL} />
      </Map>
    );
  }
}

const StatisticsMapView = connect(mapStateToProps, null)(StatisticsMap);

export default StatisticsMapView;
