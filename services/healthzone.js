
const Healthzone = require('../models/healthzone');
/**
 * Update the data related to a health zone
 * @param ZonaSalud
 * @param newcases
 * @param radius
 * @returns {Promise<void>}
 */
async function updateCovidHealthzone(ZonaSalud, newcases,radius,date) {
    try{
        Healthzone.updateOne(
            {name:ZonaSalud },
            { $set:{newcases: newcases,radius:radius, date:date}},
            {},
            function (err) {
                if(err){
                    throw err;
                }
            });
    }
    catch (e) {
        console.log(ZonaSalud)
        console.log("Error updating Health Zone: " + e);
    }
}

/**
 * Save a new health zone
 * @param title
 * @param coordinates
 * @returns {Promise<void>}
 */
async function saveHealthzone(title ,coordinates){
    try{
        Healthzone.findOne({name:title},{},{},async function(error,hz) {
            if(error){
                throw error;
            }
            if(hz == null){
                // Change order of coordinates
                let coord = coordinates[1]
                coordinates[1] = coordinates[0]
                coordinates[0] = coord
                let healthzone = new Healthzone({
                    name: title,
                    newcases : 0,
                    radius : 0,
                    location: {
                        type: "Point",
                        coordinates: coordinates
                    }
                });
                await healthzone.save();
            }
        });

    }
    catch (e) {
        console.log("Error while starting the Health zone database");
        console.log("Problems with:");
        console.log(e);
    }
}

/**
 * Map the name of the district to the name of a health zone
 * @param name
 */

async function mapDistrictWithHealthzone(name){
    return new Promise((resolve, reject) => {
        if (name.includes('San Jose')){
            resolve('San José');
        }
        else if(name.includes('Santa Isabel')){
            resolve('Santa Isabel');
        }
        else if(name.includes('Oliver') || name.includes('Valdefierro')){
            resolve('Oliver-Valdefierro');
        }
        else if(name.includes('Miralbueno')){
            resolve('Miralbueno');
        }
        else if(name.includes('Actur')){
            resolve('Actur-Rey Fernando');
        }
        else if(name.includes('Delicias')){
            resolve('Delicias');
        }
        else if(name.includes('Las Fuentes') || name.includes('Torre Ramona')){
            resolve('Las Fuentes');
        }
        else if(name.includes('Juslibol') ||name.includes('El Zorongo') ){
            resolve('Juslibol-El Zorongo');
        }
        else if(name.includes('Torrero')){
            resolve('Torrero');
        }
        else if(name.includes('Casetas')){
            resolve('Casetas');
        }
        else if(name.includes('Casablanca')){
            resolve('Casablanca');
        }
        else if(name.includes('Universitas')){
            resolve('Universidad');
        }
        else if(name.includes('Sagasta') || name.includes('Hernan Cortes')){
            resolve('Centro');
        }
        else if(name.includes('Almozara')){
            resolve('La Almozara')
        }
        else if(name.includes('Arrabal')){
            resolve('El Rabal');
        }
        else if(name.includes('Independencia')){
            resolve('Casco Histórico');
        }
        else{
            reject("Not found:" + name);
        }

    });

}

module.exports.mapDistrictWithHealthzone = mapDistrictWithHealthzone;
module.exports.updateCovidHealthzone = updateCovidHealthzone;
module.exports.saveHealthzone =saveHealthzone;



