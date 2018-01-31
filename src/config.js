/**
 * @file defines the configuration variables used in the the package
 */
/**
 *  Third Party Imports
 */
import * as L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';
import 'leaflet.markercluster';
/**
 *  Local imports 
 * N/A
 */
/**
 * Default constant parameters
 * structure is {Context}{VariableName} where context is google | bing
 */
const bingStreet =
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const bingImage =
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const attribution = 'Felixson yusuf"s  Montage &nbsp;copy';
/**
 * TODO GOOGLE MAP INCOORPORATION IN THE FUTURE
 */
/**
 * Enumeration defining the options of config values required
 */
/**
 * @const bingParams  bing parameters
 * Default parameters to use for bing it computes and releases the desired variables
 * @context {string} determines the parameter required from bing its values are defined in the options
 * street  returns {L.tileLayer} a computed bing map layer representing street maps
 * image return { L.tileLayer} a computed satelite image layer
 *
 */
export const bingParameters = context => {
  switch (context) {
    case 'street':
      return L.tileLayer(bingStreet, {
        attribution
      });
    case 'image':
      return L.tileLayer(bingImage, {
        attribution
      });
    default:
      return L.tileLayer(bingStreet, {
        attribution
      });
  }
};

/*
 * @const googleParams  bing parameters 
 * Default parameters to use for google it computes and releases the desired variables
 * @context {string} determines the parameter required from bing its values are defined in the options 
 */
const googleParameters = context => {};
