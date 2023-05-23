var firebaseConfig = {
      apiKey: "AIzaSyBjlE_FONWQJPVzEXbHetm5RXgHPiIY8YQ",
      authDomain: "o-canto-da-guerra.firebaseapp.com",
      databaseURL: "https://o-canto-da-guerra-default-rtdb.firebaseio.com",
      projectId: "o-canto-da-guerra",
      storageBucket: "o-canto-da-guerra.appspot.com",
      messagingSenderId: "679100735001",
      appId: "1:679100735001:web:355145ca544a6a6a131488",
      measurementId: "G-NTXH4TS58B"
    };
    firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send()
  {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").vale = "";
  }

function getData() 
{ firebase.database().ref("/"+room_name).on('value', function(snapshot)
 { document.getElementById("output").innerHTML = "";
  snapshot.forEach(function(childSnapshot) 
  { childKey  = childSnapshot.key;
       childData = childSnapshot.val();
        if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
         console.log(firebaseMessageId);
         console.log(messageData);
         name = messageData['name'];
         message = messageData['message'];
         like = messageData['like'];
         name_with_tag = "<h4>"+name+ "<img class='user_trick' src='lido.jpg'></h4>";
         message_with_tag = "<h4 class='message_h4'>"+ message + "</h4>";
         like_button ="<button class='btn bt' id="+firebaseMessageId+" value ="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like:"+ like +"</span></button><hr>";

         row = name_with_tag + message_with_tag +like_button + span_with_tag;
         document.getElementById("output").innerHTML +=row;
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicked on like button - "+ message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id). update({
            like : update_likes
      });
}
function logout()
{
    localStorage.removeItem("userNames");
    localStorage.removeItem("roomNames");
    window.location = "index.html";
}