import React from 'react'
import jsPDF from 'jspdf'
import './Document.css'

const Document = ({ bus, name, order }) => {
  var imgData = 'https://snulinks.snu.edu.in/img/snu-logo.png'

  const pdfGenerate = () => {
    var doc = jsPDF('a4')

    // Heading
    doc.setFontSize(25)
    doc.setFont('courier')
    doc.text(55, 25, 'Ticket Confirmation')

    // Heading Underline
    doc.setLineWidth(0.5)
    doc.line(53, 28, 158, 28)

    // Section One

    // Name
    doc.setFontSize(15)
    doc.setFont('courier')
    doc.text(25, 55, name)

    // Order Id
    doc.setTextColor(150)
    doc.setFontSize(8)
    doc.setFont('courier')
    doc.text(140, 55, `Order Id: ${order.orderId}`)

    // Section one divide Underline
    doc.setLineWidth(0.2)
    doc.line(10, 60, 200, 60)

    // Section Two

    // Bus Details Heading
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(20)
    doc.setFont('courier')
    doc.text(25, 75, 'Bus Details')

    // Bus Id
    doc.setTextColor(150)
    doc.setFontSize(8)
    doc.setFont('courier')
    doc.text(140, 75, `Bus Id: ${bus._id}`)

    // Bus From
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('courier')
    doc.text(25, 90, `From: `)

    // Bus From location
    doc.setFontSize(15)
    doc.setFont('courier')
    doc.text(25, 98, bus.from)

    // Bus to
    doc.setFontSize(10)
    doc.setFont('courier')
    doc.text(140, 90, `To:`)

    // Bus to location
    doc.setFontSize(15)
    doc.setFont('courier')
    doc.text(140, 98, bus.to)

    // Bus Date
    doc.setFontSize(15)
    doc.setFont('courier')
    doc.text(25, 115, `Date: ${bus.date}`)

    // Bus Time
    doc.setFontSize(15)
    doc.setFont('courier')
    doc.text(25, 130, `Time: ${bus.time}`)

    // Section Three

    // Note Square
    doc.rect(15, 138, 180, 100)

    // Note
    doc.setFontSize(20)
    doc.setFont('courier')
    doc.text(25, 150, `Note : `)

    // Note 1
    doc.setFontSize(10)
    doc.text(25, 160, `• Students have to show this pdf when boarding the bus.`)

    // Note 2
    doc.setFontSize(10)
    doc.text(25, 167, `• Students are responsible for their own belongings.`)

    // Note 3
    doc.setFontSize(10)
    doc.text(
      25,
      174,
      `• Please reach atleast 10 minutes before the bus arrival time.`
    )

    // Note 4
    doc.setFontSize(10)
    doc.text(25, 181, `• It is mandatory to carry SNU Id card.`)

    // Note 5
    doc.setFontSize(10)
    doc.text(
      25,
      188,
      `• Failure to do so, they will not be allowed to take the bus.`
    )

    // Footer reactangle
    doc.setDrawColor(0)
    doc.setFillColor(26, 37, 193)
    doc.rect(0, 260, 220, 45, 'F')

    // SHUTTLE
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(25)
    doc.text(75, 282, `SNU SHUTTLE`)

    doc.save('ticket.pdf')
  }

  return (
    <div className='document'>
      <button onClick={pdfGenerate} value='download'>
        Download
      </button>
    </div>
  )
}

export default Document
