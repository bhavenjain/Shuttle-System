// Dates
export const currentDate = new Date()
currentDate.setDate(currentDate.getDate())

export const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

export const dayAfterDate = new Date()
dayAfterDate.setDate(dayAfterDate.getDate() + 2)

// Covert Location object to list
export const objectToListLocations = (data, setOptions) => {
  let temp = []
  data.forEach(item => {
    temp.push(item.locations)
  })
  temp.sort()
  setOptions(temp)
}

// Sort by time
export const sortData = data => {
  let sortedData = [...data]
  sortedData.sort((a, b) => {
    if (a.time > b.time) {
      return -1
    } else {
      return 1
    }
  })
  return sortedData
}

// Parsing for buses
export const parseBuses = (location, dates, data, setSendDate, setBuses) => {
  if (location.from && location.to && dates.day) {
    let tempForBus = []
    data.forEach(bus => {
      if (
        bus &&
        bus.to.toLowerCase() === location.to.toLowerCase() &&
        bus.from.toLowerCase() === location.from.toLowerCase() &&
        JSON.stringify(bus.date.slice(0, 2)) === JSON.stringify(dates.date) &&
        bus.remaining > 0 &&
        bus.remaining <= bus.total
      ) {
        const temp = dates.day + ', ' + bus.date.slice(0, 2) + ' ' + dates.month
        tempForBus.push(bus)
        setSendDate(temp)
      }
    })
    if (tempForBus.length > 0) {
      setBuses(tempForBus)
    } else {
      setBuses(null)
    }
    tempForBus = []
  }
}
