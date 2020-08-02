import $ from 'jquery';
export function closeModal(e){ 
    if(e){
        e.preventDefault();
    }
    $('.modal').css({'display':'none'});
    $('body').toggleClass('modal-opened');
}
export function openModal(e){ 
    if(e){
        e.preventDefault();
    }
    $('.modal').css({'display':'block'});
    $('body').toggleClass('modal-opened');
}