window.addEventListener("load", function() {
    var ToolbarUIItemProperties = {
        title : "Page Cleaner",
        icon : "icons/hello-button.png",
        onclick : function() {
            
        }
    };
    var button = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
    opera.contexts.toolbar.addItem(button);
    
    opera.extension.onmessage = function(event){
        window.opera.postError('Received message from base.js');
        if(event.data === 'load'){
            enableButton();
        }
    }
    
    function enableButton(){
        if( opera.extension.tabs.getFocused() ){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    }
    opera.extension.tabs.onfocus = enableButton;
    opera.extension.tabs.onblur = enableButton;
}, false);
