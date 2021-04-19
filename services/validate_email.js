/**
 *
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateCategory(category) {
    const categories = ["Ocio","Deporte","Administración pública","Salud y belleza","Comercio"]
    return categories.includes(category)
}

exports.validateEmail = validateEmail
exports.validateCategory = validateCategory