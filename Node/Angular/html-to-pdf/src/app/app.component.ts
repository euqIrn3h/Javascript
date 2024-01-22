import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'html-to-pdf';
  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;
  public ConvertToPDf(){
    // let data = document.getElementById('html') as HTMLElement;
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options
    //   var imgWidth = 208;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;

    //   const contentDataURL = canvas.toDataURL('image/png');
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('new-file.pdf');
    // });

    const dashboard = document.getElementById('html') as HTMLElement;

    const dashboardHeight = dashboard.clientHeight;
    const dashboardWidth = dashboard.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard, options).then((imgData) => {
         const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
         const imgProps = doc.getImageProperties(imgData);
         const pdfWidth = doc.internal.pageSize.getWidth();
         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
         doc.save('Dashboard for hyperpanels.pdf');
    });
  }
}
