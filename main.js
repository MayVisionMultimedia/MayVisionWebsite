
(function(){
  var b=document.body;
  try{if(localStorage.getItem('mvm-theme')==='light')b.classList.add('light')}catch(e){}
  var t=document.getElementById('tt');
  if(t)t.onclick=function(){var l=b.classList.toggle('light');try{localStorage.setItem('mvm-theme',l?'light':'dark')}catch(e){}};
  var bg=document.getElementById('bg'),nv=document.getElementById('nv');
  if(bg)bg.onclick=function(){nv.classList.toggle('open')};
  var m=document.getElementById('md'),f=document.getElementById('mf');
  window.pv=function(id){f.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0" allow="autoplay;fullscreen" allowfullscreen></iframe>';m.classList.add('open');b.style.overflow='hidden'};
  function c(){f.innerHTML='';m.classList.remove('open');b.style.overflow=''}
  document.getElementById('mx').onclick=c;
  m.addEventListener('click',function(e){if(e.target===m)c()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')c()});
})();
