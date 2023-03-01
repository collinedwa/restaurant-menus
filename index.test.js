const db = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        newRestaurant = await Restaurant.create({
            name: "Howdy Fellers",
            location: "The Back Alley",
            cuisine: "Western",
            rating: 3
        });

        expect(newRestaurant.name).toEqual("Howdy Fellers");
        expect(newRestaurant.rating).toEqual(3);
    });

    test('can create a Menu', async () => {
        newMenu = await Menu.create({
            title: "Grubby Grubs"
        });

        expect(newMenu.title).toEqual("Grubby Grubs");
    });

    test('can find Restaurants', async () => {
        results = await Restaurant.findAll();
        console.log(results);
        expect(results.length).toEqual(1);
    });

    test('can find Menus', async () => {
        results = await Menu.findAll();
        console.log(results);
        expect(results.length).toEqual(1);
    });

    test('can delete Restaurants', async () => {
        foundRestaurant = await Restaurant.findByPk(1);

        await foundRestaurant.destroy();

        restaurantSearch = await Restaurant.findAll({
            where: {
                name: "Howdy Fellers"
            }
        });

        expect(restaurantSearch.length).toBe(0);
    });

    test('can delete Menus', async () => {
        foundMenu = await Menu.findByPk(1);

        await foundMenu.destroy();

        menuSearch = await Menu.findAll({
            where: {
                title: "Grubby Grubs"
            }
        });

        expect(menuSearch.length).toBe(0);
    });
})