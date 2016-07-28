// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.hideIndicator();
});



$$(document).on('pageInit', function(e) {

    var page = e.detail.page;

    if (page.url === 'home.html') {
        var cpf = localStorage.getItem('cpf');
        var nome = localStorage.getItem('xpto-auth');
        var img = localStorage.getItem('profile-image');
        var email = localStorage.getItem('profile-email');
        $('#profile-img').attr('src', img);
        $('#profile-name').text(nome);
        $('#profile-email').text(email);
        // myApp.popup('.popup-ident');
        var pnome = nome.split(" ")[0];
        if (cpf == undefined) {
            myApp.prompt('Olá '+pnome+'! Por favor digite o seu CPF/CNPJ', 'Vincular conta',
                function(value) {
                    localStorage.setItem('cpf', value);
                },
                function() {}
            );
        }


    }
    /*
    var auth = localStorage.getItem('xpto-auth');
    if (auth != undefined) {
        mainView.router.loadPage('home.html');
    }
    */
});
