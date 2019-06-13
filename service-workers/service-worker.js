var version = 1;
var cacheName = 'stale-' + version;

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
});

self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);

    if (requestUrl.pathname === '/urlshortener/v1/url' &&
      event.request.headers.has('X-Mock-Response')) {

        var response = {
          body: {
            kind: 'urlshortener#url',
            id: 'https://goo.gl/KqR3lJ',
            longUrl: 'https://www.packtpub.com/books/info/packt/about'
          },
          init: {
            status: 200,
            statusText: 'OK',
            headers: {
              'Content-Type': 'application/json',
              'X-Mock-Response': 'yes'
            }
          }
        };

        var mockResponse = new Response(JSON.stringify(response.body), response.init);

        console.log('Mock Response: ', response.body);
        event.respondWith(mockResponse);
    }
    
    // Always fetch response from the network
    event.respondWith(
        fetch(event.request).then(function(response) {
            caches.open(cacheName).then(function(cache) {
                // If we received an error response
                if(response.status >= 500) {
                    cache.match(event.request).then(function(response) {
                        // Return stale version from cache
                        return response;
                    }).catch(function() {
                        // No stale version in cache so return network response
                        return response;
                    });
                } else {
                    // Response was healthy so update cached version
                    cache.put(event.request, response.clone());
                    return response;
                }
            });
        })
    );
});
