// csv stuff

// import fs from 'fs';
// import Papa from 'papaparse';
// import {NextResponse} from "next/server"

// export async function POST(request) {
//     try {
//       console.log(request.body)
//       const csvFile = fs.readFileSync('./order_forms/order_ny_template.csv', 'utf8');
//       const parsedData = Papa.parse(csvFile, { header: false});
//       //  console.log(csvFile)
//       //  console.log(parsedData.data);
//       //  console.log(Papa.unparse(parsedData.data))
//       return new NextResponse(Papa.unparse(parsedData.data, {
//               status: 200,
//               headers: {
//                 'Content-Type': 'text/csv',
//                 'Content-Disposition' : 'attachment; filename="order_ny.csv"',
//                 },
//       }));
//     } catch (error) {
//       console.error('Error reading file:', error);
//       return NextResponse.error(new Error('Failed to read CSV file'));
//     }
// }


//xslx stuff
import * as XLSX from 'xlsx';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';

export async function POST(request) {
  try {
    // Read the XLSX file
    const filePath = join(cwd(), "order_forms", "order_ny_template_xlsx.xlsx"); // Specify the path to your original XLSX file
    const buffer = await readFile(filePath);

    //consider using exceljs for all this
    // Process the XLSX data
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Modify certain cells
    worksheet.A1.v = 'New Value'; // Example: Change cell A1 to 'New Value'

    // // Preserve formatting by copying styling properties from original worksheet
    // const modifiedWorksheet = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    // const range = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    //   for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
    //     const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
    //     if (!worksheet[cellAddress]) continue;
    //     modifiedWorksheet[rowNum][colNum] = worksheet[cellAddress];
    //   }
    // }

    // Convert modified worksheet back to XLSX format
    const modifiedWorkbook = XLSX.utils.book_new();
    const modifiedWorksheetName = 'Sheet1'; // Name of the modified worksheet
    XLSX.utils.book_append_sheet(modifiedWorkbook, XLSX.utils.aoa_to_sheet(modifiedWorksheet), modifiedWorksheetName);

    // Serialize the modified workbook back to binary data
    const modifiedBuffer = XLSX.write(modifiedWorkbook, { type: 'buffer' });

    // Set appropriate headers for the response
    const headers = {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="modified.xlsx"'
    };

    // Return the modified XLSX file as the response
    return new Response(modifiedBuffer, { headers });
  } catch (error) {
    console.error('Error reading or modifying XLSX file:', error);
    return new Response('Failed to process XLSX file', { status: 500 });
  }
}
