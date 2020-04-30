import Quill from 'quill'
import ImageUploader from 'quill-image-uploader'
import ImageResize from 'quill-image-resize-module'

import $ from 'jquery'

import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'


//On créer notre Quill avec les plugins
Quill.register({
    'modules/imageUploader': ImageUploader,
    'modules/imageResize': ImageResize
})


//Options de la barre d'outils
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    ['image'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


//Autres options dont l'upload d'images
var options = {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions,
        imageResize: [],
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData()
                    formData.append('image', file)

                    $.ajax({
                        url: '/image',
                        method: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false
                    }).then(response => {
                        resolve(response.url)
                    }).catch(error => {
                        reject(error)
                    })
                });
            },
        }
    }
};

//On lance l'éditeur dans la div editor-container
var editor = new Quill('#editor-container', options)


//Fonction pour envoyer le contenu vers le serveur
$('#send').click(function () {
    var content = $('.ql-editor').html()
    $.ajax({
        url: '/send',
        method: 'POST',
        data: {
            'content': content
        }
    }).then(response => {
        alert('Success')
    }).catch(error => {
        alert('Error')
    })
})