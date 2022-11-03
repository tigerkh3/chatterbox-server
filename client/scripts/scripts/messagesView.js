// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    MessagesView.render();
    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
  },

  render: function() {
    // TODO: Render _all_ the messages.
    // message = data[i];
    // data[i]= {message_id: 75141, roomname: '123', text: 'sadf', username: 'thomas', github_handle: 'thomascvan', …}
    //clear the #chats DIV
    MessagesView.$chats.empty();
    if (Rooms.select === 'lobby') {
      for (var i = 0; i < Messages._data.length; i ++) {
        MessagesView.renderMessage(Messages._data[i]);
      }
    } else {
      for (var i = 0; i < Messages._data.length; i ++) {
        if (Messages._data[i].roomname === Rooms.select) {
          MessagesView.renderMessage(Messages._data[i]);
        }
      }
    }
    Friends._data.forEach(function (friend) {
      $('.' + friend).css({'font-style': 'italic', 'font-weight': 'bold','text-decoration': 'underline'});
    });
  },

  //MessageView.render(message);
  //$("#chats").append(html);
  renderMessage: function(message) {
    // TODO: Render a single message.
    //$message  = $(<div class="chat"><div class="username">message.username</div><div>message.text</div></div>)

    //if the message text is null
    if (message.text !== null) {
      var escapedOne = message.text.replaceAll('<', '&lt;');
      var escapedTwo = escapedOne.replaceAll('>', '&gt;');
      message.text = escapedTwo;
    }

    if (message.username !== null) {
      var escapedOne = message.username.replaceAll('<', '&lt;');
      var escapedTwo = escapedOne.replaceAll('>', '&gt;');
      message.username = escapedTwo;
    }

    var $message = MessageView.render(message);
    MessagesView.$chats.append($message);
  },

  handleClick: function(event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
    // var friend = $('.chat').val();
    //var friend = this.find('.username').val();
    //Friends.add(friend);

    //this = username DIV element
    var friend = $(this).text();
    var escapedOne = friend.replaceAll('<', '&lt;');
    var escapedTwo = escapedOne.replaceAll('>', '&gt;');
    friend = escapedTwo;
    Friends.toggleStatus(friend);
  }

};