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