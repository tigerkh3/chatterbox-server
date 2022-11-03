// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Rooms = {

  //create a new variable and assign to an empty string
  //

  // TODO: Define how you want to store the list of rooms
  _data: new Set(),
  select: 'lobby',

  // TODO: Define methods which allow you to add rooms, update the list,
  // mark a room as selected, etc.

  //create a method to retrieve the list of rooms from the server and add them to the _data set
  get: function(data) {
    //visit every message object in the data array
    //add each roomname to the set

    // data[i]= {message_id: 75141, roomname: '123', text: 'sadf', username: 'thomas', github_handle: 'thomascvan', …}
    data.forEach(function(element, index, array) {
      if (element !== Rooms.select) {
        if (element.roomname !== null) {
          var escapedOne = element.roomname.replaceAll('<', '&lt;');
          var escapedTwo = escapedOne.replaceAll('>', '&gt;');
          element.roomname = escapedTwo;
        }
        Rooms._data.add(element.roomname);
      }
    });
    //sort rooms data
    //Array.from(Rooms._data).sort();
  },

  add: function(roomname) {
    Rooms._data.add(roomname);
    Rooms.select = roomname;
  }


};