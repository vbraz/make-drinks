//importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('make-drink').then(function(cache) {
     return cache.addAll([
       'style.css',
       'script.js',
       'drinks.json'
     ]);
   })
 );
});