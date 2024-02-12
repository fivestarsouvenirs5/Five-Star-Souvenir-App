export async function POST(request) {
    try { 
         const cartDetails = await request.json(); // Assuming cartDetails is sent in the request body
         var ny = false;
         var nj = false;
   
         const NYfilePath = "./order_forms/order_ny_template_xlsx.xlsx"; 
         const NYworkbook = new ExcelJS.Workbook();
         await NYworkbook.xlsx.readFile(NYfilePath);
         const NYworksheet = NYworkbook.getWorksheet(1);
   
         const NJfilePath = "./order_forms/order_nj_template_xlsx.xlsx"; 
         const NJworkbook = new ExcelJS.Workbook();
         await NJworkbook.xlsx.readFile(NJfilePath);
   
         const NJworksheet = NJworkbook.getWorksheet(1);
   
         Object.values(cartDetails ?? {}).map((array) => (
           Object.values(array ?? {}).map((entry) =>{
             if (entry.product_data.location == 1) {
               NYworksheet.getCell(entry.product_data.cell).value = entry.quantity;
               ny = true;
             }
             else {
               NJworksheet.getCell(entry.product_data.cell).value = entry.quantity;
               nj = true;
             }
             
           })
         ))
   
         
   
         // const worksheetCell = worksheet.getCell(1, 1);
         // worksheetCell.value = 'test';
   
         //make filename be better, like include store name and date
         var outputPath;
         if (ny == true) {
           outputPath = "./order_forms/current_order_ny.xlsx";
           await NYworkbook.xlsx.writeFile(outputPath);
         }
         else{
           outputPath = "./order_forms/current_order_nj.xlsx"; 
           await NJworkbook.xlsx.writeFile(outputPath);
   
           
         }
         const fileContents = fs.readFileSync(outputPath);
         
   
         const headers = {
                 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                 'Content-Disposition': 'attachment; filename="current_order.xlsx"'
               };
         
         return new Response(fileContents, {headers})
       } catch (error) {
         console.error('Error reading or modifying XLSX file:', error);
         return new Response('Failed to process XLSX file', { status: 500 });
       }
   }