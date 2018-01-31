/**
 * @file defines functions for map implementations
 */
/**
 * local imports
 */
import { bingParameters } from './config';
/**
 * third party imports
 */
import * as L from 'leaflet';
import * as Pulse from 'leaflet-pulse-icon';
import * as Routing from 'leaflet-routing-machine';
import * as Bing from 'leaflet-bing-layer';
import * as easyButton from 'leaflet-easy-button';
import * as zoomBox from 'leaflet-zoombox';
/**
 * Flex is the class implmemting the functions we are exposing
 */
export default class Flex {
  /**
   * @constructor the root constructor takes in some parameters that helps to moderate the
   * functions
   * @param {any} options - the options to pass to the map types are defined below
   * mapReference {node} - the reference to the map must be a valid domNode reference
   * goToLocation { boolean : true }  determines if the map zooms in to the users location after loading or it loads a world boundary
   * initialLocation {number[] : null } values should be  [ lat, lng ] determines an array of long lat
   *  to center the map on overrides the go to location attribute
   * createMap {boolean : true } determines if the user has initialized his/her map as this class can be used to extend preinitialized
   * leaflet referenced applications
   * mapType { street | image } determines if we should use a street map as a basemap or satelite basemap
   */
  constructor(options /*see details declared above*/) {
    const { mapReference, goToLocation, initialLocation, createMap, mapType } = options;
    this.mapRefence = mapReference || null;
    this.goToLocation = true;
    this.initialLocation = initialLocation || null;
    this.createMap = true;
    this.mapType = 'street';
    this.activeLayer; // this reference the active base layer on the map
    this.resseciveLayer; // this is the second base layer which we can toggle to 
    /**
     * This block checks if all passed in parameter are safe to run 
     * throws error where the options do not match what is expected
     */
    if (mapType){ 
      if (mapType !== 'street' || mapType !== 'image') { 
        throw new Error ('If you provide a mapType option variable, it must be either street or image (string)');
      } else { 
        this.mapType = mapType;
      }
    }
    if (typeof createMap === 'boolean') {
      this.createMap = createMap;
    }
    if (typeof goToLocation === 'boolean') {
      this.goToLocation = goToLocation;
    }
    if (
      !mapReference ||
      typeof (mapReference === 'string') ||
      typeof (mapReference === 'number')
    ) {
      throw new Error(
        'You must pass in a node or Leaflet map to the map options not a string or number '
      );
    }
    if ( !this.createMap ) {
        try { 
            this.mapRefence.getLayers();
        } catch (err) { 
            throw new Error(' Sorry the map node you passed in is not a valid leaflet map ')
        }
    }
    this.mapInstance; // the instance of the map
  }
  /**
   * Configures a map instance using the provided parameters
   * it can create a new map or configure an existing Leflet map to  use the flex map functions exposed
   */
  configureMap = () => { 
      if ( !this.createMap) { 
          this.mapInstance = this.mapReference;
      } else { 
        this.mapInstance = L.map(mapReference, {
            zoomControl: false,
            fadeAnimation: true,
            zoomAnimation: true,
            inertia: true
          });
      }
      this.activeLayer = bingParameters(this.mapType);
      this.mapInstance.addLayer(this.activeLayer);
      if (this.goToLocation) {
        this.mapInstance.locate({setView: true});
      } else if ( this.initialLocation){ 
        try {
          this.mapInstance.setCenter(L.latLng(this.initialLocation)).zoom(10);
        } catch (err) { 
          throw new Error('You need to provide valid location array of latLng (typically an array of numbers)');
        }
      
      } else { 
        this.mapInstance.fitWorld();
      }

  }
  //configureMap  to create or configure your instance of map
  // configureMap() {
  //   let view;
  //   if (!this.createmap && ! this.mapInstance) {
  //     let mapReference = this.mapReference;
  //     if (!mapReference) {
  //       throw new Error(
  //         'Must provide a map ID as a valid DOM  id reference string'
  //       );
  //       console.log(
  //         'Error you need to pass in a valid DOM reference id as string..'
  //       );
  //       return null;
  //     } else {
  //       this.map = L.map(mapReference, {
  //         zoomControl: false,
  //         fadeAnimation: true,
  //         zoomAnimation: true,
  //         inertia: true
  //       });
  //     }
  //   } else {
  //     this.map = mapInstance;
  //   }
  //   this.layers = [{ street: this.street, imagery: this.imagery }];
  //   this.frontLayer = this.street;
  //   this.initialLocation
  //     ? (view = [this.initialLocation.Lat, this.initialLocation.lng])
  //     : (view = null);
  //   let zoom = 20;
  //   view ? this.map.setView(view, zoom) : null;
  //   this.map.addControl(L.control.zoom({ position: 'bottomright' }));
  //   this.map.addLayer(this.frontLayer);
  //   this.frontLayerString = 'street';
  //   this.backLayerString = 'satelite';
  //   this.map.zoom(10);
  //   let control = L.control.zoomBox({
  //     modal: false,
  //     title: 'Draw rectangle to zoom'
  //   });
  //   this.map.addControl(control);
  // }
  // //function to switch base map of the class..
  // switchBaseMap() {
  //   this.map.removeLayer(this.frontlayer);
  //   switch (frontLayer) {
  //     case 'street':
  //       this.backLayer = this.street;
  //       this.frontLayer = this.imagery;
  //       break;
  //     case 'imagery':
  //       this.frontLayer = this.street;
  //       this.backLayer = this.imagery;
  //       break;
  //     default:
  //       this.backLayer = this.street;
  //       this.frontLayer = this.imagery;
  //   } //switch
  //   this.map.addLayer(this.frontLayer);
  // } //switchbase

  // route(options) {
  //   return new Promise((resolve, reject) => {
  //     correct = false;
  //     typeof options == 'object' &&
  //     options.fromLat &&
  //     options.toLat &&
  //     optionns.fromLng &&
  //     options.toLng
  //       ? (correct = true)
  //       : (correct = false);
  //     if (!correct) {
  //       console.log(
  //         'Sorry you need to provide all the options to the argument as an object '
  //       );
  //       return null;
  //     }
  //     try {
  //       this.map.removeControl(this.routes);
  //       this.routes = null;
  //     } catch (err) {}
  //     let message = 'route not run';
  //     let time = null;
  //     let distance = null;
  //     this.routes = L.Routing.control({
  //       waypoints: [
  //         L.latLng(th.fromlat, th.fromlng),
  //         L.latLng(th.tolat, th.tolng)
  //       ],
  //       router: L.Routing.graphHopper('5f4ee7ea-7e82-4acb-bc70-0b7350238863'),
  //       position: 'bottomright',
  //       routeWhileDragging: false,
  //       fitSelectedRoutes: true,
  //       collapsible: true,
  //       show: false
  //     }).addTo(this.map);
  //     this.map.invalidateSize();
  //     routes.on('routingstart', function() {
  //       message = 'Loading... Routing the location please wait..';
  //     });
  //     routes.on('routesfound', function(e) {
  //       distance = e.routes[0].summary.totalDistance;
  //       time = e.routes[0].summary.totalTime;
  //     });
  //     this.map.addControl(th.routes);
  //     resolve({ message, distance, time });
  //   });
  // }
  // clearroutes() {
  //   try {
  //     this.map.removeControl(this.routes);
  //     this.routes = null;
  //   } catch (err) {}
  // }
  // resetroutes(newroutes) {
  //   this.setWaypoints(newroutes);
  // }
  // removeroutes() {
  //   try {
  //     this.routes.spliceWaypoints(0, 2);
  //     this.routes = null;
  //   } catch (err) {
  //     console.log('err');
  //   }
  // }
} //configureMap ends
