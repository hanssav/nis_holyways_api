const { User, Fund, Payment } = require("../../models")
// const { updateDonate } = require("./payment")

exports.addUser = async (req, res) => {
    try {
        const dataUser = req.body
        const createdUser = await User.create(dataUser)

        res.send({
            status: "success",
            createdUser
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const showUsers = await User.findAll({
            attributes: {
                exclude: ['password', 'status', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: "success",
            showUsers
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getUsersByPayment = async(req, res) => {
    try {
        const showUsers = await User.findAll({
            include: {
                model: Payment,
                as: "payment",
                limit: 10,
                attributes: {
                exclude: ['createdAt', 'updatedAt']
                }
                // where: {
                //     fundId: 1
                // },
            },
            attributes: {
                exclude: ['password', 'status', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: "success",
            showUsers
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getUser = async(req, res) => {
    try {
        const { id } = req.params

        const dataUuser = await User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: "success",
            dataUuser
        })

    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params

        await User.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete User id = ${id} Successfuly`
        })

    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const newUser = req.body

        await User.update(newUser, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update data user id ${id} Successfuly`,
            data: newUser
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.editUserDonate = async (req, res) => {
    try {
        const { fundId, userId } = req.params
        const statusPayment = req.body;

        await Payment.update(statusPayment, {
            where: {
                fundId: fundId,
                userId: userI
            },
            attributes: {
                exclude : ["createdAt", "updatedAt"]
            }

        })

        let fundData = await Fund.findOne({
            include: {
                model: User,
                as: "userDonate",
                through: {
                    model: Payment,
                    as: "payment",
                    attributes: {
                        exclude: [ "createdAt", "updatedAt"]
                    },
                },
                attributes: {
                    exclude: ["password", "status", "createdAt", "updatedAt"]
                }
            },
            where: {
                id: fundId
            },
            attributes: {
                exclude: ["adminId", "createdAt", "updatedAt"]
            }
        })

        let payment = await Payment.findOne({
            where: {
                id: fundId
            }
        })

        res.send({
            status: 'success',
            message: 'Update Successfully',
            fundData
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}