$.fn.jTableSorter = function(options){
  var op = $.extend({}, $.fn.jTableSorter.defaults, options); 
  var signos = [];      
  function cArrows(obj){
    obj.append('<div class="'+op.cls+'Arrows"><span class="'+op.cls+'Arrow '+op.cls+'ArrowUp" style="display:none"></span><span class="'+op.cls+'Arrow '+op.cls+'ArrowDown"  style="display:none"></span></div>');
  }                                    
  function sRows(i,rs,th){
    var j = i+1;
    rs.sort(function(a,b){
      var vad = $(op.tdc+'('+j+')',a);
      var vbd = $(op.tdc+'('+j+')',b);
      
      var va = vad.attr(op.attr)?vad.attr(op.attr):vad.text();
      var vb = vbd.attr(op.attr)?vbd.attr(op.attr):vbd.text();
      
      if (parseFloat(va.replace(',','.'))==va.replace(',','.')) va = parseFloat(va.replace(',','.'));
      if (parseFloat(vb.replace(',','.'))==vb.replace(',','.')) vb = parseFloat(vb.replace(',','.'));
      
      if (parseFloat(va) == va) va = parseFloat(va);
      if (parseFloat(vb) == vb) vb = parseFloat(vb);
      
      if (signos[i]==0) return (Math.random() - Math.random());
      
      if (va>vb) return 1 * signos[i];
      if (va<vb) return -1 * signos[i];
      if (va==vb) return 0; 
    });
    
    $('span.'+op.cls+'Arrow',th).hide();
    if (signos[i]>0){
      signos[i] = -1;
      $(op.thc+'('+j+') span.'+op.cls+'ArrowUp',th).show();
      $(op.thc+'('+j+') span.'+op.cls+'ArrowDown',th).hide();
    }else if (signos[i]<0){
      signos[i] = 0;
      $(op.thc+'('+j+') span.'+op.cls+'ArrowUp',th).hide();
      $(op.thc+'('+j+') span.'+op.cls+'ArrowDown',th).show();
    }else{
      signos[i] = 1;
      $(op.thc+'('+j+') span.'+op.cls+'ArrowUp',th).hide();
      $(op.thc+'('+j+') span.'+op.cls+'ArrowDown',th).hide();
    }
    return rs;
  }
  this.each(function(){
    var t = $(this);
    
    $(this).addClass(op.cls);
    
    var th = $('thead',t);
    var tb = $('tbody',t);
    var thh = $('th',th);
    var rs = $('tr',tb);
    
    if (!th || !tb || !thh || !rs) return false;
    
    $.each(thh,function(inx,itm){
      var a = $(itm);
      signos[inx] = op.iniFactor=='ASC'?1:-1;
      cArrows(a);
      a.live('click',function(){
        tb.html(sRows(inx,rs,th));              
      });    
    });
      
    if(op.ini!=false)
      $(ths[op.ini]).trigger('click');
  });
};

$.fn.jTableSorter.defaults = {  
  cls:'jTableSorter',
  attr:'rel',
  ini:false,
  iniFactor:'ASC',
  tdc:'td:nth-child',
  thc:'th:nth-child'
};