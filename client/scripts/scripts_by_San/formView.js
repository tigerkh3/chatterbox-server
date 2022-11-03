// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.


    //create variable message and assign to an empty object
    var message = {};
    //create username property in message object, assign to username
    message.username = App.username;
    //grab text that was input into form and assign it to the text property of message object
    // = $('id_name').val
    message.text = $('#message').val();
    message.roomname = Rooms.select;


    //call parse.create and pass message as argument
    Parse.create(message);

    //call fetch fn
    // messagesView.render();
    /*
    var message = {
        username: 'shawndrost',
        text: 'trololo',
        roomname: '4chan'
        };
    */
    console.log('click!');
  },

  //click event handler
  /** $( "#form" ).click(function() {
  alert( "Handler for .click() called." );
});
*/

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};