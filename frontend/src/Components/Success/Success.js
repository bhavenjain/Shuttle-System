import React from 'react'
import Document from './Document/Document'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Success.css'

const Success = () => {
  const name = useSelector(state => state.NameState)
  const bus = useSelector(state => state.BusBooked)
  const order = useSelector(state => state.OrderDetails)
  console.log(name)
  console.log(bus)
  console.log(order)

  return (
    <div className='success'>
      <h1 className='success__heading'>Ticket Confirmation</h1>

      <div className='success__note'>
        <h3 className='success__from'>
          <strong>Note : </strong>
        </h3>
        <ul className='success__notice'>
          <li>This Document has to be shown at the time of boarding.</li>
          <li>Please download the pdf or take a screenshot of this page.</li>
        </ul>
      </div>

      {/* Section One */}
      <div className='success__sectionOne'>
        <h1 className='success__name'>{name}</h1>
      </div>
      <hr />

      {/* End */}

      {/* Section Two */}
      <div className='success__sectionTwo'>
        <h1 className='success__busHead'>Bus Details</h1>
        <div className='success__location'>
          <div className='success__locationToFrom'>
            <label>From:</label>
            <h3 className='success__from'>
              <strong>{bus.from}</strong>
            </h3>
          </div>
          <div className='success__locationToFrom success__text'>
            <label>To:</label>
            <h3 className='success__from'>
              <strong>{bus.to}</strong>
            </h3>
          </div>
        </div>

        <h3 className='success__from success__top'>
          Date: <strong>{bus.date}</strong>{' '}
        </h3>
        <h3 className='success__from success__top'>
          Time: <strong>{bus.time}</strong>{' '}
        </h3>
      </div>
      {/* End */}

      {/* Section Three */}
      <Document bus={bus} name={name} order={order} />
      {/* End */}
      <Link to='/'>
        <label className='success__link'>Book another ticket {'>'}</label>
      </Link>
      <div className='success__footer'></div>
    </div>
  )
}

export default Success
