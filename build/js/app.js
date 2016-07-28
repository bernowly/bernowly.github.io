
var db = firebase.database();

function registrar() {
    var email = document.querySelector('input[name="signup-email"]').value;
    var password = document.querySelector('input[name="signup-password"]').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

function entrar() {
    var email = document.querySelector('input[name="signin-email"]').value;
    var password = document.querySelector('input[name="signin-password"]').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

function entrarFacebook() {
    console.log('Entrar Facebook');
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
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

function entrarGoogle() {
    console.log('Entrar Google');
}

function redefinirSenha() {
    console.log('Redefinir Senha');
}

function sair() {
    console.log('Sair');
    firebase.auth().signOut().then(function() {
        localStorage.clear();
        mainView.router.loadPage('index.html');
    }, function(error) {

    });
}


function tirarFoto() {
    $('#photo').trigger('touchstart');
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
            navigator.serviceWorker.register('../../sw.js').then(function(reg) {
                console.log(':^)', reg);
                reg.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function(sub) {
                    console.log('endpoint::', sub.endpoint);
                    db.ref('messages/' + 123).set({
                        new: true,
                        code: sub.endpoint.substring(40)
                    });
                });
            }).catch(function(error) {
                console.log(':^(', error);
            });
        }
        localStorage.setItem('xpto-auth', user.displayName);
        localStorage.setItem('profile-email', user.email);
        localStorage.setItem('profile-image', user.photoURL);
        mainView.router.loadPage('home.html');

    } else {

    }
});
