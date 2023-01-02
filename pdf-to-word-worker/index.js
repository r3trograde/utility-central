addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  // Convert the PDF to a DOCX
  const pdfArrayBuffer = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(request.body);
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

  // Return the DOCX `Blob` as the response
  return new Response(docxBlob, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${request.headers.get('pdf-file-name')}"`,
    },
  });
}
