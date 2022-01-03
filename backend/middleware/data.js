const Bus = require('../models/BusInfo')

const Data = [
  {
    id: 0,
    from: 'botanical garden',
    to: 'snu',
    time: '07:30pm',
    busNum: 'up14cu5577',
    total: 50,
    remaining: 30,
    date: 3
  },
  {
    id: 1,
    from: 'pari chowk',
    to: 'snu',
    time: '08:30pm',
    busNum: 'up14cu6997',
    total: 50,
    remaining: 22,
    date: 5
  },
  {
    id: 2,
    from: 'snu',
    to: 'botanical garden',
    time: '06:30pm',
    busNum: 'up14cu6097',
    total: 50,
    remaining: 29,
    date: 3
  },
  {
    id: 3,
    from: 'snu',
    to: 'pari chowk',
    time: '08:30pm',
    busNum: 'up14cu6997',
    total: 50,
    remaining: 22,
    date: 4
  },
  {
    id: 4,
    from: 'snu',
    to: 'botanical garden',
    time: '05:30pm',
    busNum: 'up14cu5997',
    total: 50,
    remaining: 22,
    date: 31
  },
  {
    id: 5,
    from: 'botanical garden',
    to: 'snu',
    time: '09:30pm',
    busNum: 'up14cu5577',
    total: 50,
    remaining: 2,
    date: 4
  },
  {
    id: 6,
    from: 'botanical garden',
    to: 'snu',
    time: '05:30pm',
    busNum: 'up14cu5977',
    total: 50,
    remaining: 50,
    date: 3
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
      total: data.total,
      remaining: data.remaining,
      date: data.date
    })
    bus.save()
  })
} catch (error) {
  console.log(`Error: ${error}`)
}
