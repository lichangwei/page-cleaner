
var ToolbarUIItemProperties = {
    title : "Page Cleaner",
    icon : "icons/hello-button.png",
    onclick : function() {
        if( button.disabled ) return;
        var tab = opera.extension.tabs.getFocused();
        if( tab ) tab.postMessage({'cmd': 'clean'});
        button.disabled = true;
    }
};
var button = opera.contexts.toolbar.createItem(ToolbarUIItemProperties);
opera.contexts.toolbar.addItem(button);

window.addEventListener("load", function() {
    var template = document.getElementById('template').innerHTML;
    
    opera.extension.onconnect = function(e){
        if(e && e.origin && e.origin.indexOf("popup.html") > -1 
            && e.origin.indexOf('widget://') > -1){
        }else{
            event.source.postMessage( {'cmd': 'template', 'template': template} );
            enableButton();
        }
    }
    opera.extension.onmessage = function(event){
        var message = event.data;
        if( message.cmd === 'disable-button' ){
            button.disabled = true;
        }else if( message.cmd === 'enable-button' ){
            button.disabled = false;
        }
    }
    
    opera.extension.tabs.onfocus = enableButton;
    opera.extension.tabs.onblur = enableButton;
}, false);

function enableButton(){
    var tab = opera.extension.tabs.getFocused();
    if( tab ) button.disabled = false;
    else button.disabled = true;
}
