// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    RoomsView.render();
    RoomsView.handleChange();
    RoomsView.handleClick();
  },

  render: function() {
    // TODO: Render out the list of rooms.

    //iterate over the rooms set
    //call renderRoom at each element
    //clear the rooms list
    RoomsView.$select.empty();

    Rooms._data.forEach(function(roomname) {
      RoomsView.renderRoom(roomname);
    });
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
    //target the rooms select DIV (dropdown list)
    //append an Option div with the input roomname as the inner text
    RoomsView.$select.append($('<option></option>').val(roomname).html(roomname));
    // $(this).val();
    // RoomsView.$select.append($('<option></option>').innerText(roomname));
  },

  handleChange: function(event) {
    // TODO: Handle a user selecting a different room.
    //targeting the dropdown list by its class 'select'
  //
    //$select.change(function(){
    // ... //do stuff here
    // });
    RoomsView.$select.change(function() {
      Rooms.select = RoomsView.$select.val();
      MessagesView.render();
    });
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.

    RoomsView.$button.click(function() {
      var newRoom = prompt('Please enter a room name');
      Rooms.add(newRoom);
      MessagesView.render();
    });
  }

};
