var app = {
    url: 'https://griffis.edumedia.ca/mad9022/tundra/get.profiles.php?gender=',
    users: [],
    imgBaseURL: '',

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
        document.querySelector('.b1').addEventListener('click', app.zoop);
        document.querySelector('.b2').addEventListener('click', app.zoop);

    },

    zoop: () => {
        if (document.querySelector('.Potentials').classList.contains('active')) {
            console.log("navigating from Potentials");
            document.querySelector('.Potentials').classList.remove('active');
            document.querySelector('.Favourites').classList.add('active');
        } else if (document.querySelector('.Favourites').classList.contains('active')) {
            console.log("navigating from Favourites");
            document.querySelector('.Favourites').classList.remove('active');
            document.querySelector('.Potentials').classList.add('active');
        }
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
        console.log(myJson);
        app.users = profiles;
        console.log(profiles);
        app.imgBaseURL = 'https:' + decodeURIComponent(myJson.imgBaseURL);


        profiles.forEach(profile => {

            let card = document.createElement('div')
            card.classList.add('card');
            card.classList.add('fixed');
            
           
            card.setAttribute('data-id', profile.id)

            let header = document.createElement('header');
            card.appendChild(header);

            let img = document.createElement('img');
            img.src = (app.imgBaseURL + profile.avatar);
            img.alt = (profile.first + profile.last);
            img.classList.add('round');
            card.appendChild(img);

            let Name = document.createElement('h3');
            Name.textContent = (`${profile.first}  ${profile.last}`);
            header.appendChild(Name);

            let footer = document.createElement('footer');
            card.appendChild(footer);

            let Gender = document.createElement('p');
            Gender.textContent = profile.gender;
            footer.appendChild(Gender);

            let Distance = document.createElement('p');
            Distance.textContent = (profile.distance + " away");
            footer.appendChild(Distance);

            document.querySelector('.Potentials').appendChild(card);
        });

        let target = document.querySelectorAll('.card');
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

        let id = ev.currentTarget.getAttribute('data-id')
        let cards = document.querySelectorAll('.card')


        if (cards.length <= 3) {
            console.log('getting new people')
            app.fetchBoy();
        } else {
            console.log('not getting new people')
        }
        setTimeout(() => {
            ev.target.remove();

        }, 500)

        let fave = document.createElement('li');
        fave.classList.add('list-item')
        //sessionStorage.setItem(id,{"name": user.first + " " + user.last})
        console.log(id)
        app.users.forEach(user => {
            console.log(user.id)

            if (user.id == id) {
                console.log("id found")
                let n = 0
                sessionStorage.setItem(id,JSON.stringify([n,(app.imgBaseURL + user.avatar)]));
                n++;
                let name = document.createElement('h2')
                name.textContent = user.first + " " + user.last;
                let picture = document.createElement('img')
                picture.src= (app.imgBaseURL + user.avatar);
                fave.appendChild(name);
                fave.appendChild(picture);
            }
        });

        document.querySelector('.listo').appendChild(fave);

    },

    not: (ev) => {
        //swipe left
        console.log(ev.currentTarget)
        ev.currentTarget.classList.add('left')
        console.log('not')


        let cards = document.querySelectorAll('.card')
        if (cards.length <= 3) {
            console.log('getting new people')
            app.fetchBoy();
        } else {
            console.log('not getting new people')
        }

        setTimeout(() => {

            ev.target.remove();

        }, 500)




    },

    matches: () => {
        id
        sessionStorage.
        sessionStorage.getItem()
    },
};

app.initialize();