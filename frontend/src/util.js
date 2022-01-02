export const currentDate = new Date()
currentDate.setDate(currentDate.getDate())

export const tomorrowDate = new Date()
tomorrowDate.setDate(tomorrowDate.getDate() + 1)

export const dayAfterDate = new Date()
dayAfterDate.setDate(dayAfterDate.getDate() + 2)

export const Data = [
  {
    id: 0,
    from: 'botanical garden',
    to: 'snu',
    time: '07:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 30,
    date: 2
  },
  {
    id: 1,
    from: 'pari chowk',
    to: 'snu',
    time: '08:30pm',
    busNum: 'up14cu6997',
    totalSeats: 50,
    remaining: 22,
    date: 1
  },
  {
    id: 2,
    from: 'snu',
    to: 'botanical garden',
    time: '06:30pm',
    busNum: 'up14cu6097',
    totalSeats: 50,
    remaining: 29,
    date: 2
  },
  {
    id: 3,
    from: 'snu',
    to: 'pari chowk',
    time: '08:30pm',
    busNum: 'up14cu6997',
    totalSeats: 50,
    remaining: 22,
    date: 31
  },
  {
    id: 4,
    from: 'snu',
    to: 'botanical garden',
    time: '05:30pm',
    busNum: 'up14cu5997',
    totalSeats: 50,
    remaining: 22,
    date: 31
  },
  {
    id: 5,
    from: 'botanical garden',
    to: 'snu',
    time: '09:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 2,
    date: 2
  },
  {
    id: 6,
    from: 'botanical garden',
    to: 'snu',
    time: '05:30pm',
    busNum: 'up14cu5977',
    totalSeats: 50,
    remaining: 50,
    date: 2
  }
]