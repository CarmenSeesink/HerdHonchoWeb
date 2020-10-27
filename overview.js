firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Logged in");

        var user = firebase.auth().currentUser;

        window.onload = function(){
            this.getdata();
        }

    } else {
      // No user is signed in.
      console.log("No user");
    }
});

function getdata(){
    var myUserId = user.uid;
    firebase.database().ref( myUserId + 'Animals/').once('value').then(function(snapshot){
      var livestock_div=document.getElementById('livestock');
      livestock_div.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      for(let[key,value] of Object.entries(data)){
        livestock_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
        "<div class='card'>"+
        "<img src='"+value.imageURL+"' style='height:250px;'>"+
        "<div class='card-body'><p class='card-text'>"+value.tagNumber+"</p>"+
        "</div></div></div>"+posts_div.innerHTML;
      }
    
    });
}
  
function logout(){
    firebase.auth().signOut();
    window.location = 'index.html';
}