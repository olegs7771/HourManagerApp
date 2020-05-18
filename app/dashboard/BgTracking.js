import React, {useEffect, useState} from 'react';
import {Alert, View, Text} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const BgTracking = props => {
  const [coords, setLocation] = useState(null);

  BackgroundGeolocation.getCurrentLocation((data, fail) => {
    console.log('current location data', data);
    // setLocation({location: 'one'});

    // setLocation(prevState => ({
    //   ...prevState,
    //   lat: data.latitude,
    //   lng: data.longitude,
    // }));
  });

  useEffect(() => {
    // console.log('coords', coords);
    // props.coordsChild(coords);

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      // debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 100000,
      fastestInterval: 50000,
      activitiesInterval: 20000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar',
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar', // you can also add your own properties
      },
    });

    BackgroundGeolocation.on('location', location => {
      console.log('location', location);
      // setLocation(prevState => ({
      //   ...prevState,
      //   coords: {
      //     lat: location.latitude,
      //     lng: location.longitude,
      //   },
      // }));
      const data = {
        lat: location.latitude,
        lng: location.longitude,
      };

      // const payload = {
      //   lat: location.latitude,
      //   lng: location.longitude,
      // };
      // props.coordsChild(payload);

      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', error => {
      // console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      // console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      // console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', status => {
      console
        .log
        // '[INFO] BackgroundGeolocation authorization status: ' + status,
        ();
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      // console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      // console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      // console.log('[INFO] Server responded with 285 Updates Not Required');
      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      // console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      // console.log(
      //   '[INFO] BackgroundGeolocation service is running',
      //   status.isRunning,
      // );
      // console.log(
      //   '[INFO] BackgroundGeolocation services enabled',
      //   status.locationServicesEnabled,
      // );
      // console.log(
      //   '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
      // );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();

    // unregister all event listeners
    BackgroundGeolocation.removeAllListeners();
  });

  return null;
};

export default BgTracking;
