import { AppDataSource } from "./data-source"
import { Address, LatLong, User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25

    const latLong = new LatLong();
    latLong.latitude = -23.5506507;
    latLong.longitude = -46.6333824;
    
    const address = new Address();
    address.latLong = latLong;

    user.address = address;
    
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Loading users from the database...")
    const usersWithLatitudeOnly = await AppDataSource.manager.find(User, {
        select: {
            id: true,
            address: {
                latLong: {
                    latitude: true
                }
            }
        }
    })
    console.log("Loaded users selecting only `address.latLong.latitude` field: ", usersWithLatitudeOnly)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
