import $ from 'jquery';
export function closeModal(){ 
    $('.modal').css({'display':'none'});
    $('body').toggleClass('modal-opened');
}
export function openModal(){
    $('.modal').css({'display':'block'});
    $('body').toggleClass('modal-opened');
}