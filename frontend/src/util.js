export const currentDate = new Date()
currentDate.setDate(currentDate.getDate())

export const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

export const dayAfterDate = new Date()
dayAfterDate.setDate(dayAfterDate.getDate() + 2)

export const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

export const sortData = (data) => {
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
