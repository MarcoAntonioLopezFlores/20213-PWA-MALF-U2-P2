let url = window.location.href;
let swDirect = '/20213-PWA-MALF-U2-P2/serviceWorker.js'

if(navigator.serviceWorker){

    if(url.includes('localhost')){
        swDirect = '/serviceWorker.js'
    }
    navigator.serviceWorker.register(swDirect)
}else{
    console.log("Ups, cambia de navegador")
}

let principal = $('#principal')
let notice = $('#notice')

$('.btn-follow').on('click', function(e){
    e.preventDefault();
    console.log("push btn")
    principal.fadeOut(function(){
        notice.slideDown(1000)
    })
    
})

$('.btn-back').on('click', function(e){
    e.preventDefault();

    notice.fadeOut(function(){
        principal.slideDown(1000);
    })
})