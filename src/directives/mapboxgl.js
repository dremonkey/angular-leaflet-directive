angular.module('leaflet-directive').directive('mapboxgl', function ($log, $rootScope, leafletData, leafletHelpers) {
  return {
    restrict: 'A',
    scope: false,
    replace: false,
    require: 'leaflet',

    link: function(scope, element, attrs, controller) {
      var isDefined = leafletHelpers.isDefined,
          leafletScope  = controller.getLeafletScope(),
          leafletMapboxGL;

      controller.getMap().then(function(map) {

        leafletScope.$watch('mapboxgl', function(mapboxgl) {

          if (!leafletHelpers.MapboxGLPlugin.isLoaded()) {
            console.log('Leaflet Mapbox GL Plugin not found...');
            return;
          }

          // add if it doesn't exist... 
          // this will only allow for one mapboxgl "canvas" instance on the page should we allow more?
          if (!isDefined(leafletMapboxGL) && !map.hasLayer(leafletMapboxGL)) {
            leafletMapboxGL = L.mapboxGL(mapboxgl);
            leafletData.setMapboxGL(leafletMapboxGL, attrs.id);
            leafletMapboxGL.addTo(map);
          }

          // add layers the the gl canvas
          
        });
      });
    }
  };
});