// //logic of login
// import express from 'express'
// import { Admin } from '../models/Admin.js';
// import { Owner } from '../models/Owner.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'
// const router = express.Router();

// router.post('/login', async (req, res) => {
//     try{
//     const {username, password, role} = req.body;
//     if(role === 'admin') {
//         const admin = await Admin.findOne({username})
//         if(!admin) {
//             return res.json({message: "admin not registered"})
//         }
//         const validPassword = await bcrypt.compare(password, admin.password)
//         if(!validPassword) {
//             return res.json({message: "wrong password"})
//         }
//         const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_Key)
//         res.cookie('token', token, {httpOnly: true, secure: true})
//         return res.json({login:true, role: 'admin'})
//     } else if(role === 'owner') {
//         const owner = await Owner.findOne({ownername})
//         if(!owner) {
//             return res.json({message: "owner not registered"})
//         }
//         const validPassword = await bcrypt.compare(password, owner.password)
//         if(!validPassword) {
//             return res.json({message: "wrong password"})
//         }
//         const token = jwt.sign({username: owner.ownername, role: 'owner'}, process.env.Owner_Key)
//         res.cookie('token', token, {httpOnly: true, secure: true})
//         return res.json({login:true, role: 'owner'})
//     } else {

//     }
//     } catch(er) {
//         res.json(er)
//     }
// })

// const verifyAdmin = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.json({message : "Invalid Admin"})
//     } else {
//         jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
//             if(err) {
//                 return res.json({message: "Invalid token"})
//             } else {
//                 req.username = decoded.username;
//                 req.role = decoded.role;
//                 next()
//             }
//         })
//     }
// }

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if(!token) {
//         return res.json({message : "Invalid User"})
//     } else {
//         jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
//             if(err) {
//                 jwt.verify(token, process.env.Owner_Key, (err, decoded) => {
//                     if(err) {
//                         return res.json({message: "Invalid token"})
//                     } else {
//                         req.username = decoded.username;
//                         req.role = decoded.role;
//                         next()
//                     }
//                 })
//             } else {
//                 req.username = decoded.username;
//                 req.role = decoded.role;
//                 next()
//             }
//         })
//     }
// }

// router.get('/verify',verifyUser, (req, res) => {
//     return res.json({login: true, role: req.role})
// })

// router.get('/logout', (req, res) => {
//     res.clearCookie('token')
//     return res.json({logout : true})
// })

// export {router as AdminRouter, verifyAdmin}





import express from 'express';
import { Admin } from '../models/Admin.js';
import { Owner } from '../models/Owner.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.json({ message: "Admin not registered" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        } else if (role === 'owner') {
            const owner = await Owner.findOne({ ownername: username });
            if (!owner) {
                return res.json({ message: "Owner not registered" });
            }

            const validPassword = await bcrypt.compare(password, owner.password);
            if (!validPassword) {
                return res.json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: owner.ownername, role: 'owner' }, process.env.Owner_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'owner' });
        } else {
            return res.json({ message: "Invalid role" });
        }
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.Owner_Key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

export { router as AuthRouter, verifyAdmin, verifyUser };
