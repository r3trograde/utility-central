const convertButton = document.getElementById('convert-button')
convertButton.addEventListener('click', () => {
    const fileInput = document.getElementById('pdf-file-input')
    const pdfFile = fileInput.files[0]
    const formData = new FormData()
    formData.append('pdf', pdfFile)

    fetch('https://pdf-to-word-converter.alittle44.workers.dev', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.blob().then(blob => URL.createObjectURL(blob))
            } else {
                console.error('Failed to convert PDF to DOCX')
            }
        })
        .then(docxUrl => {
            const downloadLink = document.getElementById('download-link')
            downloadLink.style.display = 'inline'
            downloadLink.href = docxUrl
        })
})
