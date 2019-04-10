var app = {
    url: 'https://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',

    initialize: () => {
        document.addEventListener('deviceready', app.onDeviceReady);
    },

    onDeviceReady: () => {
        app.heyListen();
        app.fetchBoy();

        //add if you have time
        //app.url = app.url + 'female';
        //app.url = app.url + 'male';
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
        console.log(profiles);
        let imgBaseURL = 'https:' + decodeURIComponent(myJson.imgBaseURL);

        //console.log(imgBaseURL);

        profiles.forEach(profile => {
            //console.log(profile.id);
            //console.log(imgBaseURL + profile.avatar)
            // console.log(profile.first);
            // console.log(profile.last);
            // console.log(profile.gender);
            // console.log(profile.distance);

            let card = document.createElement('div')
            card.classList.add('card');
            card.classList.add('fixed');

            let img = document.createElement('img');
            img.src = (imgBaseURL + profile.avatar);
            img.alt = (profile.first + profile.last);
            card.appendChild(img);

            let Name = document.createElement('h2');
            Name.textContent = (`${profile.first}  ${profile.last}`);
            card.appendChild(Name);

            let Gender = document.createElement('p');
            Gender.textContent = profile.gender;
            card.appendChild(Gender);

            let Distance = document.createElement('p');
            Distance.textContent = profile.distance;
            card.appendChild(Distance);

            document.querySelector('.Potentials').appendChild(card);
        });

        let target = document.querySelectorAll('.card');
        // console.log('Swipe Target',target);
        target.forEach((card) => {
            let tiny = new tinyshell(card);
            console.log(card);
            tiny.addEventListener('swipeleft', app.not);
            tiny.addEventListener('swiperight', app.hot);
        })



    },
    hot: (ev) => {
        //swipe right
        console.log(ev.currentTarget)
        console.log('hot')
        ev.currentTarget.classList.add('right')
        app.fetchBoy();
    },
    not: (ev) => {
        //swipe left
        console.log(ev.currentTarget)
        ev.currentTarget.classList.add('left')
        console.log('not')
        app.fetchBoy();
    },
};

app.initialize();