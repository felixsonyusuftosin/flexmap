
let L = require('leaflet');
let Pulse = require('leaflet-pulse-icon');
let Routing = require('leaflet-routing-machine');
let bing = require('leaflet-bing-layer');
let easybutton = require('leaflet-easybutton');
let zoomBox = require('leaflet-zoombox');
const street = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
const imagery = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
export  default  class flex{
    //constructor that takes in the map id the id of the map to use the id most be a dom reference of an object;
    //attribution  not cumplolsory put in the attribution of your map
    //if your map does not exist set create map in options to true 
    //if your map exists set create map option to false and mapInstance shpould be set to instance of your map
    //if you have your instance of street map provide a street layer and imagery layer
    //to begin u can have an existing leaflet map which you can pass its instance in the options or if ou dont pass creatmap to true
    constructor(mapid = null,  options ){ 
    this.mapInstance;
    this.mapid = mapid;
    this.createmap; 
    this.goToLocation;
    this.initialLocation; 
    this.attribution;  
    options.attribution ? this.attribution = options.attribution  : this.attribution = "Felixson's Software INC 2017"; 
    options.goToLocation ? this.goToLocation : this.goToLocation = Flase;
    options.initialLocation ? this.initialLocation = {lat:this.initialLocation.lat, lng:this.initialLocation.lng} : this.initialLocation = null;
    options.createMap && options.mapInstance ? 
    this.createMap = options.createmap :  this.createmap = false; 
     options.createMap && options.mapInstance ? 
    this.createMap = options.mapInstance :  this.mapInstance = null;    
    this.map;
    this.lato;
    this.lngo;
    this.locationMarker;
    this.locationMarker2;
    this.routes;
    this.geoj;
    this.layers;
	this.frontLayer;
	this.backLayer;
	this.frontLayerString;
	this.backLayerString;
    this.butt;
    this.container;
    this.buttid;
    this.containerid;
    this.layergroup;
    options.street ? this.street = options.street :
                                                     this.street = L.tileLayer(street, {
	                                                 attribution: this.attribution
                                                });
                        
    options.imagery ? this.imagery = options.imagery :this.imagery = L.tileLayer(imagery, {
	                                               attribution: this.attribution,
	                                               maxZoom:22
                                               });
                                       }
        //configureMap  to create or configure your instance of map
    configureMap = ()=>{
    let view;
     if (! this.createmap && !this.mapInstance ){
          let mapid = this.mapid;  
          if (!mapid) {
              console.log('Error you need to pass in a valid DOM reference id as string..')
              return null
          }else{
			  this.map = L.map(mapid, {zoomControl:false, fadeAnimation:true, zoomAnimation:true, inertia:true})
          }               
   
    } else{
        this.map = mapInstance;
    }    
    this.layers = [{street:this.street, imagery: this.imagery}];
    this.frontLayer = this.street;
    this.initialLocation ? view = [this.initialLocation.Lat, this.initialLocation.lng] :  view = null;
	let zoom = 20; 
	view ? this.map.setView(view, zoom):null;
	this.map.addControl (L.control.zoom({position:'bottomright'}));
	this.map.addLayer(this.frontLayer);
	this.frontLayerString = "street";
	this.backLayerString = "satelite";
	this.map.zoom(10);
	let control = L.control.zoomBox({
    modal: false, 
     title: "Draw rectangle to zoom"
          });
    this.map.addControl(control);	
//function to switch base map of the class..
switchBaseMap = ()=>{	
this.map.removeLayer(this.frontlayer);
  switch(frontLayer){
case 'street':
	this.backLayer = this.street;
	this.frontLayer = this.imagery;	
	break;
	case 'imagery':
	this.frontLayer = this.street;
	this.backLayer = this.imagery;
		break;
	default:
		this.backLayer = this.street;
		this.frontLayer = this.imagery;			
}//switch
	this.map.addLayer(this.frontLayer);	
  }//switchbase  
 
}
route = (options) =>{
return  new Promise ( (resolve,reject)=>{
 correct = false;
  typeof(options) == 'object' && options.fromLat && options.toLat && optionns.fromLng && options.toLng ?  correct = true : correct = false; 
 if (!correct){
	 console.log('Sorry you need to provide all the options to the argument as an object ')
	 return null
 }
	try {this.map.removeControl(this.routes); this.routes = null; }
    catch(err){ }
	let message = "route not run";
	let time = null;
	let distance = null;
	this.routes  = L.Routing.control({
    waypoints: [
    L.latLng(th.fromlat ,th.fromlng),
    L.latLng(th.tolat, th.tolng)
            ],
	router: L.Routing.graphHopper('5f4ee7ea-7e82-4acb-bc70-0b7350238863'),
	position:'bottomright',
    routeWhileDragging:false,
    fitSelectedRoutes:true,	
    collapsible:true,
	show:false
	}).addTo(this.map);	
	this.map.invalidateSize();
    routes.on('routingstart',function(){		 
	message = "Loading... Routing the location please wait..";         	  
 });	 
    routes.on('routesfound', function(e){
    distance = e.routes[0].summary.totalDistance;
    time = e.routes[0].summary.totalTime;
	 	
   });	
   this.map.addControl(th.routes);
  resolve({message, distance, time}) ;
});
}
removeroutes = ()=>{
try {this.map.removeControl(this.routes); this.routes = null; }
    catch(err){ }	
};
resetroutes = (newroutes)=>{
	this.setWaypoints(newroutes);	
};
removeroutes = ()=>{  
 try{	
 this.routes.spliceWaypoints(0, 2);
this.routes = null;
	}
  catch(err){
	  console.log('err');
  }	
}
 }//configureMap ends