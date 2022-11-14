const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    manifestOptions: {
        name: "TestProject",
        short_name: "TestProject",
        start_url: "./",
        display: "standalone",
        theme_color: "#4DBA87",
        background_color: "#000000",
        icons: [
            {
                "src": "img/icons/favicon-16x16.png",
                "type": "image/png",
                "sizes": "16x16",
                "purpose": "any"
            },
            {
                "src": "img/icons/favicon-32x32.png",
                "type": "image/png",
                "sizes": "32x32",
                "purpose": "any"
            },
            {
                "src": "img/icons/msapplication-icon-144x144.png",
                "type": "image/png",
                "sizes": "144x144",
                "purpose": "any"
            },
            {
                "src": "img/icons/mstile-150x150.png",
                "type": "image/png",
                "sizes": "150x150",
                "purpose": "any"
            },
            {
                "src": "img/icons/android-chrome-192x192.png",
                "type": "image/png",
                "sizes": "192x192",
                "purpose": "any"
            },
            {
                "src": "img/icons/android-chrome-512x512.png",
                "type": "image/png",
                "sizes": "512x512",
                "purpose": "any"
            },
            {
                "src": "img/icons/android-chrome-maskable-192x192.png",
                "type": "image/png",
                "sizes": "192x192",
                "purpose": "any"
            },
            {
                "src": "img/icons/android-chrome-maskable-512x512.png",
                "type": "image/png",
                "sizes": "512x512",
                "purpose": "any"
            },
            {
              "src": "img/icons/apple-touch-icon-60x60.png",
              "type": "image/png",
              "sizes": "60x60",
              "purpose": "any"
            },
            {
              "src": "img/icons/apple-touch-icon-76x76.png",
              "type": "image/png",
              "sizes": "76x76",
              "purpose": "any"
            },
            {
              "src": "img/icons/apple-touch-icon-120x120.png",
              "type": "image/png",
              "sizes": "120x120",
              "purpose": "any"
            },
            {
              "src": "img/icons/apple-touch-icon-152x152.png",
              "type": "image/png",
              "sizes": "152x152",
              "purpose": "any"
            },
            {
              "src": "img/icons/apple-touch-icon-180x180.png",
              "type": "image/png",
              "sizes": "180x180",
              "purpose": "any"
            },
        ],
    },

    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
        favicon32: 'img/icons/favicon-32x32.png',
        favicon16: 'img/icons/favicon-16x16.png',
        appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
        maskIcon: 'img/icons/safari-pinned-tab.svg',
        msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
  },
})
