export const currentDate = new Date()
currentDate.setDate(currentDate.getDate())

export const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

export const dayAfterDate = new Date()
dayAfterDate.setDate(dayAfterDate.getDate() + 2)

export const options = ['Botanical Garden', 'Pari Chowk', 'SNU']

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

export const Data = [
  {
    id: 0,
    from: 'botanical garden',
    to: 'snu',
    time: '07:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 50,
    date: 3
  },
  {
    from: 'botanical garden',
    to: 'snu',
    time: '07:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 30,
    date: 3
  },
  {
    id: 1,
    from: 'pari chowk',
    to: 'snu',
    time: '08:30pm',
    busNum: 'up14cu6997',
    totalSeats: 50,
    remaining: 22,
    date: 3
  },
  {
    id: 2,
    from: 'snu',
    to: 'botanical garden',
    time: '06:30pm',
    busNum: 'up14cu6097',
    totalSeats: 50,
    remaining: 29,
    date: 3
  },
  {
    id: 3,
    from: 'snu',
    to: 'pari chowk',
    time: '08:30pm',
    busNum: 'up14cu6997',
    totalSeats: 50,
    remaining: 22,
    date: 3
  },
  {
    id: 4,
    from: 'snu',
    to: 'botanical garden',
    time: '05:30pm',
    busNum: 'up14cu5997',
    totalSeats: 50,
    remaining: 22,
    date: 3
  },
  {
    id: 5,
    from: 'botanical garden',
    to: 'snu',
    time: '09:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 2,
    date: 4
  },
  {
    id: 6,
    from: 'botanical garden',
    to: 'snu',
    time: '05:30pm',
    busNum: 'up14cu5977',
    totalSeats: 50,
    remaining: 50,
    date: 5
  }
]
