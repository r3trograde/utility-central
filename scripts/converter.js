// Listen for submit events on the form
document.querySelector('#converter-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  // Get the file from the form
  const file = event.target.elements.file.files[0]

  // Update the status message
  document.querySelector('#status').textContent = 'Converting...'

  // Send a POST request to the Cloudflare Worker
  const response = await fetch('https://pdf-to-word-converter.alittle44.workers.dev/', {
    method: 'POST',
    body: file
  })

  // Check the response status
  if (response.ok) {
    // Hide the form and show the download link
    document.querySelector('#converter-form').style.display = 'none'
    document.querySelector('#download').style.display = 'inline'

    // Get the DOCX file from the response
    const docx = await response.arrayBuffer()

    // Create a Blob from the DOCX file
    const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob)

    // Set the download link href and text
    document.querySelector('#download').href = url
    document.querySelector('#download').download = 'converted.docx'

    // Update the status message
    document.querySelector('#status').textContent = 'Conversion complete'
  } else {
    // Update the status message
    document.querySelector('#status').textContent = 'Conversion failed'
  }
})
