var app = {
    url: 'http://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',


    initialize: () => {
        document.addEventListener('deviceready', app.onDeviceReady);
    },


    onDeviceReady: () => {
        app.heyListen();
        app.fetchBoy
    },
    heyListen: () => {
        document.addEventListener();
    },

    fetchBoy: () => {}



};

app.initialize();