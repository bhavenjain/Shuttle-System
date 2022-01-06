import React from 'react'

import jsPDF from 'jspdf'

const Document = () => {
  const pdfGenerate = () => {
    var doc = jsPDF('a4')
    doc.text('Hello world!', 10, 10)
    doc.save('ticket.pdf')
  }

  return (
    <div>
      <button onClick={pdfGenerate} value='download'>
        download
      </button>
    </div>
  )
}

export default Document
