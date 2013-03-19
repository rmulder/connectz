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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //app.startGPS();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
*/
        var options = new ContactFindOptions();
        //options.filter="Mulder";
        options.filter="";  options.multiple=true;  var fields = [ "displayName", "name", "phoneNumbers", "photos" ];
        //var fields = ["displayName", "name"];
        navigator.contacts.find(fields,
                function(contacts) {
                    console.log(contacts);
                  //alert('contacts.length:' + contacts.length);
                  var tmp = '', fi, li, i, j, arrContactDetails = new Array();
                  /*
                  if (contacts.length) {

                    var arrContactDetails = new Array();
                    for(var i=0; i<contacts.length; ++i){
                      if(contacts[i].name){
                        arrContactDetails.push(contacts[i]);
                      }
                    }

                    arrContactDetails.sort(alphabeticalSort);

                    var alphaHeader = arrContactDetails[0].name.formatted[0];
                    for(var i=0; i<arrContactDetails.length; ++i) {
                      var contactObject = arrContactDetails[i];
                      if( alphaHeader != contactObject.name.formatted[0] ) {
                        alphaHeader = contactObject.name.formatted[0];
                        $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                        $('#contactList').append('<li class="contact_list_item" id="' + contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                      } else {
                        if( i == 0 ) {
                          $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                        }
                        $('#contactList').append('<li class="contact_list_item" id="' + contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                      }

                    }

                  } else {
                    $('#contactList').append('<li><h3>Sorry, no contacts were found</h3></li>');
                  }

                  $('#contactList').listview("refresh");
 */
                    for (i = 0; i < contacts.length; i++) {
                        if (contacts[i].phoneNumbers) {
                          arrContactDetails.push(contacts[i]);
                          /*
                          for (j = 0; j < contacts[i].phoneNumbers.length; j++) {
                            console.log('one');
                            var phone = contacts[i].phoneNumbers[j];
                            console.log('phoneNumber:');
                            console.log(phone);
                            if (phone.type === 'mobile' || phone.type === 'other') {
                              tmp = '';
                              fi = (contacts[i].name.givenName) ? contacts[i].name.givenName.substring(0,1) : '';
                              li = (contacts[i].name.familyName) ? contacts[i].name.familyName.substring(0,1) : '';

                              //tmp += '<li>';
                              tmp += '  <label> <input type="checkbox" name="meetz-1 "/>';
                              tmp += '    <div class="ui-grid-b">';
                              tmp += '      <div class="ui-block-a" style="width:20%"> ' + fi + li + '</div>';
                              tmp += '      <div class="ui-block-b" style="width:47%">' + contacts[i].name.givenName + ' ' + contacts[i].name.familyName + '</div>';
                              tmp += '      <div class="ui-block-c" style="width:33%"><a href="tel:' + phone.value + '">C</a> <a href="sms:' + phone.value + '?body=Meetz: "> T</a></div>';
                              tmp += '    </div>';
                              tmp += '  </label>';
                              //tmp += '</li>';
                              console.log(tmp);
                              //$('#contacts-body').html(tmp);
                              var $list = $("ul#contacts-body");
                              $list.find(".last-child").removeClass("last-child");
                              var $li = $("<li>", {"class": "last-child"}).html(tmp);
                              $list.append($li);
                            }
                          }
                          */
                          console.log('two');
                        }
                        console.log('phone numbers:');
                        console.log(contacts[i].phoneNumbers);
                    }
                  //$('#contacts-body li:last-child').append(tmp);
                  //$('#contacts-body li:last-child').prepend(tmp);
                  //$("<li/>").appendTo("#contacts-body").html(tmp);
                  //$('#contacts-body').html(tmp);
                  $('#contacts-body').listview('refresh');
                  //alert('three');
                  arrContactDetails.sort(alphabeticalSort);
                  console.log(arrContactDetails);
                  var alphaHeader = arrContactDetails[0].name.formatted[0];
                  //alert('five:' + arrContactDetails.length);
                  for( i=0; i<arrContactDetails.length; ++i) {
                    var contactObject = arrContactDetails[i];
                    console.log(contactObject.name.givenName);
                    for (j = 0; j < contactObject.phoneNumbers.length; j++) {
                      console.log('one');
                      var phone = contactObject.phoneNumbers[j];
                      console.log('phoneNumber:');
                      console.log(phone);
                      if (phone.type === 'mobile' || phone.type === 'other') {
                        tmp = '';
                        fi = (contactObject.name.givenName) ? contactObject.name.givenName.substring(0,1) : '';
                        li = (contactObject.name.familyName) ? contactObject.name.familyName.substring(0,1) : '';

                        tmp += '<li>';
                        tmp += '  <label> <input type="checkbox" value="' + contactObject.id + '"/>';
                        tmp += '    <div class="ui-grid-b">';
                        tmp += '      <div class="ui-block-a" style="width:20%"> ' + fi + li + '</div>';
                        tmp += '      <div class="ui-block-b" style="width:47%">' + contactObject.name.givenName + ' ' + contactObject.name.familyName + '</div>';
                        tmp += '      <div class="ui-block-c" style="width:33%"><a href="tel:' + phone.value + '">C</a> <a href="sms:' + phone.value + '?body=Meetz: "> T</a></div>';
                        tmp += '    </div>';
                        tmp += '  </label>';
                        tmp += '</li>';
                        console.log(tmp);
                        $('#contactList').append(tmp);
                        $('#contactList').listview("refresh");
                      }
                    }
                    /*
                    if( alphaHeader != contactObject.name.formatted[0] ) {
                      alphaHeader = contactObject.name.formatted[0];
                      $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                      $('#contactList').append('<li class="contact_list_item" id="' + contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                    } else {
                      if( i == 0 ) {
                        $('#contactList').append('<li data-role="list-divider">' + alphaHeader + '</li>');
                      }
                      $('#contactList').append('<li class="contact_list_item" id="' + contactObject.id + '"><a href="#contact-info">' + contactObject.name.formatted + ' (' + contactObject.id + ')</a></li>');
                    }
                    */
                  }
                  $('#contactList').trigger('create');
                  //$("#home").page();
                  //$.mobile.changePage("#home", {transition: "none"});
                  //$('#home').page('refresh', true);
                  //alert('done');
                },
                function (contactError) {
                    alert('onError!');
                },
                options);
        
        console.log('Received Event: ' + id);
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
