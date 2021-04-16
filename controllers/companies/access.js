const utils = require('../../services/utils')
const validate = require('../../services/validate_email')
const Company = require('../../models/company')

function validate_category(category) {
    const categories = ["Ocio","Deporte","Administración pública","Salud y belleza","Comercio"]
    return categories.includes(category)
}

let get = async (req, res) => {
    try {
        const companies = await Company.find({}, {name: true, location: true})
        res.send(companies)
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

let register = async (req, res) => {
    try {
        let password = utils.genPassword(req.body.password)
        if (!validate.validateCategory(req.body.category)){
            res.status(422)
            res.send({error: "Wrong category, check docs for further info /api-doc"})
        }
        if (validate.validateEmail(req.body.email)) {
            const company = new Company({
                name: req.body.name,
                nif: req.body.nif,
                email : req.body.email,
                password: password.hash,
                salt: password.salt,
                category: req.body.category,
                location: {
                    type: "Point",
                    coordinates: [req.body.lat,  req.body.long]
                }
            })
            await company.save()
            res.send(company)
        } else {
            res.status(422)
            res.send({ error: "Not an email address" })
        }
    } catch {
        res.status(405)
        res.send({ error: "Wrong json format, check docs for further info /api-doc" })
    }
}

let login = async (req, res) => {
    try {
        const company = await Company.findOne({ email: req.body.email })
        if (utils.validPassword(req.body.password, company.password, company.salt)) {
            const tokenObject = utils.issueJWT(company);
            res.send({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

let update = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.params.nif });

        if (req.body.name) {
            company.name = req.body.name
        }
        if (req.body.password) {
            company.password = req.body.password
        }
        if (req.body.email) {
            company.email = req.body.email
        }
        if (req.body.lat) {
            company.lat = req.body.lat
        }
        if (req.body.long) {
            company.long = req.body.long
        }

        await company.save()
        res.send(company)
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

let delete_company = async (req, res) => {
    try {
        await Company.deleteOne({ nif: req.params.nif })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

exports.get = get
exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_company