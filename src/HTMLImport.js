window.onload = function() {

    let getImport = document.querySelector('link[rel="import"]');

    let getContent = getImport.import.querySelector('#mauticform_wrapper_grailsorgguidesuggestionform');

    document.getElementById("suggestion-form").appendChild(getContent.cloneNode(true));
};