'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "809e6e73097ad873e037ae1b4c2d5646",
"index.html": "9583c4f9a9df12d74a1f3b5727389dee",
"/": "9583c4f9a9df12d74a1f3b5727389dee",
"main.dart.js": "bcb30fdc197926228fbddbf0f7f79c16",
"404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "10efa323192ae11847f90f60e47af814",
"assets/AssetManifest.json": "f1892d60cbc0bfaf483abf5f30ddc6a7",
"assets/NOTICES": "5e66d30dba22b6dc0290ff43a32907b2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "2aade80cb1f8c9c6dbc94cb00b39bc13",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.bin": "c13a3291b84fbcb2a3e8718c3d5820d8",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/assets/BgPosters/BgPoster.json": "7dc87b189e206597efc806d253f1e6c2",
"assets/assets/BgPosters/AstronautBgPoster.json": "191c41d473f07a4ecfa84faad137bb72",
"assets/assets/BgPosters/AnnouncemetPoster.json": "ef6d5bab68ebd8d7ad643f7d81ed9bae",
"assets/assets/BgPosters/MoonBgPoster.json": "ccbffee1a9dc636cedda6b6a6c1d497f",
"assets/assets/BgPosters/AstranautBgPoster2.json": "5e9a5ed17941908e0a87df513f904ae3",
"assets/assets/Images/SwiftLogo.png": "22c088135f2d4a9a7586078a7144f776",
"assets/assets/Images/AnirudhImage.jpeg": "9449b755e28e9713004b412515933c5a",
"assets/assets/Images/LionImage.jpeg": "6fcd2627b0ea6439d5b042abf25abb8e",
"assets/assets/Images/GoLangLogo.png": "5648e990564409cc0241df03bbae6bbe",
"assets/assets/Images/WebRTCLogo.png": "669cefbf3bc9f90d8d093eebadc8366a",
"assets/assets/Images/FlutterBLOCLogo.png": "977fbfba561065f9a68c4b47f9774531",
"assets/assets/Images/AniketImage.jpeg": "9f32af4548a0dbbbe2ef9d4c867d6465",
"assets/assets/Images/GitLogo.png": "3d861408185671a6eff173f1eabec885",
"assets/assets/Images/DockerLogo.png": "4ac0b420be135da2d022893431589585",
"assets/assets/Images/FlutterLogo.png": "8efb797d33c586ef3cb71d4083dd1fdb",
"assets/assets/Images/PosgreSqlLogo.png": "6b40945e2ebdf6cec403e2ab257f3d65",
"assets/assets/Images/mysql.png": "db421d5cd26362c9b4fdee5390083ed8",
"assets/assets/Images/FigmaLogo.png": "497f287338586c39043b6a206cf24338",
"assets/assets/Images/PrakharImage.jpeg": "3e13a092c3bf056b37f2eb52fb60bf40",
"assets/assets/Images/FirebaseLogo.png": "38145573ad956ab969b3e4d4ffbcf354",
"assets/assets/Images/MihirImage.jpeg": "87034ad49cb7ece1262edbebb36d5e34",
"assets/assets/Images/GraphQLLofo.png": "435115c1933ecc1b24aaa7361e7af140",
"assets/assets/Images/SwiftUILogo.jpeg": "bab756cb4c8a0fde0e3043c20b523e1f",
"assets/assets/Images/YellowHeartEmoji.webp": "1c0e52286b3a616cd20960e521397435",
"assets/assets/Images/SwiftUILogo.png": "b374d23547edfc13c885a5fe6dac64bb",
"assets/assets/Images/GraphQLLogo.png": "0306534f7faebca2efe1997fe13aa12c",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "4124c42a73efa7eb886d3400a1ed7a06",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "f87e541501c96012c252942b6b75d1ea",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "64edb91684bdb3b879812ba2e48dd487",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
