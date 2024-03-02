myApp.controller('HomeController', ["$scope", "$state", "$http",

  function($scope, $state, $http) {

    $scope.displayNotification = function() {
      document.getElementById('notificationModalId').style.display='block';
    }

    $scope.hideNotification = function() {
      document.getElementById('notificationModalId').style.display='none';
    }

    $scope.displayShutdownModal = function() {
      document.getElementById('shutdownModalId').setAttribute("open", "");
    }

    $scope.hideShutdownModal = function() {
      document.getElementById('shutdownModalId').removeAttribute("open");
    }

    $scope.notify = function(info) {
      $scope.notificationInfo = info;
      $scope.displayNotification();
    }

    $scope.displayEditStation = function() {
      document.getElementById('editModalId').setAttribute("open", "");
    }

    $scope.hideEditStation = function() {
      document.getElementById('editModalId').removeAttribute("open");
    }

    $scope.displayDeleteStationModal = function(index) {
      $scope.stationToDeleteIndex = index;
      document.getElementById('deleteStationModalId').setAttribute("open", "");
    }

    $scope.hideDeleteStationModal = function() {
      document.getElementById('deleteStationModalId').removeAttribute("open");
    }


    var readStations = function() {

      var requestParms = {
        'task': 'getStations'
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
          //console.log("received stations: " + data);
          $scope.stations = data;
          //alert("got " + $scope.stations.length + " stations : " + data);
          //console.log($scope.stations);
        }).
        error(function(data, status, headers, config) {
          alert("Network error " + status);
        });
    }


    var writeStations = function() {

      var str = JSON.stringify($scope.stations);

      var requestParms = {
        'task': 'saveStations',
        'stations': str
      };

      //console.log(JSON.stringify(requestParms));

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
        }).
        error(function(data, status, headers, config) {
          alert("Network error " + status);
        });
    }


    $scope.addStation = function() {
      ACTION = "adding";
      $scope.currentStation = { label : "", url : "" };
      $scope.verb = "Add";
      $scope.displayEditStation();
    }


    $scope.saveStation = function() {
      $scope.hideEditStation();
      if (ACTION == "adding") {
        //console.log("current station : " + JSON.stringify($scope.currentStation));
        //console.log("type of array : " + typeof $scope.stations);
        $scope.stations.push($scope.currentStation);
        //console.log("station array: " + JSON.stringify($scope.stations));
        ACTION = null;
      } else if (ACTION == "editing") {
        $scope.stations[CURRENTINDEX] = $scope.currentStation;
        ACTION = null;
        CURRENTINDEX = null;
      }

      writeStations();

    }


    $scope.editStation = function(index) {
      ACTION = "editing";
      CURRENTINDEX = index;
      $scope.currentStation = $scope.stations[index];
      $scope.verb = "Edit";
      $scope.displayEditStation();
    }


    $scope.deleteStation = function(index) {
      $scope.stations.splice(index, 1);
      writeStations();
      $scope.hideDeleteStationModal();
    }


    $scope.playStation = function(index) {

      var requestParms = {
        'task': 'play',
        'url': $scope.stations[index].url
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
          //$scope.notify("Now " + $scope.stations[index].label + " playing.")
          $scope.playingStation = $scope.stations[index].label;
        }).
        error(function(data, status, headers, config) {
          alert("Network error: " + status);
        });
    }


    $scope.stop = function() {

      var requestParms = {
        'task': 'stop'
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
          $scope.playingStation = "";
        }).
        error(function(data, status, headers, config) {
          alert("Network error: " + status);
        });
    }


    $scope.volumehigher = function() {

      var requestParms = {
        'task': 'vol+'
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
        }).
        error(function(data, status, headers, config) {
          alert("Network error: " + status);
        });
    }

    $scope.volumelower = function() {

      var requestParms = {
        'task': 'vol-'
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
        }).
        error(function(data, status, headers, config) {
          alert("Network error: " + status);
        });
    }

    $scope.shutdown = function() {

      var requestParms = {
        'task': 'shutdown'
      };

      var requestParmsStr = JSON.stringify(requestParms);

      $http.post(SERVERURL, requestParmsStr).
        success(function(data, status, headers, config) {
        }).
        error(function(data, status, headers, config) {
          alert("Network error: " + status);
        });
    }



    $scope.stations = new Array();
    $scope.currentStation = { label : "", url : "" };
    var ACTION = null;
    var CURRENTINDEX = null;
    var SERVERURL = "http://" + window.location.hostname + "/playradio.php";
    $scope.playingStation = "";

    readStations();

  }
]);
