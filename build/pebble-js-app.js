/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(p) {
	  if (!p === undefined) {
	    console.error('Pebble object not found!?');
	    return;
	  }
	
	  // Aliases:
	  p.on = p.addEventListener;
	  p.off = p.removeEventListener;
	
	  // For Android (WebView-based) pkjs, print stacktrace for uncaught errors:
	  if (typeof window !== 'undefined' && window.addEventListener) {
	    window.addEventListener('error', function(event) {
	      if (event.error && event.error.stack) {
	        console.error('' + event.error + '\n' + event.error.stack);
	      }
	    });
	  }
	
	})(Pebble);


/***/ },
/* 2 */
/***/ function(module, exports) {

	var locationOptions = {timeout: 15000, maximumAge: 60000}; 
	
	function fetch_crime_prediction_data(pos) {
	  var neighbourhoods = [
	    'Central Business District',
	    'Oakridge',
	    'Grandview-Woodland',
	    'West-End',
	    'Fairview',
	    'Hastings-Sunrise',
	    'Strathcona',
	    'Stanley Park',
	    'Marpole',
	    'Renfrew-Collingwood',
	    'Kitsilano',
	    'Mount Pleasant',
	    'Sunset',
	    'Dunbar-Southlands',
	    'Victoria-Fraserview',
	    'Killarney',
	    'Riley Park',
	    'Kensington-Cedar Cottage',
	    'West Point Grey',
	    'South Cambie',
	    'Shaughnessy',
	    'Kerrisdale',
	    'Arbutus Ridge',
	    'Musqueam'
	  ];
	}
	
	function fetch_location_data(pos) {
	  var req = new XMLHttpRequest(),
	      version = Date.now(),
	      clientId = 'JQRPOLMFUZU0UDFMRMRESL31XPZC2PLF23KP123OJYYKD2ZB',
	      clientSecret = 'D2AMQXT11FC0WTBGHMRNIICB0Q5YULP5JJZ2EYT1SCISDSOL',
	      latitude = pos.coords.latitude, // latitude for Robson Street
	      //latitude = 49.28337;
	      longitude = pos.coords.longitude;
	      //longitude = -123.12074; // longitude for Robson Street
	
	  req.open('GET', 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '&ll=' + latitude + ',' + longitude + '&openNow=1', true);
	  //req.open('GET', 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + version + '&ll=' + latitude + ',' + longitude + '&query=starbucks', true);
	  
	  req.onload = function(e) {
	    if (req.readyState == 4 && req.status == 200) {
	      if (req.status == 200) {
	        var response = JSON.parse(req.responseText);
	
	        if (response && response.meta.code == '200' && response.response) {
	          var venue = response.response.venues[0];
	          Pebble.sendAppMessage({"location": venue.name + ', ' + venue.location.address, "crime": "stub"});
	          //Pebble.sendAppMessage({crime: 'stub'});
	          //Pebble.sendAppMessage({location: venue.location.address + ', ' + venue.location.city});
	        }
	      } else {
	        console.log('Error');
	      }
	    }
	  }
	
	  req.send(null);
	}
	
	function fetch_location_error(err) {
	  console.log(err);
	  Pebble.sendAppMessage({location: 'Unable to retrieve location'});
	}
	
	Pebble.addEventListener('ready', function(e) {
	  locationWatcher = window.navigator.geolocation.watchPosition(fetch_location_data, fetch_location_error, locationOptions);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=pebble-js-app.js.map