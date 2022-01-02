const Bus = require('../models/BusInfo')

const Data = [
  {
    id: 0,
    from: 'botanical garden',
    to: 'snu',
    time: '07:30pm',
    busNum: 'up14cu5577',
    totalSeats: 50,
    remaining: 30,
    date: 31
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
    date: 31
  },
  {
    id: 6,
    from: 'botanical garden',
    to: 'snu',
    time: '05:30pm',
    busNum: 'up14cu5977',
    totalSeats: 50,
    remaining: 50,
    date: 31
  }
]

try {
  Data.map((data, key) => {
    const bus = new Bus({
      id: key,
      from: data.from,
      to: data.to,
      time: data.time,
      busNo: data.busNum,
      total: data.totalSeats,
      remaining: data.remaining,
      date: data.date
    })
    bus.save()
  })
} catch (error) {
  console.log(`Error: ${error}`)
}
