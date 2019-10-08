(function(x){
    var o=x.prototype,p='after';
    if(!o[p]){
       o[p]=function(){
        var e, m=arguments, l=m.length, i=0, t=this, p=t.parentNode, n=Node, s=String, d=document;
        if(p!==null){
           while(i<l){
            e=m[i];
            if(e instanceof n){
               t=t.nextSibling;
               if(t!==null){
                   p.insertBefore(e,t);
               }else{
                   p.appendChild(e);
               };
            }else{
               p.appendChild(d.createTextNode(s(e)));
            };
            ++i;
           };
        };
       };
    };
   })(Element);   