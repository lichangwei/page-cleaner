
window.addEventListener('load', function(){
    
    var background;
    var template;
    opera.extension.onmessage = function(event){
        background = event.source;
        var msg = event.data;
        if( msg.cmd === 'clean' ){
            clean();
        }else if(msg.cmd === 'template'){
            template = msg.template.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }
    };
    
    function clean(){
        if( document.getElementById('oex-page-cleaner-template') ) return;
        var div = document.createElement('div');
        div.innerHTML = template;
        var dom = div.firstChild;
        var content = dom.getElementsByClassName('content')[0];
        var fontSize = dom.getElementsByClassName('font-size')[0];
        var close = dom.getElementsByClassName('close')[0];
        
        dom.style.height = window.innerHeight + 'px';
        
        fontSize.addEventListener('change', function(){
            content.style.fontSize = fontSize.value;
        }, false);
        close.addEventListener('click', function(){
            document.body.removeChild(dom);
        }, false);
        document.body.appendChild( dom );
        content.innerHTML = document.title;
    }
    
    function clean(){
        var script = document.getElementById('oex-printfriendly');
        if( script ) return;
        script = document.createElement('script');
        script.src = 'http://cdn.printfriendly.com/printfriendly.js';
        script.type = 'text/javascript';
        script.onload = function(){
            window.print();
        }
        document.body.appendChild( script );
    }

}, false);