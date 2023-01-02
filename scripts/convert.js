function pdfToDocxConverter() {
  const form = document.getElementById('converter-form');
  const pdfFileInput = document.getElementById('pdf-file');
  const downloadLink = document.getElementById('download-link');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Check if a PDF file has been selected
    if (!pdfFileInput.files[0]) {
      alert('Please select a PDF file to convert.');
      return;
    }

    // Convert the PDF to a DOCX
    const pdfFile = pdfFileInput.files[0];
    const docxFile = await convertPdfToDocx(pdfFile);

    // Update the download link with the converted DOCX file
    downloadLink.href = URL.createObjectURL(docxFile);
    downloadLink.download = pdfFile.name.replace('.pdf', '.docx');
    downloadLink.style.display = 'inline-block';
  });

  async function convertPdfToDocx(pdfFile) {
    // Check if the browser supports the `PDF` and `FileReader` APIs
    if (!window.PDF || !window.FileReader) {
      alert('This browser does not support the PDF or FileReader APIs.');
      return;
    }

    // Read the PDF file as an ArrayBuffer
    const pdfArrayBuffer = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(pdfFile);
    });

    // Convert the PDF ArrayBuffer to a PDF.js `PDFDocument`
    const pdf = await PDF.load(pdfArrayBuffer);

    // Convert the PDF.js `PDFDocument` to a Microsoft Word `Document`
    const doc = new window.DOCX.Document();
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = pdf.getPage(i);
      const textContent = await page.getTextContent();
      const paragraphs = textContent.items.map((item) => item.str);
      doc.addParagraph(paragraphs.join('\n'));
    }

    // Convert the Microsoft Word `Document` to a DOCX `Blob`
    const docxBlob = await doc.save();

    // Return the DOCX `Blob`
    return docxBlob;
  }
}

// Initialize the converter when the page is loaded
window.addEventListener('load', pdfToDocxConverter);
