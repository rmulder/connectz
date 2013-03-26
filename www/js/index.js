/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Array.prototype.remove = function(v) {
  return $.grep(this, function(e) {
    return e !== v;
  });
};

function alphabeticalSort(a, b) {
  if (a.name.formatted < b.name.formatted){
    return -1;
  }else if (a.name.formatted > b.name.formatted){
    return  1;
  }else{
    return 0;
  }
}

var app = {
    watchID: null,
    map: null,
    myLocationMarker: null,
    searchCircle: null,
    myLocation: null,
    selectedRows: [],
    contacts: {},

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      $('#sample-row').hide();
      $.mobile.showPageLoadingMsg();
        app.receivedEvent('deviceready');
        //app.startGPS();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var options = new ContactFindOptions();
        options.filter="";  options.multiple=true;  var fields = [ "displayName", "name", "phoneNumbers", "photos" ];
        navigator.contacts.find(fields,
                function(contacts) {
                  var tmp = '', i, j, contactObject, phone, row = 0;
                  for (i = 0; i < contacts.length; i++) {
                    if (contacts[i].phoneNumbers) {
                      contactObject = contacts[i];
                      //console.log(contacts[i].name.givenName);
                      for (j = 0; j < contactObject.phoneNumbers.length; j++) {
                        phone = contactObject.phoneNumbers[j];
                        //console.log('phoneNumber:');
                        //console.log(phone);
                        if (phone.type === 'mobile' || phone.type === 'other') {
                          app.contacts[phone.value] = contactObject;
                          tmp += app.buildContactRow(contactObject, phone.value, row);
/*
                          rowclass = (row%2 === 0)? 'a' : 'e';
                          first = (contactObject.name.givenName && contactObject.name.givenName !== 'null') ? contactObject.name.givenName : '';
                          last = (contactObject.name.familyName && contactObject.name.familyName !== 'null') ? contactObject.name.familyName : '';
                          fi = (first) ? first.substring(0,1) : '';
                          li = (last) ? last.substring(0,1) : '';

                          tmp += '<li>';
                          tmp += '  <label data-corners="false"> <input type="checkbox" class="checkbox-row" data-theme="' + rowclass + '" value="' + contactObject.id + '"/>';
                          tmp += '    <div class="ui-grid-b">';
                          tmp += '      <div class="ui-block-a" style="width:13%"> ' + fi + li + '</div>';
                          tmp += '      <div class="ui-block-b" style="width:49%">' + first + ' ' + last + '</div>';
                          tmp += '      <div class="ui-block-c" style="width:38%"><a href="tel:' + phone.value + '">' + phone.value + '</a></div>';
                          tmp += '    </div>';
                          tmp += '  </label>';
                          tmp += '</li>';
*/
                          row++;
                        }
                      }
                    }
                  }

                  console.log(app.contacts);
                  //console.log(tmp);
                  $('#contactList').append(tmp);
                  $('#contactList').listview("refresh");
                  //$('#contactList').trigger('create').trigger('updatelayout');
                  $('#contactList').trigger('create');
                  //$('#home').trigger('create');
                  $.mobile.hidePageLoadingMsg();
                  $('input[type=checkbox]').on('click', function(i) {
                    var th = $(this);
                    //alert($(this).val());
                    //alert($(this).prop('checked'));
                    //alert($(this).is(':checked'));
                    if ($(this).is(':checked')) {
                      app.selectedRows.push(th.data('phone'));
                    } else {
                      app.selectedRows = app.selectedRows.remove(th.data('phone'));
                    }
                    console.log(app.selectedRows);
                  });
                },
                function (contactError) {
                    alert('onError!');
                },
                options);

      console.log('Received Event: ' + id);
    },

    buildContactRow: function(contactObject, phone, row, checked) {
      var tmp = '', fi, li, first, last, ck = '',
          rowclass = (row%2 === 0)? 'a' : 'e';

      checked = checked || false;
      if (checked) {
        ck = ' checked';
      }
      first = (contactObject.name.givenName && contactObject.name.givenName !== 'null') ? contactObject.name.givenName : '';
      last = (contactObject.name.familyName && contactObject.name.familyName !== 'null') ? contactObject.name.familyName : '';
      fi = (first) ? first.substring(0,1) : '';
      li = (last) ? last.substring(0,1) : '';

      tmp += '<li>';
      tmp += '  <label data-corners="false"> <input type="checkbox"' + ck + ' class="checkbox-row" data-phone="' + phone + '" data-theme="' + rowclass + '" value="' + contactObject.id + '"/>';
      tmp += '    <div class="ui-grid-b">';
      tmp += '      <div class="ui-block-a" style="width:13%"> ' + fi + li + '</div>';
      tmp += '      <div class="ui-block-b" style="width:49%">' + first + ' ' + last + '</div>';
      tmp += '      <div class="ui-block-c" style="width:38%"><a href="tel:' + phone + '">' + phone + '</a></div>';
      tmp += '    </div>';
      tmp += '  </label>';
      tmp += '</li>';
      return tmp;
    },

    startGPS: function() {
        console.log('begin: startGPS');
        // simulate getting position from GPS
        app.myLocation = new google.maps.LatLng(39, -90);
        console.log(app.myLocation);
        
        // create Google map
        var mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: app.myLocation
        };
        console.log(mapOptions);
        app.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        console.log(app.map);
        google.maps.event.trigger(app.map, 'resize');
        
        app.myLocationMarker = new google.maps.Marker({
                                                  title: 'This is me!',
                                                  zIndex: 90,
                                                  optimized: false,
                                                  map: app.map,
                                                  position: app.myLocation
                                                  });
        
        app.searchCircle = new google.maps.Circle({
                                              fillColor: '#c0e4dd',
                                              strokeColor: '#f15f22',
                                              fillOpacity: 0.5,
                                              radius: 1500,
                                              map: app.map,
                                              center: app.myLocation
                                              });
        // using bindTo instead does not fix the problem
        //  searchCircle.bindTo('center', myLocationMarker, 'position'); //This will set the circle bound to the marker at center
        console.log('end: startGPS');
    },
    
    MoveMarkerAndCircle: function(lat, lng) {
        console.log('begin: MoveMarkerAndCircle');
        app.myLocation = new google.maps.LatLng(lat, lng);
        app.myLocationMarker.setPosition(app.myLocation);
        
        // set circle invisible before moving and visible after does fix redraw for 4.1.1
        // but causes some annoying flashing of the circle for 4.1.1 and everything else
        //  searchCircle.setVisible(false);
        app.searchCircle.setCenter(app.myLocation);
        //  searchCircle.setVisible(true);
        console.log('end: MoveMarkerAndCircle');
    },
    
    GenerateFakeMovement: function() {
        console.log('begin: GenerateFakeMovement');
        var currentPosition = app.myLocationMarker.getPosition();
        var newLat = currentPosition.lat() + 0.001;
        var newLng = currentPosition.lng() + 0.001;
        app.MoveMarkerAndCircle(newLat, newLng);
        console.log('end: GenerateFakeMovement');
    }
    
};
