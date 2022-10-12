import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from './dao/moviesDAO.js';
// import _ from 'lodash';
// import router from './api/movies.controller.js';
async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000;
    // will get env varible from both 
    try {
        // connect to MongoDB server
        await client.connect();
        await MoviesDAO.injectDB(client);
        app.listen(port, () => {
            console.log('Server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);