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



//1st
// import express from "express";
// import { Owner } from "../models/Owner.js";
// import bcrypt from "bcrypt";
// const router = express.Router();
// import { verifyAdmin } from "./auth.js"; 


// router.post('/register',verifyAdmin, async (req, res) => {
//     try {
//         const { ownername, password, reg, hoteltype } = req.body;
//         const owner = await Owner.findOne({ ownername });

//         if (owner) {
//             return res.json({ message: "Owner is already registered" });
//         }

//         const hashPassword = await bcrypt.hash(password, 10);
//         const newOwner = new Owner({
//             ownername,
//             password: hashPassword,
//             reg,
//             hoteltype
//         });

//         await newOwner.save();
//         return res.json({ registered: true });
//     } catch (error) {
//         console.error("Error in registering owner:", error);
//         return res.json({ message: "Error in registering owner" });
//     }
// });

// export { router as ownerRouter };

//chatGPT edition 
import express from "express";
import { Owner } from "../models/Owner.js";
import bcrypt from "bcrypt";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { ownername, password, reg, hoteltype } = req.body;
        const owner = await Owner.findOne({ ownername });

        if (owner) {
            return res.json({ message: "Owner is already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newOwner = new Owner({
            ownername,
            password: hashPassword,
            reg,
            hoteltype
        });

        await newOwner.save();
        return res.json({ registered: true });
    } catch (error) {
        console.error("Error in registering owner:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/count", async (req, res) => {
    try {
      const count = await Owner.countDocuments();
      return res.json({ count });
    } catch (err) {
      console.error("Error in counting owners:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

export { router as ownerRouter };
