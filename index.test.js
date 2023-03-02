const db = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem
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
        expect(results.length).toEqual(1);
    });

    test('can find Menus', async () => {
        results = await Menu.findAll();
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

    test('Can add multiple items to multiple menus', async () => {
        for (menu of seedMenu){
            newMenu = await Menu.create(menu);
        }
        
        const firstMenu = await Menu.findByPk(2);
        const secondMenu = await Menu.findByPk(3);

        for (item of seedItem){
            currItem = await Item.create(item);
            await firstMenu.addItem(currItem.id);
            await secondMenu.addItem(currItem.id);
        }

        menuList = await Menu.findAll({
            include: [
                {model: Item, as: "items"}
            ]
        })

        const firstMenuItems = menuList[0].items;
        const secondMenuItems = menuList[1].items;
        
        expect(firstMenuItems.length).toEqual(secondMenuItems.length);
    })

    test('can add multiple menus to one restaurant', async () => {
        firstRestaurant = await Restaurant.create(seedRestaurant[0]);
        secondRestaurant = await Restaurant.create(seedRestaurant[1]);

        for (i = 1; i < 5; i++){
            await firstRestaurant.addMenu(i);
            await secondRestaurant.addMenu(i);
        }

        firstRestaurantMenus = await firstRestaurant.getMenus();
        secondRestaurantMenus = await secondRestaurant.getMenus();

        expect(firstRestaurantMenus.length).toBeLessThan(secondRestaurantMenus.length);
    })
})