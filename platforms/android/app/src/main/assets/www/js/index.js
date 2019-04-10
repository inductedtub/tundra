var app = {
    url: 'https://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',


    initialize: () => {
        document.addEventListener('deviceready', app.onDeviceReady);
    },


    onDeviceReady: () => {
        app.heyListen();
        app.fetchBoy();
        url = url +'female';
    },
    heyListen: () => {
        //document.addEventListener();
    },

    fetchBoy: () => {

        fetch(app.url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                app.allTheSingleLadies(myJson);
                //console.log(myJson);
            });
    },

    allTheSingleLadies: (myJson) => {
        let profiles = myJson.profiles;
        //console.log(profiles);
        let imgBaseURL = myJson.imgBaseURL;
        //console.log(imgBaseURL);

        profiles.forEach(profile => {
            console.log(profile.id);
            console.log(profile.first);
            console.log(profile.last);
            console.log(profile.gender);
        });

    },

};

app.initialize();