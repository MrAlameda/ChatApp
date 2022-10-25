
import express, { Request, Response } from "express"
import config from "./config"

//* init
const app = express()

// ! templates
app.set('view engine', 'ejs')
app.set("views", __dirname + "/views")

//! routes
import auth_routes from "./auth/auth.routes";
import user_routes from "./users/user.routes"

//* middalwere
app.use(express.json())

//! database
import db_seq from "./utils/db.config";
import initModel from "./models/initModels"

db_seq.authenticate()
    .then(() => {
        console.log('================//==================');
        console.log("database Aunthenticated")
        console.log('================//==================');
    })
    .catch((err: Error) => console.error(err.message))

db_seq.sync()
    .then(() => {
        console.log('================//==================');
        console.log("database Synced");
        console.log('================//==================');
    })
    .catch((err: Error) => console.error(err.message))

initModel()

//! enruter
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Home" })
})

// //* routes 
app.use("/users", user_routes)
app.use("/auth", auth_routes)

app.get("*", (req, res) => {
    res.status(404).json({ message: "NotFound" })
})


//* initServer 
app.listen(config.port, () => {
    console.log('====================================');
    console.log(`server listener in port:${config.port}`);
    console.log('====================================');
})
