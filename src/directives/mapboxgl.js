angular.module('leaflet-directive').directive('mapboxgl', function ($log, $rootScope, leafletData, leafletHelpers) {
  return {
    restrict: 'A',
    scope: false,
    replace: false,
    require: 'leaflet',

    link: function(scope, element, attrs, controller) {
      var isDefined = leafletHelpers.isDefined,
          leafletScope  = controller.getLeafletScope(),
          leafletMapboxGL,
          glMap;

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
            glMap = leafletMapboxGL._glMap;
          }
        });

        leafletScope.$watch('mapboxgl.layers', function() {
          // add layers to the the gl map
          glMap.Source.update();
        });

        leafletScope.$watch('mapboxgl.sources', function() {
          // add layers to the the gl map
          glMap.Source.update();
        });
      });
    }
  };
});