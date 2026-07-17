// Reveal-on-scroll. Adds .is-in to .tc-reveal elements as they enter the viewport.
// Framework-agnostic; in React port the same logic into a hook or wrapper component.
(function(){
  var els = document.querySelectorAll('.tc-reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('is-in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin:'0px 0px -10% 0px', threshold:.12 });
  els.forEach(function(e){ io.observe(e); });
})();
