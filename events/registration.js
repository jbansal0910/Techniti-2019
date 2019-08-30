
var config = {
    apiKey: "AIzaSyAOzIIUWqCvEUGxTeHBFpHXk-AL-Am7u4o",
    authDomain: "axis2019-47b13.firebaseapp.com",
    databaseURL: "https://axis2019-47b13.firebaseio.com",
    projectId: "axis2019-47b13",
    storageBucket: "axis2019-47b13.appspot.com",
    messagingSenderId: "282546345277"
};
firebase.initializeApp(config);
var usersRef = firebase.database().ref().child('users');

function eventRegistration(eventName, teamName, key){

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('eventRegistration/'+ eventName + '/' + teamName + '/' + key);

     oldRef.once('value', function(snap)  {

        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          oldRef.child('Competitions/'+eventName).set("Registered");
    });
}

function startEvent(eventName){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
            sessionStorage.setItem("onlineEvent",eventName);
            window.location.href = '../onlineEvent.html';  
      }
      else
      {
        alert("Please login to start test . You will be redirected to google sign in.");
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function onSuccess(result) {
            
            var user = firebase.auth().currentUser;
            var emailkey = user.email;
            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
            
            firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                // if signing in for the first time we cannot find any related entry in the database
                if (snapshot.val() == null) 
                {           
                    var formPath = sessionStorage.getItem("formPath");
                    alert("Sign Up first ");
                    window.location.href = formPath;                        
                }
                else if( snapshot.val().phone == -1 && window.location.href !== "form.html" )
                {
                    var formPath = sessionStorage.getItem("formPath");
                    alert("Complete your registration ");  
                    window.location.href = formPath;   
                }
                else
                {
                    sessionStorage.setItem("onlineEvent",eventName);
                    window.location.href = '../onlineEvent.html';
                }
            });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }
  });
}


function eventRegistration2(eventName, teamName, key  ,department){

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('eventRegistration/'+ eventName + '/' + department + '/' +  teamName + '/' + key);

     oldRef.once('value', function(snap)  {

        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          oldRef.child('Competitions/'+eventName).set("Registered");
    });
}

function lectureRegistration(lecturer,key){
    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('GUEST LECTURES/' + lecturer + '/' + 'Registration' + '/' + key);

     oldRef.once('value', function(snap)  {
        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          oldRef.child('GUEST LECTURES/'+lecturer).set("Registered");
          alert("You have successfully registered for guest lecture of " + lecturer + " !");
     });
}

function checkEntry(id,email,name) {

    if(id!="" || email!="" || name!="")
    {
        if(id!="" && email!="" && name!="")
        {
            return 1;
        }
        else
        {
            alert("Please fill all the details of member");
            return 2; // invalid entry
        }
    }
    else
    {    
        return 0;   // empty field
    }
}

function register(){

    var eventName = document.forms["myForm"]["eventName"].value;
    var teamName = document.forms["myForm"]["teamName"].value;

    var name1 = document.forms["myForm"]["name1"].value;
    var id1 = document.forms["myForm"]["id1"].value;
    var email1 = document.forms["myForm"]["email1"].value;
    
    var name2 = document.forms["myForm"]["name2"].value;
    var id2 = document.forms["myForm"]["id2"].value;
    var email2 = document.forms["myForm"]["email2"].value;

    var name3 = document.forms["myForm"]["name3"].value;
    var id3 = document.forms["myForm"]["id3"].value;
    var email3 = document.forms["myForm"]["email3"].value;

    var name4 = document.forms["myForm"]["name4"].value;
    var id4 = document.forms["myForm"]["id4"].value;
    var email4 = document.forms["myForm"]["email4"].value;
    
    var name5 = document.forms["myForm"]["name5"].value;
    var id5 = document.forms["myForm"]["id5"].value;
    var email5 = document.forms["myForm"]["email5"].value;

    var name6 = document.forms["myForm"]["name6"].value;
    var id6 = document.forms["myForm"]["id6"].value;
    var email6 = document.forms["myForm"]["email6"].value;

    var name = [];
    var id = [];
    var email = [];
    var key = [];
    
    if (teamName == -1) {
        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        teamName = key1;
    }

    var allEntriesValid = true;
    var status ;

    status = checkEntry(id1,email1,name1); 
    if( status == 1)
    {
        name.push(name1);
        id.push(id1);
        email.push(email1);

        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }
    
    status = checkEntry(id2,email2,name2);
    if(status == 1)
    {
        name.push(name2);
        id.push(id2);
        email.push(email2);

        var key1 = email2.slice(0,email2.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id3,email3,name3);
    if( status == 1)
    {

        name.push(name3);
        id.push(id3);
        email.push(email3);
        var key1 = email3.slice(0,email3.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }


    status = checkEntry(id4,email4,name4); 
    if(status == 1)
    {
        name.push(name4);
        id.push(id4);
        email.push(email4);

        var key1 = email4.slice(0,email4.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id5,email5,name5);
    if(status == 1)
    {
        name.push(name5);
        id.push(id5);
        email.push(email5);

        var key1 = email5.slice(0,email5.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id6,email6,name6);
    if( status == 1)
    {
        name.push(name6);
        id.push(id6);
        email.push(email6);

        var key1 = email6.slice(0,email6.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    if(allEntriesValid && key.length > 0)
    {
        isTeamNameValid(eventName,teamName,key,id,name);    
    }

    return false;
}

function register2(){

    var eventName = document.forms["myForm"]["eventName"].value;
    var teamName = document.forms["myForm"]["teamName"].value;
    var department = document.forms["myForm"]["department"].value;

    var name1 = document.forms["myForm"]["name1"].value;
    var id1 = document.forms["myForm"]["id1"].value;
    var email1 = document.forms["myForm"]["email1"].value;
    
    var name2 = document.forms["myForm"]["name2"].value;
    var id2 = document.forms["myForm"]["id2"].value;
    var email2 = document.forms["myForm"]["email2"].value;

    var name3 = document.forms["myForm"]["name3"].value;
    var id3 = document.forms["myForm"]["id3"].value;
    var email3 = document.forms["myForm"]["email3"].value;

    var name4 = document.forms["myForm"]["name4"].value;
    var id4 = document.forms["myForm"]["id4"].value;
    var email4 = document.forms["myForm"]["email4"].value;
    
    var name5 = document.forms["myForm"]["name5"].value;
    var id5 = document.forms["myForm"]["id5"].value;
    var email5 = document.forms["myForm"]["email5"].value;

    var name6 = document.forms["myForm"]["name6"].value;
    var id6 = document.forms["myForm"]["id6"].value;
    var email6 = document.forms["myForm"]["email6"].value;

    var name = [];
    var id = [];
    var email = [];
    var key = [];
    
    if (teamName == -1) {
        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        teamName = key1;
    }

    var allEntriesValid = true;
    var status ;

    status = checkEntry(id1,email1,name1); 
    if( status == 1)
    {
        name.push(name1);
        id.push(id1);
        email.push(email1);

        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }
    
    status = checkEntry(id2,email2,name2);
    if(status == 1)
    {
        name.push(name2);
        id.push(id2);
        email.push(email2);

        var key1 = email2.slice(0,email2.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id3,email3,name3);
    if( status == 1)
    {

        name.push(name3);
        id.push(id3);
        email.push(email3);
        var key1 = email3.slice(0,email3.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }


    status = checkEntry(id4,email4,name4); 
    if(status == 1)
    {
        name.push(name4);
        id.push(id4);
        email.push(email4);

        var key1 = email4.slice(0,email4.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id5,email5,name5);
    if(status == 1)
    {
        name.push(name5);
        id.push(id5);
        email.push(email5);

        var key1 = email5.slice(0,email5.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(id6,email6,name6);
    if( status == 1)
    {
        name.push(name6);
        id.push(id6);
        email.push(email6);

        var key1 = email6.slice(0,email6.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    if(allEntriesValid && key.length > 0)
    {
        isTeamNameValid2(eventName,teamName,key,id,name,department);    
    }

    return false;
}
function checkUsers(eventName , teamName , key, id, name, i, len){

    var isValidEmail = false;
    var flag = false;
    firebase.database().ref('/users/' + key[i]).once('value').then(function(snapshot) {
            if (snapshot.val() == null)
            {
                isValidEmail = false;
                alert( name[i] + " you have not Sign up . Please sign up in www.axisvnit.org and get the Axis ID !" );
            }
            else if( snapshot.val().axisid != id[i] )
            {
                flag = false;
                alert(  name[i] + " your ID not valid . You can check your axis id by login in www.axisvnit.org " );
            }
            else if( snapshot.val().phone == -1 )
            {
                alert(name[i] + " Please Complete your registration in www.axisvnit.org ");
            }
            else
            {
                flag = true;
                isValidEmail = true;
            } 
        }).then(function onSuccess(res) {
            i++;
            if(i == len && isValidEmail && flag)
            {
                for (j = 0; j < len; j++) {
                  eventRegistration(eventName, teamName , key[j]);
                } 
                if(eventName == 'BRAINSTORM')
                {
                    alert("In order to confirm your registration , make the registration payment refering to the payment policy .");
                }
                else if( eventName == 'TECHNODOCX' )
                {
                    alert("In order to confirm your registration , Please fill ");
                }
                else
                {
                    alert("Successfully Registered !");
                }   
            }
            else if(isValidEmail && flag)
            {
                checkUsers(eventName , teamName , key, id, name, i, len);
            }
        });   
}
function checkUsers2(eventName , teamName , key, id, name, i, len,department){

    var isValidEmail = false;
    var flag = false;
    firebase.database().ref('/users/' + key[i]).once('value').then(function(snapshot) {
            if (snapshot.val() == null)
            {
                isValidEmail = false;
                alert( name[i] + " you have not Sign up . Please sign up in www.axisvnit.org and get the Axis ID !" );
            }
            else if( snapshot.val().axisid != id[i] )
            {
                flag = false;
                alert(  name[i] + " your ID not valid . You can check your axis id by login in www.axisvnit.org " );
            }
            else if( snapshot.val().phone == -1 )
            {
                alert(name[i] + " Please Complete your registration in www.axisvnit.org ");
            }
            else
            {
                flag = true;
                isValidEmail = true;
            } 
        }).then(function onSuccess(res) {
            i++;
            if(i == len && isValidEmail && flag)
            {
                for (j = 0; j < len; j++) {
                  eventRegistration2(eventName, teamName , key[j] , department);
                } 
                if(eventName == 'BRAINSTORM')
                {
                    alert("In order to confirm your registration , make the registration payment refering to the payment policy .");
                }
                else
                {
                    alert("Successfully Registered !");
                }   
            }
            else if(isValidEmail && flag)
            {
                checkUsers2(eventName , teamName , key, id, name, i, len,department);
            }
        });   
}

function isTeamNameValid(eventName, teamName, key , id , name){

    firebase.database().ref('/eventRegistration/' + eventName + '/' + teamName).once('value').then(function(snapshot) {

        if (snapshot.exists()) {
            alert("team name already exists . Please take another team name.");
        }
        else
        {
            var len = key.length;
            checkUsers(eventName , teamName , key,id, name, 0, len);    
        }
    });
}
function isTeamNameValid2(eventName, teamName, key , id , name,department){

    firebase.database().ref('/eventRegistration/' + eventName + '/' + department + '/' + teamName).once('value').then(function(snapshot) {

        if (snapshot.exists()) {
            alert("team name already exists . Please take another team name.");
        }
        else
        {
            var len = key.length;
            checkUsers2(eventName , teamName , key,id, name, 0, len , department);    
        }
    });
}

function guestLecturesRegister(lecturer){

    var user = firebase.auth().currentUser;
    if (user) {
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            // if signing in for the first time we cannot find any related entry in the database
            if (snapshot.val() == null) 
            {    
               
            }
            else if (snapshot.val().phone == -1 && window.location.href !== "form.html")
            {
                alert("Sign Up first");
            }
            else
            {
                lectureRegistration(lecturer,key);    
            }
        });
    } 
    else  
    {
        alert("Please Sign up before Registration ");
    }
}

function submitQuery(lecturer,key,query){

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('GUEST LECTURES/' + lecturer + '/' + 'Queries' + '/' + query + '/' + key);

     oldRef.once('value', function(snap)  {
        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          alert("Query submited successfully !");
     });
}

function AskQuery(lecturer,formName,queryName){


    var query = document.forms[formName][queryName].value;
    query = query.replace(/[^a-zA-Z0-9 ]/g, "") ; 

    var user = firebase.auth().currentUser;
    if (user) {
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            // if signing in for the first time we cannot find any related entry in the database
            if (snapshot.val() == null) 
            {    
               
            }
            else if (snapshot.val().phone == -1 && window.location.href !== "form.html")
            {
                alert("Sign Up first");
            }
            else
            {

                var emailkey = user.email;
                var key = emailkey.slice(0,emailkey.search('@'));
                key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

                submitQuery(lecturer,key,query);    
            }
        });
    } 
    else  
    {
        alert("Please Sign up for asking any Queries ");
    }
    return false;
}

function myRegistrations(){
    
    firebase.auth().onAuthStateChanged(function(user) {
        if(user)
        {
            var emailkey = user.email;
            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 
            

            firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                document.getElementById("name").innerHTML = snapshot.val().username;
                document.getElementById("id").innerHTML = snapshot.val().axisid;
                document.getElementById("email").innerHTML = snapshot.val().email; 
            });

            var CompetitionRef = firebase.database().ref().child('/users/'+ key + '/Competitions');
            var GuestLecRef = firebase.database().ref().child('/users/'+ key+ '/GUEST LECTURES');
            var workshopRef = firebase.database().ref().child('/users/'+ key+ '/WORKSHOPS');

            var retval = "";
            var count = 0;
            CompetitionRef.once('value').then(function(snapshot) {
                retval = retval + "<div class='heading'> EVENTS </div><div class='eventsName'><ul>" ; 
                snapshot.forEach(function (element)
                {
                    retval =  retval + "<li>" + element.key + "</li>" ;
                    count = count + 1;
                });
                retval = retval + "</ul></div>";
                
            }).then(function onSuccess(res) {
                if(count > 0)
                {
                    document.getElementById("myEvent").innerHTML = retval;                
                }
            });

            var guestLecture = "";    
            count2 = 0;
            GuestLecRef.once('value').then(function(snapshot) {
                guestLecture = guestLecture + "<div class='heading'> GUEST LECTURES </div><div class='eventsName'><ul>" ; 
                snapshot.forEach(function (element)
                {
                    guestLecture = guestLecture + "<li>" + element.key + "</li>" ;
                    count2 = count2 + 1;
                });
                guestLecture = guestLecture + "</ul></div>";
                
            }).then(function onSuccess(res) {
                if( count2 > 0 )
                {
                    document.getElementById("myLect").innerHTML = guestLecture;
                }
            });

            var workshop = "";    
            count3 = 0;
            workshopRef.once('value').then(function(snapshot) {
                workshop = workshop + "<div class='heading'> WORKSHOPS </div><div class='eventsName'><ul>" ; 
                snapshot.forEach(function (element)
                {
                    workshop = workshop + "<li>" + element.key + "</li>" ;
                    count3 = count3 + 1;
                });
                workshop = workshop + "</ul></div>";
                
            }).then(function onSuccess(res) {
                if( count3 > 0 )
                {
                    document.getElementById("workshop").innerHTML = workshop;
                }
            }); 
        }
        else 
        {
        }
    });
}

function showMyRegistrations(path){
    var user = firebase.auth().currentUser;
    if(user)
    {
        window.location.href = path;        
    }
}

function singleEventRegister(eventName){
    var user = firebase.auth().currentUser;
    if(user)
    {
        // if user is logged in
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
        eventRegistration(eventName, key, key);
        alert("You have successfully registered for the event " + eventName + " !");
    }
    else
    {
        // if user is not logged in then redirect to google sign in ...
        alert("Please Sign up before Registration. You will be redirected to google sign in.");
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function onSuccess(result) {
            /*
            document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'hidden';
            document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'visible';
            document.getElementsByClassName("myRegistrations")[0].style.visibility = 'visible';
            */
            var user = firebase.auth().currentUser;
            var emailkey = user.email;
            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
            
            firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
                // if signing in for the first time we cannot find any related entry in the database
                if (snapshot.val() == null) 
                {           
                    var formPath = sessionStorage.getItem("formPath");
                    alert("Sign Up first ");
                    window.location.href = formPath;                        
                }
                else if( snapshot.val().phone == -1 && window.location.href !== "form.html" )
                {
                    var formPath = sessionStorage.getItem("formPath");
                    alert("Complete your registration ");  
                    window.location.href = formPath;   
                }
                else
                {
                    var user = firebase.auth().currentUser;
                    var emailkey = user.email;
                    var key = emailkey.slice(0,emailkey.search('@'));
                    key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
                    
                    eventRegistration(eventName, key, key);
                    alert("You have successfully registered for the event " + eventName + " !");
                    /*
                    var axisid = (snapshot.val() && snapshot.val().axisid) || null;
                    document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                    document.getElementsByClassName("techNITi19id")[0].innerHTML = axisid;*/
                }
            });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
}

function checkIfLogin(){
    var user = firebase.auth().currentUser;
    if(user)
    {
        $("#myModal").modal();
    }
    else
    {
        alert("Please sign in to register your team . You will be redirected to google sign in");
        login();   
    }
}
