firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (document.readyState === "complete") {
            getdata(firebase.auth().currentUser);
        }
        else {
            console.log(document.readyState);
            document.addEventListener('readystatechange', function (event) {
                getdata(firebase.auth().currentUser);
            });
        }
    } else {
      // No user is signed in.
      console.log("No user");
    }
});

function getdata(user){
    var myUserId = user.uid;
    firebase.database().ref("Farms/" +myUserId + '/Animals/').once('value').then(function(snapshot){
      var livestock_div=document.getElementById('livestock');
      livestock_div.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      for(let[key,value] of Object.entries(data)){
          livestock_div.innerHTML="<tr><th><img src='"+value.imageUrl+"' style='height:50px; width:50px; border-radius:25px; object-fit: cover;'>" + "</th><td>"+value.tagNumber+"</td><td>"+value.breed+"</td><td>"+value.weight+"</td><td>"+value.year+"</td></tr><tr>"+livestock_div.innerHTML;
      }
    
    });
}
  
function logout(){
    firebase.auth().signOut();
    window.location = 'index.html';
}