function createEmployeeRecord(records) {
    return {
        firstName: records[0], 
        familyName: records[1], 
        title: records[2], 
        payPerHour: records[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, time) {
    const [date, hour] = time.split(" ")
    record.timeInEvents.push({
        date,
        hour: parseInt(hour, 10),
        type: "TimeIn"
    })
    return record
}
function createTimeOutEvent(record, time) {
    const [date, hour] = time.split(" ")
    record.timeOutEvents.push({
        date,
        hour: parseInt(hour, 10),
        type: "TimeOut"
    })
    return record
}

function hoursWorkedOnDate(record, date) {
    const timeInHour = record.timeInEvents.find(record => record.date === date).hour
    const timeOutHour = record.timeOutEvents.find(record => record.date === date).hour

    return (timeOutHour - timeInHour)/100
}  

function wagesEarnedOnDate(record, date) {
    const numOfHours = hoursWorkedOnDate(record, date)
    return numOfHours * record.payPerHour
}

function allWagesFor(record) {
    return record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date)).reduce((start, total) => start + total)
}

function calculatePayroll(employees) {
   return employees.map(employee => allWagesFor(employee)).reduce((start, total) => start + total)
}