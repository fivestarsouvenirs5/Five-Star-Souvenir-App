import ExcelJS from 'exceljs';
import fs from 'fs';
import {join} from 'path';
import { cwd } from 'process';

export async function POST(request) {
 try { 
      const filePath = join(cwd(), "order_forms", "order_ny_template_xlsx.xlsx"); 
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);

      const worksheetCell = worksheet.getCell(1, 1);
      worksheetCell.value = 'test';

      //make filename be better, like include store name and date
      const outputPath = join(cwd(), "order_forms", "current_order.xlsx"); 
      await workbook.xlsx.writeFile(outputPath);

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