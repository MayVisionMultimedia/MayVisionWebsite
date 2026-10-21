
(function(){
  var d=document,b=d.body,root=d.documentElement;
  try{if(localStorage.getItem('mvm-theme')==='light')b.classList.add('light')}catch(e){}
  var t=d.getElementById('tt');
  if(t)t.onclick=function(){var l=b.classList.toggle('light');try{localStorage.setItem('mvm-theme',l?'light':'dark')}catch(e){}};
  var bg=d.getElementById('bg'),nv=d.getElementById('nv');
  if(bg)bg.onclick=function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
  /* reveal on scroll */
  var rv=[].slice.call(d.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('in')});
  /* 3D tilt on tiles */
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!rm){[].forEach.call(d.querySelectorAll('.tile,.cc'),function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+(x*9)+'deg) rotateX('+(-y*9)+'deg) translateY(-6px)'});
    c.addEventListener('mouseleave',function(){c.style.transform=''});
  })}
  /* video modal (YouTube + Vimeo) */
  var m=d.getElementById('md'),f=d.getElementById('mf'),lastFocus=null;
  window.pv=function(kind,id,ev){
    if(ev&&(ev.ctrlKey||ev.metaKey||ev.shiftKey))return true;
    var src=kind==='v'?'https://player.vimeo.com/video/'+id+'?autoplay=1':'https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0';
    f.innerHTML='<iframe src="'+src+'" title="Video player" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>';
    lastFocus=d.activeElement;m.classList.add('open');b.style.overflow='hidden';d.getElementById('mx').focus();return false;
  };
  function close(){f.innerHTML='';m.classList.remove('open');b.style.overflow='';if(lastFocus)lastFocus.focus()}
  d.getElementById('mx').onclick=close;
  m.addEventListener('click',function(e){if(e.target===m)close()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open'))close()});
  /* contact form -> FormSubmit -> mayvisionmultimedia@gmail.com */
  var form=d.getElementById('cf');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=d.getElementById('cfmsg'),btn=form.querySelector('button[type=submit]');
      var data={};new FormData(form).forEach(function(v,k){data[k]=v});
      if(data._honey)return;
      msg.className='msg';btn.disabled=true;btn.textContent='Sending...';
      fetch('https://formsubmit.co/ajax/mayvisionmultimedia@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json()}).then(function(j){
        if(j.success==='true'||j.success===true){msg.className='msg ok';msg.textContent='Thank you! Your enquiry has been sent. We will get back to you soon.';form.reset();btn.textContent='Sent ✓'}
        else throw new Error('fail');
      }).catch(function(){
        var body=encodeURIComponent('Name: '+data.name+'\nCompany: '+(data.company||'')+'\nPhone: '+(data.phone||'')+'\nService: '+(data.service||'')+'\nEvent date: '+(data.event_date||'')+'\n\n'+(data.message||''));
        msg.className='msg err';msg.innerHTML='Sorry, we could not send it automatically. <a href="mailto:mayvisionmultimedia@gmail.com?subject='+encodeURIComponent('Website enquiry')+'&body='+body+'" style="color:var(--cyan)">Click here to email us directly</a> or WhatsApp us.';
        btn.disabled=false;btn.textContent='Send Enquiry';
      });
    });
  }
})();
