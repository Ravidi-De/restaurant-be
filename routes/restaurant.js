// import express from "express";
// import { Owner } from "../models/Owner.js";
// import bcrypt from "bcrypt";
// const router = express.Router();

// router.post('/register'/async(req,res) => {
//     try {
//         const { username, password, reg,hoteltype } = req.body;
//         const owner =await Owner.findOne({ownername})
//         if(owner){
//             return res.json({message:"owner is registered"})
//         }
//         const hashPassword = await bcrypt.hash(password,10)
//         const newowner =new Owner({
//             ownername,
//             password:hashPassword,
//             reg:reg,
//             hoteltype

//         })
//         await newowner.save()
//         return res.json({registered:true})

//     }catch (error) {
//         return res.json({message:"Error in registering owner"})

//     }

// })
// export {router as ownerRouter}

//ChatGPT -edition
import express from "express";
import { Restaurant } from "../models/Restaurant.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, location, imageUrl } = req.body;

    const newRestaurant = new Restaurant({
      name,
      location,
      imageUrl,
    });

    await newRestaurant.save();
    return res.json({ added: true });
  } catch (error) {
    console.error("Error in adding restaurant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.json(restaurants);
  } catch (err) {
    console.error("Error in fetching restaurants:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    return res.json(restaurant);
  } catch (err) {
    console.error("Error in fetching restaurant:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/restaurant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({ updated: true, restaurant });
  } catch (err) {
    console.error("Error in updating restaurant:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/restaurant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    return res.json({ deleted: true, restaurant });
  } catch (err) {
    console.error("Error in deleting restaurant:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Restaurant.countDocuments();
    return res.json({ count });
  } catch (err) {
    console.error("Error in counting restaurants:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



export { router as restaurantRouter };
