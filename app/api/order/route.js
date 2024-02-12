import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import  process  from 'process';
import os from 'os';

export async function POST(request) {
 try { 
      const cartDetails = await request.json(); // Assuming cartDetails is sent in the request body
      var ny = false;
      var nj = false;
      console.log(process.cwd())
      
      const NYfilePath = path.join(process.cwd(), '/order_forms', 'order_ny_template_xlsx.xlsx'); 
      const NYworkbook = new ExcelJS.Workbook();
      await NYworkbook.xlsx.readFile(NYfilePath);
      const NYworksheet = NYworkbook.getWorksheet(1);

      const NJfilePath = path.join(process.cwd(), '/order_forms', 'order_nj_template_xlsx.xlsx'); 
      const NJworkbook = new ExcelJS.Workbook();
      await NJworkbook.xlsx.readFile(NJfilePath);

      const NJworksheet = NJworkbook.getWorksheet(1);

      Object.values(cartDetails ?? {}).map((array) => (
        Object.values(array ?? {}).map((entry) =>{
          if (entry.product_data.location == 1) {
            var cell = NYworksheet.getCell(entry.product_data.cell)
            cell.value = entry.quantity;
            cell.font = { color: {argb: 'FF000000'}}
            ny = true;
          }
          else {
            var cell = NJworksheet.getCell(entry.product_data.cell)
            cell.value = entry.quantity;
            cell.font = {color: {argb: 'FF000000'}}
            nj = true;
          }
        })
      ))

      

      // const worksheetCell = worksheet.getCell(1, 1);
      // worksheetCell.value = 'test';

      //make filename be better, like include store name and date
      var outputPath;
      if (ny == true) {
        outputPath = path.join(os.tmpdir(), 'current_order_ny.xlsx');
        await NYworkbook.xlsx.writeFile(outputPath);
      }
      else{
        outputPath = path.join(os.tmpdir(), 'current_order_nj.xlsx');
        await NJworkbook.xlsx.writeFile(outputPath);
        
      }
      const fileContents = fs.readFileSync(outputPath, {encoding: 'base64'});

      const brevo = require('@getbrevo/brevo');
       // Set your API key
       let apiInstance = new brevo.TransactionalEmailsApi();

       let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        

        let sendSmtpEmail = new brevo.SendSmtpEmail(); 

        sendSmtpEmail.subject = "New Order (date)";
        sendSmtpEmail.htmlContent = "<html><body><h1>Attached is a new order by ...</h1></body></html>";
        sendSmtpEmail.sender = { name: 'Order', email: 'akelnik.9@gmail.com' };
        sendSmtpEmail.to = [{ email: 'akelnik.9@gmail.com', name: 'Five Star Souvenirs' }];

        // Attach the file
          // const fileData = Buffer.from(attachment, 'base64');
          sendSmtpEmail.attachment = [{ name: 'new_order.xlsx', content: fileContents }];
        
          const headers = {
            // 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            // 'Content-Disposition': 'attachment; filename="current_order.xlsx"'
            'Content-Type': 'application/json',
          };

        // Call the sendTransacEmail method to send the email
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)

        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        return new Response(JSON.stringify(data), {headers})

     
      
      
    } catch (error) {
      console.error('Error reading or modifying XLSX file:', error);
      return new Response('Failed to process XLSX file', { status: 500 });
    }
}