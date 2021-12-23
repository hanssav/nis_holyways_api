const { funds, payments, user } = require("../../models");

exports.getFunds = async (req, res) => {
    try {
        const data = await funds.findAll({
            // include: {
            //     model: payments,
            //     as: "payments",
            //     attributes: {
            //         exclude: ['id', "createdAt", "updatedAt"]
            //     }
            // },
            include: {
                model: user,
                as: "userDonate",
                attributes: {
                    exclude: ['id', "createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ['id', 'userId', 'createdAt', 'updatedAt']
            }
        })
        console.log(data)

        res.send({
            status: "success",
            data
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.addFund = async(req, res) => {
    try {
        const dataFund = req.body
        const createFund = await funds.create(dataFund)

        res.send({
            status: "success",
            createFund
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateFund = async (req, res) => {
    try {
        const { id } = req.params
        const newFund = req.body

        await funds.update(newFund, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update data Fund Successfuly`,
            data: newFund
        })

    } catch (error) {
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteFund = async (req, res) => {
    try {
        const {id} = req.params

        await funds.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete Fund id = ${id} Successfuly`
        })

    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}