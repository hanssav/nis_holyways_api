const { Fund, Payment, User } = require("../../models");
const fs = require('fs');

let FILE_PATH = 'http://localhost:5000/uploads/'
let PATH_DELETE = '../BE Holy Ways/uploads/'

exports.getFundsUserDonate = async (req, res) => {
    try {
        let data = await Fund.findAll({
            include: [
                { model: User,
                as: "userDonate",
                    attributes: {
                    exclude: ["password", "status", "createdAt", "updatedAt"]
                },
                through: {
                    model: Payment,
                    as: "payment",
                    // where: {
                    //   fundId: 2
                    // },
                    attributes: {
                        exclude: [ "createdAt", "updatedAt"]
                    }
                }
                }
            ],
            attributes: {
                exclude: ['adminId', 'updatedAt', "createdAt"]
            }
        })

        data = JSON.parse(JSON.stringify(data))
        console.log(data)

        data = data.map((item) => {
            return {
                ...item,
                thumbnail: FILE_PATH + item.thumbnail
                }
            })

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

exports.getFundsUserDonateOne = async (req, res) => {
    try {
        const { id } = req.params

        const data = await Fund.findOne({
            include: {
                id,
                model: User,
                as: "userDonate",
                through: {
                    model: Payment,
                    as: "payment",
                    attributes: {
                        exclude: [ "userId", "fundId", "createdAt", "updatedAt"]
                    },
                },
                attributes: {
                    exclude: ["password", "status", "createdAt", "updatedAt"]
                }
            },
            where: {
                id: id
            },
            attributes: {
                exclude: ['adminId', 'updatedAt', "createdAt"]
            }
        })

        res.send({
            status: "success",
            data
        })

    } catch (error) {
        // console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.addFund = async(req, res) => {
    try {
        const { ...dataFund } = req.body

        const createFund = await Fund.create({
            ...dataFund,
            thumbnail: req.file.filename,
            // userId: req.user.id
        })

        let fundData = await Fund.findOne({
            include: {
                model: User,
                as: "userDonate",
                through: {
                    model: Payment,
                    as: "payment",
                    attributes: {
                        exclude: ["userId", "fundId", "createdAt", "updatedAt"]
                    }
                },
                attributes: {
                    exclude: ["password", "status", "createdAt", "updatedAt"]
                }
            },
            where: {
                id: createFund.id
            },
            attributes: {
                exclude: ["adminId", "createdAt", "updatedAt"]
            }
        })

        fundData = JSON.parse(JSON.stringify(fundData))

        res.send({
            status: "success",
            data: {
                ...fundData,
                image : fundData.image
            }
        })

    } catch (error) {
        // console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateFund = async (req, res) => {
    try {
        const { id } = req.params

        const updateData = req.body

        await Fund.update(updateData, {
            where: {
                id
            }
        })

        // data2 = JSON.parse(JSON.stringify(data))
        // console.log(data2)

        let update = await Fund.findOne({
            include: {
                model: User,
                as: "userDonate",
                through: {
                    model: Payment,
                    as: "payment",
                    attributes: {
                        exclude: ["userId", "fundId", "createdAt", "updatedAt"]
                    }
                },
                attributes: {
                    exclude: ["password", "status", "createdAt", "updatedAt"]
                }
            },
            where: {
                id: id
            },
            attributes: {
                exclude: ["adminId", "createdAt", "updatedAt"]
            }
        })

        res.send({
            status: "success",
            message: `Update data user id ${id} Successfuly`,
            data: update
        })

        // fundData = JSON.parse(JSON.stringify(fundData))


    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteFund = async (req, res) => {
    try {
        const {id} = req.params

        const data = await Fund.findOne({
            where: {
                id
            }
        })

        fs.unlink( PATH_DELETE + data.thumbnail, function (err) {
        if (err) throw err
            console.log("Delete Image")
        })

        await Fund.destroy({
            where: {
                id
            }
        })


        const updateData = await Fund.findAll()

        res.send({
            status: "success",
            message: `Delete Fund id = ${id} Successfuly`,
            updateData
        })

    } catch (error) {
        // console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}