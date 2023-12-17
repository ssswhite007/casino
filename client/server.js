import express from "express"
const app = express();
import { handler } from "./build/handler.js";

app.use(express.static('public'));

app.use(handler);

const port = 9002;
app.listen(port, () => { 
   console.log(`server is on running on port ${port}`);
})
