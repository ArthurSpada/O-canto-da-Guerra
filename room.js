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


document.getElementById("user_name").innerHTML = "welcome" + user_name + "!";
function addRoom()
{
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "pagina.html";
}

function getData(){ firebase.database().ref("/").on('value', function(snapshot){
    document.getElementById("output").innerHTML = "";
     snapshot.forEach(function(childSnapshot){
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Room Name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+ Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;
     });
});

}
getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location = "pagina.html";
}
function logout()
{
    localStorage.removeItem("user_names");
    localStorage.removeItem("room_names");
    window.location = "index.html";
}