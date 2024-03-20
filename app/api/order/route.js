import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import  process  from 'process';
import os from 'os';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(request) {
  try {
    const session = await getSession();
    const cartDetails = await request.json(); // Assuming cartDetails is sent in the request body
    let nyWorkbook = new ExcelJS.Workbook();
    let njWorkbook = new ExcelJS.Workbook();
    
    const NYfilePath = path.join(process.cwd(), '/order_forms', 'order_ny_template_xlsx.xlsx');
    const NJfilePath = path.join(process.cwd(), '/order_forms', 'order_nj_template_xlsx.xlsx');

    await nyWorkbook.xlsx.readFile(NYfilePath);
    await njWorkbook.xlsx.readFile(NJfilePath);

    let nyWorksheet = nyWorkbook.getWorksheet(1);
    let njWorksheet = njWorkbook.getWorksheet(1);

    let ny = false;

    // var myCells = []
    Object.values(cartDetails ?? {}).forEach((array) => {
      Object.values(array ?? {}).forEach((entry) => {
        if (entry.product_data.location === 1) {
          // myCells.push(entry.product_data.cell)
          // console.log(entry.product_data.cell)
          let cell = nyWorksheet.getCell(entry.product_data.cell);
          // cell.value = entry.quantity;
          cell.value = {
            richText: [
              {
                text: entry.quantity,
                font: {
                  color: {
                    argb: 'FFFF0000',
                  },
                },
              },
            ],
          };
          ny = true;
        } else if (entry.product_data.location === 0) {
          let cell = njWorksheet.getCell(entry.product_data.cell);
          // cell.value = entry.quantity;
          cell.value = {
            richText: [
              {
                text: entry.quantity,
                font: {
                  color: {
                    argb: 'FFFF0000',
                  },
                },
              },
            ],
          };
        }
      });
    });

  //   nyWorksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
  //     row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
  //         if (cell.style && cell.style.font && cell.style.font.color && cell.style.font.color.argb) {
           
  //             if (myCells.indexOf(cell.address) >= 0) {
  //               console.log(`Font Color: ${cell.style.font.color.argb} ${cell.address}`);
  //               console.log("red ", cell.address)
                
  //             }
  //             else {
                
  //               nyWorksheet.getCell(cell.address).style.font ={ color: { argb: 'FF000000' } };
  //               console.log("changed", cell.address)
  //             }
  //             console.log(`Font Color: ${cell.style.font.color.argb} ${cell.address}`);
   
  //         } 
  //     });
  // });

    let outputPath;
    const currentDate = new Date(); 

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 

    const formattedDate = `${month}-${day}-${year}`;
    if (ny) {
      nyWorksheet.getCell('AG5').value = `Date: ${month}-${day}-${year}`
      nyWorksheet.getCell('D3').value = `Name: ${session.user.name}`
      outputPath = path.join(os.tmpdir(), 'current_order_ny.xlsx');
      await nyWorkbook.xlsx.writeFile(outputPath);
    } else {
      njWorksheet.getCell('V3').value = `Date: ${month}-${day}-${year}`
      njWorksheet.getCell('D3').value = `Name: ${session.user.name}`
      outputPath = path.join(os.tmpdir(), 'current_order_nj.xlsx');
      await njWorkbook.xlsx.writeFile(outputPath);
    }

    const fileContents = fs.readFileSync(outputPath, { encoding: 'base64' });

    const brevo = require('@getbrevo/brevo');
    let apiInstance = new brevo.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    
    let sendSmtpEmail = new brevo.SendSmtpEmail(); 
    sendSmtpEmail.subject = "New Order "+ session.user.name + " " + formattedDate;
    sendSmtpEmail.htmlContent = `<html><body><h1>Attached is a new order by ${session.user.name}</h1></body></html>`;
    sendSmtpEmail.sender = { name: 'Order', email: 'akelnik.9@gmail.com' };
    sendSmtpEmail.to = [{ email: 'akelnik.9@gmail.com', name: 'Five Star Souvenirs' }];

    const attachedFileName = `newOrder_${session.user.name}_${month}_${day}_${year}.xlsx`;

    sendSmtpEmail.attachment = [{ name: attachedFileName, content: fileContents }];
    
    const headers = { 'Content-Type': 'application/json' };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully.');

    return new Response(JSON.stringify(data), { headers });
  } catch (error) {
    console.error('Error reading or modifying XLSX file:', error);
    return new Response('Failed to process XLSX file', { status: 500 });
  }
}
