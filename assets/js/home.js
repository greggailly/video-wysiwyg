import ClassicEditor from 'ckeditor5-build-classic-simpleupload-imageresize'

ClassicEditor.create(document.querySelector('#editor'), {
    simpleUpload: {
        uploadUrl: '/image'
    }
})