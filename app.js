// let
let favoriteCityId = "Rome";
console.log(favoriteCityId);
favoriteCityId = "Paris";
console.log(favoriteCityId);
// const
const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
// citiesId = []; // TypeError: Assignment to constant variable.
citiesId.push("tokyo");
console.log(citiesId);
// Création d’objet
function getWeather(cityId) {
    const city = cityId;
    const temperature = 20;
    return { city, temperature };
}
const weather = new getWeather(favoriteCityId);
console.log(weather);
// Affectation destructurée
const { city, temperature } = weather;
console.log(city);
console.log(temperature);
// Rest operator
const [parisId, nycId, ...otherCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(otherCitiesId.length);
// Classe
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl
    }
    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this.price}]`;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}
const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);
parisTrip.price = 100; // utilisation du setter
console.log(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());
// Héritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }
}
const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(freeTrip.toString());
//####################################################################
// Trip Service
//####################################################################
console.log(`
####################################################################
                           Trip Service
####################################################################`)
class TripService {
    constructor() {
        this.setCity = new Set([new Trip('paris', 'Paris', 'img/paris.jpg'), new Trip('nantes', 'Nantes', 'img/nantes.jpg'), new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')]);
    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set
                // ici l'exécution du code est asynchrone
                for (const trip of this.setCity) {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                }
                reject(`No trip with name ${tripName}`);
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        this.priceMap = new Map();
        this.priceMap.set('paris', 100);
        this.priceMap.set('rio-de-janeiro', 800);
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                if (this.priceMap.has(tripId)) {
                    resolve(this.priceMap.get(tripId));
                } else {
                    reject(`no price found for id ${tripId}`);
                }
                this.priceMap.get(tripId)// pas fini
            }, 2000)
        });
    }
}
const tripService = new TripService();
const priceService = new PriceService();

tripService.findByName('Paris').then(trip => console.log(trip), error => console.log(error));
tripService.findByName('Toulouse').then(trip => console.log(trip), error => console.log(error));
// chaînage
tripService.findByName('Rio de Janeiro')
    .then(trip => priceService.findPriceByTripId(trip.id)
        .then(price => console.log(price), error => console.log(error))
        , error => console.log(error));
tripService.findByName('Nantes')
    .then(trip => priceService.findPriceByTripId(trip.id)
        .then(price => console.log(price), error => console.log(error))
        , error => console.log(error));
