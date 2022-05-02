import React from 'react'
import '../BusLogs.css'
import {deleteBusApi, updateBusApi} from '../../../http/index'

const BusFill = ({
  bus,
  sendDate,
  AdminDelete = false,
  AdminUpdate = false,
  setAdminBus,
  setPage,
  setUpdateBus
}) => {
  return (
    <div className='busLogs__modal'>
      <div className='busLogs__s1'>
        <label>From:</label>
        <h4>{bus.from.toUpperCase()}</h4>
        <label>To:</label>
        <h4>{bus.to.toUpperCase()}</h4>
        <h3>{sendDate}</h3>
      </div>
      <div className='busLogs__s2'>
        <h3>{bus.time}</h3>
      </div>
      <div className='busLogs__s3'>
        <h3>
          <strong>{bus.remaining}</strong> seats left
        </h3>
        <h3>
          Rs. <strong>{bus.price}</strong> only
        </h3>
        {AdminDelete && (
          <button
            onClick={async () => {
              setUpdateBus(bus)
              let query = `?uid=${bus.uid}`
              await deleteBusApi(query)
            }}
          >
            Delete Bus
          </button>
        )}
        {AdminUpdate && (
          <button
            onClick={async() => {
              setPage(5)
              setAdminBus(bus)
              setUpdateBus(bus)
              await updateBusApi(bus)
            }}
          >
            Update Bus
          </button>
        )}
      </div>
    </div>
  )
}

export default BusFill
