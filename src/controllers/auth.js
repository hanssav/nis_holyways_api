const { User } = require("../../models")

const Joi = require("joi")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

exports.register = async(req, res) => {
    try {
        const data = req.body

        const schema = Joi.object({
            fullName: Joi.string().min(5).required(),
            email: Joi.string().email().min(5).required(),
            password: Joi.string().min(5).required(),
            status: Joi.string().required()
        })

        const { error } = schema.validate(data)

        if (error) {
            return res.status(400).send({
                status: "error",
                message: error.details[0].message
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
            status: data.status
        })

        res.status(201).send({
            status: "success",
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashedPassword,
                token: process.env.TOKEN_KEY
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.login = async(req, res) => {
    const data = req.body

    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate(data)

    if (error) {
        return res.status(400).send({
            status: "error",
            message: error.details[0].message
        })
    }

    try {
        const userExist = await User.findOne({
            where: {
                email: data.email
            },
            attributes: {
                exclude: ["createdAt", "updateAt"]
            }
        })

        const isMatch = await bcrypt.compare(req.body.password, userExist.password)

        if (!isMatch) {
            return res.status(400).send({
                status: "failed",
                message: "email or password doesnt exist"
            })
        }

        const dataToken = {
            id: userExist.id,
            email: userExist.email
        }

        // const SECRET_KEY = 'sangatrahasia'
        const token = jwt.sign(dataToken, process.env.TOKEN_KEY)

        res.status(200).send({
            status: "success",
            data: {
                fullName: userExist.fullName,
                email: userExist.email,
                token
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}