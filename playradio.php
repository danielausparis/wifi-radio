<?php

  //error_log("RADIO");

  // valid json ?
  // if OK returns JSON_ERROR_NONE
  function isValidJSON($str) {
    json_decode($str);
    return json_last_error();
  }

  function errorExit() {
    header('Access-Control-Allow-Origin: *');
    header("HTTP/1.0 400 Bad Request");
    exit();
  }

  function notFoundExit() {
    header('Access-Control-Allow-Origin: *');
    header("HTTP/1.0 404 Not Found");
    exit();
  }

  function normalExit() {
    header('Access-Control-Allow-Origin: *');
    header("HTTP/1.0 200 OK");
    exit();
  }


  // CORS HANDLING
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    exit();
  }


  // parameter extract
  $params = file_get_contents("php://input");

  // global verify
  if (strlen($params) > 0 && isValidJSON($params) == JSON_ERROR_NONE) {
    $jsonparms = json_decode($params, true);
    //error_log("RADIO : " . print_r($jsonparms, true));
  }
  else {
    errorExit();
  }

  if ($jsonparms['task'] === 'play') {

    $myurl = $jsonparms['url'];

    system("killall mpv > /dev/null 2>&1");
    //error_log('killed cvlc');

    //system("mpv --audio-device='alsa/plughw:CARD=Device,DEV=0' " . $myurl . "> /dev/null 2>&1 &");
    exec("mpv --audio-device='alsa/plughw:CARD=Device,DEV=0' " . $myurl . "> /dev/null 2>&1 &");
    error_log('playing ' . $myurl);

    normalExit();

  }

  elseif ($jsonparms['task'] === 'stop') {
    system("killall mpv > /dev/null 2>&1");
    error_log('stopped');
    normalExit();
  }
  elseif ($jsonparms['task'] === 'vol-') {
    system("amixer -c 3 -q sset Speaker 10%- > /dev/null 2>&1");
    error_log('decrease volume');
    normalExit();
  }
  elseif ($jsonparms['task'] === 'vol+') {
    system("amixer -c 3 -q sset Speaker 10%+ > /dev/null 2>&1");
    error_log('increase volume');
    normalExit();
  }

  elseif ($jsonparms['task'] === 'saveStations') {
    $stations = $jsonparms['stations'];
    error_log('saving ' . $stations);
    file_put_contents('stations', $stations);
    normalExit();
  }
  elseif ($jsonparms['task'] === 'getStations') {
    $stations = file_get_contents('stations');
    error_log('read ' . $stations);
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Content-Type, origin");
    echo $stations;
  }
  elseif ($jsonparms['task'] === 'shutdown') {
    error_log('shutdown server');
    system("sudo shutdown 0");
    normalExit();
  }



  else {
    errorExit();
  }

?>
