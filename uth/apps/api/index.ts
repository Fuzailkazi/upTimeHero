import express from "express"
import jwt from "jsonwebtoken"
import { prismaClient } from "store/client"
import { AuthInput } from "./types"
const app = express()
app.use(express.json())

app.post("/user/signup", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        console.log(data.error.toString());
        res.status(403).send("");
        return;
    }

    try {
        let user = await prismaClient.user.create({
            data: {
                username: data.data.username,
                password: data.data.password
            }
    })
        res.json({
            id: user.id
        })
    } catch(e) {
        console.log(e);
        res.status(403).send("");
    }
})


app.post("/user/signin", async (req, res) => {
    const data = AuthInput.safeParse(req.body);
    if (!data.success) {
        res.status(403).send("");
        return;
    }

    let user = await prismaClient.user.findFirst({
        where: {
            username: data.data.username
        }
    })

    if (user?.password !== data.data.password) {
        res.status(403).send("");
        return;
    }

    let token = jwt.sign({
        sub: user.id
    }, process.env.JWT_SECRET!)


    res.json({
        jwt: token
    })
})

app.post('/website', async (req, res) => {
    if (!req.body.url) {
        res.status(411).json({})
        return
    }
    const website = await prismaClient.website.create({
        data: {
            url: req.body.url,
            time_added: new Date(),
            user_id: req.body.name!
        }
    })

    res.json({
        id: website.id
    })
})

app.get('/status/:webisteId', (req, res) => {
    const data = AuthInput.safeParse(req.body.data);
    if(!data.success){
        res.status(403).send("")
        return
    }
})

app.listen(process.env.PORT || 3000)