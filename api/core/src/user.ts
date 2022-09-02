import { API, RegisterOptions } from "lambda-api";
import prisma from '../prisma/prisma';

module.exports = (api: API, opts: RegisterOptions) => {
    api.get("/", async (req, res) => {
        try {
            const arrUser = await prisma.user.findMany();
            res.status(200).json({ items: arrUser });
        } catch (e) {
            console.error(e);
            res.error(e);
        }
    });

    api.post("/", async (req, res) => {
        try {
            let item: any = {};

            console.log('aki 1');
            console.log(req.body);
            console.log(req.body.id);
            console.log(req.body.username);
            console.log('aki 2');
            


            if (req.body.id != null) {
                item = await prisma.user.findUnique({
                    where: {
                        id: req.body.id
                    }
                });
            }
            item.username = req.body.username;
            item.password = req.body.password;
            item.email = req.body.email;
            console.log(item);
            if (item.id != null) {
                await prisma.user.update({ where: { id: item.id }, data: item });
            } else {
                await prisma.user.create({ data: item });
            }
            res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            res.error(e);
        }
    });

    api.delete("/", async (req, res) => {
        try {
            if (req.body.id == null) {
                res.status(200).json({ success: false });
                return;
            }
            await prisma.user.delete({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json({ success: true });
        } catch (e) {
            res.status(200).json({ success: false });
        }
    });
};