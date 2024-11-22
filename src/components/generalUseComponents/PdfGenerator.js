import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function generatePDF(id, name, orientacion) {
  const input = document.getElementById(id); // elige el elemento a capturar

  html2canvas(input,{ scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = canvas.width; // Ancho del canvas en píxeles
    const pdfHeight = canvas.height; // Alto del canvas en píxeles 

    const pdf = new jsPDF({
      orientation: orientacion,
      unit: 'px',
      format: [pdfWidth, pdfHeight],
    });    

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(name); // Descarga el PDF con el nombre "document.pdf"
  });
}
export default generatePDF;