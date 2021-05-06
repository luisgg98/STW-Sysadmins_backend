/**
 *
 * @param open_schedule
 * @param close_schedule
 * @param service_duration
 * @returns {[]}
 */
function calculateSlots(open_schedule,close_schedule,service_duration){
    let times=[];
    let open_1 = open_schedule
    let close_1 = close_schedule
    // La compañia solo tiene un horario
    // Sacar horas y minutos, vienen en formato hh:mm
    open_1 = open_1.split(":")
    // Hora de apertura
    let open_1_hora = open_1[0]
    // Pasar a minutos
    open_1_hora = parseInt(open_1_hora,10) * 60
    let open_1_minutes = parseInt(open_1[1],10)
    // Sacar horario de cierre
    close_1 = close_1.split(":")
    let close_1_hora = parseInt(close_1[0], 10)*60
    let close_1_minutes = parseInt(close_1[1],10)
    close_1 = close_1_hora + close_1_minutes
    let tt = open_1_hora + open_1_minutes; // start time
    let ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (let i = 0;tt<close_1; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + service_duration; //adding minutes interval
    }
    return times;
}

/**
 *
 * @param open_schedule_1
 * @param close_schedule_1
 * @param service_duration
 * @returns {[]}
 */
function calculateTime(open_schedule_1,close_schedule_1,service_duration) {
    let times =[];
    let morning_times=calculateSlots(open_schedule_1,close_schedule_1,service_duration)
    times = times.concat(morning_times);
    return times;
}

/**
 *
 * @param company
 * @returns {{}}
 */
function update_time_slots(company) {
    console.log("UPDATING TIME SLOTS")
    let times = {};
    let day_times;
    if(company.schedule.monday.open_1 && company.schedule.monday.close_1){
        day_times = calculateTime(company.schedule.monday.open_1, company.schedule.monday.close_1, company.service_duration);
        times.monday_1 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.tuesday.open_1 && company.schedule.tuesday.close_1){
        day_times = calculateTime(company.schedule.tuesday.open_1, company.schedule.tuesday.close_1, company.service_duration);
        times.tuesday_1 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.wednesday.open_1 && company.schedule.wednesday.close_1){
        day_times = calculateTime(company.schedule.wednesday.open_1, company.schedule.wednesday.close_1,  company.service_duration);
        times.wednesday_1 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.thursday.open_1 && company.schedule.thursday.close_1){
        day_times = calculateTime(company.schedule.thursday.open_1, company.schedule.thursday.close_1, company.service_duration);
        times.thursday_1 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.friday.open_1 && company.schedule.friday.close_1){

        day_times = calculateTime(company.schedule.friday.open_1, company.schedule.friday.close_1, company.service_duration);
        times.friday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.saturday.open_1 && company.schedule.saturday.close_1){
        day_times = calculateTime(company.schedule.saturday.open_1, company.schedule.saturday.close_1, company.service_duration);
        times.saturday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.sunday.open_1 && company.schedule.sunday.close_1){
        day_times = calculateTime(company.schedule.sunday.open_1, company.schedule.sunday.close_1, company.service_duration);
        times.sunday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.monday.open_2 && company.schedule.monday.close_2){
        day_times = calculateTime(company.schedule.monday.open_2, company.schedule.monday.close_2, company.service_duration);
        times.monday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.tuesday.open_2 && company.schedule.tuesday.close_2){
        day_times = calculateTime(company.schedule.tuesday.open_1, company.schedule.tuesday.close_2, company.service_duration);
        times.tuesday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.wednesday.open_2 && company.schedule.wednesday.close_2){
        day_times = calculateTime(company.schedule.wednesday.open_2, company.schedule.wednesday.close_1,  company.service_duration);
        times.wednesday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.thursday.open_2 && company.schedule.thursday.close_2){
        day_times = calculateTime(company.schedule.thursday.open_2, company.schedule.thursday.close_2, company.service_duration);
        times.thursday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.friday.open_2 && company.schedule.friday.close_2){
        day_times = calculateTime(company.schedule.friday.open_1, company.schedule.friday.close_2, company.service_duration);
        times.friday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.saturday.open_2 && company.schedule.saturday.close_2){
        day_times = calculateTime(company.schedule.saturday.open_2, company.schedule.saturday.close_2, company.service_duration);
        times.saturday_2 = day_times
        //times = times.concat(day_times);
    }
    if(company.schedule.sunday.open_2 && company.schedule.sunday.close_2){
        day_times = calculateTime(company.schedule.sunday.open_2, company.schedule.sunday.close_2, company.service_duration);
        times.sunday_2 = day_times
        //times = times.concat(day_times);
    }
    return times;
}

// SERVICES

function update_time_slots_services(company, capacity){
    let time_slots = company.time_slots
    console.log(time_slots)
    let time_slots_services = {}
    if (time_slots.monday_1.length){
        time_slots_services.monday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.monday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.monday_1.places_left = times
        time_slots_services.monday_1.slots = time_slots.monday_1
    }
    if (time_slots.monday_2){
        time_slots_services.monday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.monday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.monday_2.places_left = times
        time_slots_services.monday_2.slots = time_slots.monday_2
    }
    if (time_slots.tuesday_1){
        time_slots_services.tuesday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.tuesday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.tuesday_1.places_left = times
        time_slots_services.tuesday_1.slots = time_slots.tuesday_1
    }
    if (time_slots.tuesday_2){
        time_slots_services.tuesday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.tuesday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.tuesday_2.places_left = times
        time_slots_services.tuesday_2.slots = time_slots.tuesday_2
    }
    if (time_slots.wednesday_1){
        time_slots_services.wednesday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.wednesday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.wednesday_1.places_left = times
        time_slots_services.wednesday_1.slots = time_slots.wednesday_1
    }
    if (time_slots.wednesday_2){
        time_slots_services.wednesday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.wednesday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.wednesday_2.places_left = times
        time_slots_services.wednesday_2.slots = time_slots.wednesday_2
    }
    if (time_slots.thursday_1){
        time_slots_services.thursday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.thursday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.thursday_1.places_left = times
        time_slots_services.thursday_1.slots = time_slots.thursday_1
    }
    if (time_slots.thursday_2){
        time_slots_services.thursday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.thursday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.thursday_2.places_left = times
        time_slots_services.thursday_2.slots = time_slots.thursday_2
    }
    if (time_slots.friday_1){
        time_slots_services.friday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.friday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.friday_1.places_left = times
        time_slots_services.friday_1.slots = time_slots.friday_1
    }
    if (time_slots.friday_2){
        time_slots_services.friday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.friday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.friday_2.places_left = times
        time_slots_services.friday_2.slots = time_slots.friday_2
    }
    if (time_slots.saturday_1){
        time_slots_services.saturday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.saturday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.saturday_1.places_left = times
        time_slots_services.saturday_1.slots = time_slots.saturday_1
    }
    if (time_slots.saturday_2){
        time_slots_services.saturday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.saturday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.saturday_2.places_left = times
        time_slots_services.saturday_2.slots = time_slots.saturday_2
    }
    if (time_slots.sunday_1){
        time_slots_services.sunday_1 = {}
        let times = []
        for (let i = 0; i < company.time_slots.sunday_1.length; i++) {
            times[i] = capacity
        }
        time_slots_services.sunday_1.places_left = times
        time_slots_services.sunday_1.slots = time_slots.sunday_1
    }
    if (time_slots.sunday_2){
        time_slots_services.sunday_2 = {}
        let times = []
        for (let i = 0; i < company.time_slots.sunday_2.length; i++) {
            times[i] = capacity
        }
        time_slots_services.sunday_2.places_left = times
        time_slots_services.sunday_2.slots = time_slots.sunday_2
    }
    return time_slots_services
}

module.exports = { update_time_slots, update_time_slots_services };