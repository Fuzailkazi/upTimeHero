import express from "express"
import { prismaClient } from "store/client"
import { AuthInput } from "./types"
const app = express()
app.use(express.json())


app.post('/user/signin', (req, res) => {
    const data = AuthInput.safeParse(req.body.data)
    if (!data.success) {
        res.status(403).send(" ")
        return
    }
})

app.post('/user/signup', (req, res) => {
    const data = AuthInput.safeParse(req.body.data)
    if (!data.success) {
        res.status(403).send(" ")
        return
    }
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

})

app.listen(process.env.PORT || 3000)