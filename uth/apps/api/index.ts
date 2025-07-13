import express from "express"
import { prismaClient } from "store/client"
const app = express()
app.use(express.json())


app.post('/website', async (req, res) => {
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