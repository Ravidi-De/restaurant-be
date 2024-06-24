// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "./db.js";
// import { AdminRouter } from "./routes/auth.js";
// import { ownerRouter } from "./routes/owner.js";
// import { restaurantRouter } from "/routes/restaurant.js";
// import {Restaurant} from './model/Restaurant.js'
// import { Owner} from "./models/Owner.js";
// import { Admin } from "./models/Admin.js";

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// dotenv.config();
// app.use("/auth", AdminRouter);
// app.use("/owner", ownerRouter);
// app.use("/restaurant", restaurantRouter);

// app.get('/dashboard',async(req,res) => {
//   try{
//     const owner = await Owner.countDocuments()
//     const admin = await Admin.countDocuments()
//     const restaurant = await Restaurant.countDocuments()
//     return res.json({ok:true, owner, restaurant,admin})

//   }catch(err){
//     return res.json(err)
//   }

// })

// app.listen(process.env.PORT, () => {
//   console.log("Server is Running");
// });






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Connection from "./db.js";
import { AuthRouter } from "./routes/auth.js";
import { ownerRouter } from "./routes/owner.js";
import { adminRouter } from "./routes/admin.js";
import { restaurantRouter } from "./routes/restaurant.js";
import { Restaurant } from './models/Restaurant.js';
import { Owner } from "./models/Owner.js";
import { Admin } from "./models/Admin.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
Connection(); // Call the function to establish MongoDB connection

app.use("/auth", AuthRouter);
app.use("/owner", ownerRouter);
app.use("/admin", adminRouter);
app.use("/restaurant", restaurantRouter);

app.get('/dashboard', async (req, res) => {
  try {
    const ownerCount = await Owner.countDocuments();
    const adminCount = await Admin.countDocuments();
    const restaurantCount = await Restaurant.countDocuments();
    return res.json({ ok: true, owner: ownerCount, restaurant: restaurantCount, admin: adminCount });
  } catch (err) {
    console.error("Error in dashboard:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
