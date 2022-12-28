//This Global view variable instance allows us to inspect the properties of the map using the developers tools in a browser.

var view;

//************************************************************************************************************************************//
//  The require statement is used to call modules from the ArcGIS-API. ORDER MATTERS! For example, the alias Map needs to be called   //
//  in first since it is refrenced first in the require statement--the alias name is actually arbitrary, and it's order is what gives //
//  it meaning. ArcGIS-API 4.x Sequence is always the same: 1. load module, 2. instantiate, 3. set properties, 4. add to map          //
//************************************************************************************************************************************//

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/Swipe",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "dojo/domReady!"
  ],

/*The arguement aliases are passed in the function call in the same order as they are listed in the require statement above.
THERE WILL BE NO OUTPUT if they are not passed in the same order.*/

    function(Map, MapView, FeatureLayer, Search, LayerList, Swipe, Expand, Legend, ) {

/*Local Veriable map created as an instance (instantiation) of Map that will define what constitutes the map variable in
said instance the Map module. Basemap & layers are loaded as options/properties of the object.*/

    const map = new Map({
        basemap: "streets-relief-vector",

    });

//*****************************************************************************************************************************************//
// An instance of the MapView is created useing the viewDiv as its HTML container, and other object properties to define the views design. //
// A good analogy here is: The Map (The backyard you created with everything in it) is being viewed from differnt windows (MapView)        //
// of a house (API) that you created from custom building materials (modules in API)                                                       //
//*****************************************************************************************************************************************//

    const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [-97.733330, 30.266666]
    });

     /*************************************************************
             * The PopupTemplate content is the text that appears inside the
             * popup.
             * HTML elements can be used
             * to provide structure and styles within the content. The
             * fieldInfos property is an array of objects (each object representing
             * a field) that is use to format number fields and customize field
             * aliases in the popup and legend.
             **************************************************************/

      const template = {
        // autocasts as new PopupTemplate()
        title: "{NAME_1}",
        content: [
          {
            // It is also possible to set the fieldInfos outside of the content
            // directly in the popupTemplate. If no fieldInfos is specifically set
            // in the content, it defaults to whatever may be set within the popupTemplate.
            type: "fields",
            fieldInfos: [
              {
                fieldName: "PovPc19",
                label: "Percent Poverty",
                      format: {
                  digitSeparator: true,
                  places: 2
                }
              },
              {
                fieldName: "PovPcM19",
                label: "Percent Poverty Margin of Error",
                format: {
                  digitSeparator: true,
                  places: 2
                }
              },
              {
                fieldName: "PovHiEs",
                label: "Percent Poverty, Lower Estimate",
                format: {
                  digitSeparator: true,
                  places: 2
                }
              },
              {
                fieldName: "PovLoEs",
                label: "Percent Poverty, Upper Estimate",
                format: {
                  digitSeparator: true,
                  places: 2
                }
              }
            ]
          }
        ]
      };

/*These variables are defined as feature layers being served by arcgis online feature server. The URL points to the specific layer, and
the variable is passed into the view with .add  below and added to the map accordingly (index is defined). Let is used for constant value in its scope */

    const canTxCounties = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/1"
    });

      canTxCounties.listMode = "hide";

    const canTxHHS = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/0"
    });

    const canTxEstimate = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/4"
    });

    const canTxUpperLimit = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/5"
    });

    const canTxLowerLimit = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/6"
    });

    const canTxReservoirs = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Central_Texas_Poverty/FeatureServer/2"
    });

      canTxReservoirs.listMode = "hide";

    const majorRivers = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Dashboard_Map/FeatureServer/4"
    });

      majorRivers.listMode = "hide";

      const canTxEstimateMOE = new FeatureLayer({
        url: "https://services1.arcgis.com/M68M8H7oABBFs1Pf/arcgis/rest/services/Poverty_Percent_Margin_of_Error/FeatureServer/0",
        popupTemplate: template
    });

      canTxEstimateMOE.listMode = "hide";

//The dot operator is used here in conjunction with the add method to display the feature layers refrenced above the map instance. The index places each layer in order.



    map.add(canTxCounties, 0);

    map.add(canTxHHS, 0);

    map.add(canTxReservoirs, 0);

    map.add(majorRivers, 0);

    map.add(canTxEstimate, 0);

    map.add(canTxLowerLimit, 0);

    map.add(canTxUpperLimit, 0);

    map.add(canTxEstimateMOE, 0);

/*This variable instantiates the searchWidget called from the API to be placed in the the instance of the map view defined above by
setting it as a property.*/

    const searchWidget = new Search({
        view: view
    });

// A .ui is used in conjunction with a .add method to place the search widget to the top right corner of the view

    view.ui.add(searchWidget, {
        position: "top-right"
    });

// create a layerlist and expand widget and add to the view
const layerList = new LayerList({
    view: view
    });
    const llExpand = new Expand({
    view: view,
    content: layerList,
    expanded: false
    });
    view.ui.add(llExpand, "top-right");

// create a new Swipe widget
    const swipe = new Swipe({
    leadingLayers: [canTxEstimate],
    trailingLayers: [canTxUpperLimit],
    position: 90, // set position of widget to 75%
    view: view
    });

// add the widget to the view
    view.ui.add(swipe);

// This instance creates a legend for the user to choose what layers they wish to query with the swipe widget 
    const legend = new Legend({
          view: view
        });
        const legendExpand = new Expand({
          expandIconClass: "esri-icon-legend",
          expandTooltip: "Legend",
          view: view,
          content: legend,
          expanded: false,
          hideLayersNotInCurrentView: true,
          respectLayerVisibility: true,
        });
        view.ui.add(legendExpand, "top-left");

});