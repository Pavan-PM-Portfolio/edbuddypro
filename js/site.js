/* ═══════════════════════════════════════════════════════════
   edBuddy Pro — site.js
   Swaps every <div data-include="name"></div> for
   components/name.html. Each component carries its own styles
   and behaviour, so there is nothing else to wire up.
   Needs http:// — fetch() is blocked on file://.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var BASE = document.currentScript
    ? document.currentScript.src.replace(/js\/site\.js.*$/, '')
    : '';

  function inject(slot) {
    var name = slot.getAttribute('data-include');
    return fetch(BASE + 'components/' + name + '.html')
      .then(function (r) {
        if (!r.ok) throw new Error(name + ' \u2192 ' + r.status);
        return r.text();
      })
      .then(function (html) {
        var tpl = document.createElement('template');
        tpl.innerHTML = html;

        /* pull this component's scripts out — inert inside a template,
           and we must not touch scripts already running on the page */
        var scripts = [].slice.call(tpl.content.querySelectorAll('script'));
        scripts.forEach(function (s) { s.parentNode.removeChild(s); });

        slot.parentNode.replaceChild(tpl.content, slot);

        scripts.forEach(function (old) {
          var s = document.createElement('script');
          for (var i = 0; i < old.attributes.length; i++)
            s.setAttribute(old.attributes[i].name, old.attributes[i].value);
          s.textContent = old.textContent;
          document.body.appendChild(s);
        });
      })
      .catch(function (e) {
        console.error('[site.js]', e.message);
        slot.setAttribute('data-include-failed', '');
      });
  }

  function boot() {
    var slots = [].slice.call(document.querySelectorAll('[data-include]'));
    Promise.all(slots.map(inject)).then(function () {
      document.dispatchEvent(new CustomEvent('site:ready'));
    });
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
