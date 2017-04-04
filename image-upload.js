//Set variables for elements.
var addButton =document.getElementById('image-upload-button');
var deleteButton =document.getElementById('image-delete-button');
var img =document.getElementById('image-tag');
var hidden =document.getElementById('image-hidden-field');

/*wp.media object 
wp.media is used to handle and control the admin media modal. 
For instance, custom image selector/uploader controls and meta boxes. 
It is located in the wp scope/namespace.*/
var customUploader = wp.media({
    title: 'Select an Image',
        button:{
            text:'Use this Image'
        },
        multiple:false
});

/*Add and remove buttons on interface depending if a image is in modal or not.*/
var toggleVisibility=function(action){
    if('ADD' === action){
        addButton.style.display='none';
        deleteButton.style.display='';
        img.setAttribute('style','width: 100%;');
    }
    if ('DELETE'===action){
        addButton.style.display='';
        deleteButton.style.display='none';
        img.removeAttribute('style');
    }
}

/*Trigger admin media modal popup*/
addButton.addEventListener('click',function(){
    if(customUploader){
        customUploader.open();
    }
});

customUploader.on('select',function(){
    var attatchment =customUploader.state().get('selection').first().toJSON();
    img.setAttribute('src',attatchment.url);
    hidden.setAttribute('value',JSON.stringify([{id:attatchment.id,url:attatchment.url}]));
    toggleVisibility('ADD');
});

deleteButton.addEventListener('click',function(){
    img.removeAttribute('src');
    hidden.removeAttribute('value');
    toggleVisibility('DELETE');
});

window.addEventListener('DOMContentLoaded',function(){
    if(""===customUploads.imageData||0===customUploads.imageData.length){
       toggleVisibility('DELETE'); 
    }else{
        img.setAttribute('src', customUploads.imageData.src);
        hidden.setAttribute('value',JSON.stringify([customUploads.imageData]));
        toggleVisibility('ADD');
    }
});