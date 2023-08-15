import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/routes.js";

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hacker know about our stack

const port = 8000;

/** HTTP get request */
app.get("/", (req, res) => {
  res.status(201).json("Home GEt request");
});

app.use("/api", router);

/** Start server when connected to the database*/

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is connected. Listening to port - ${port}`);
      });
    } catch (error) {
      console.log(`Cannot connect to the server 💥💥💥`);
    }
  })
  .catch((error) => {
    console.log(`Database not connected  💥💥💥`);
  });
