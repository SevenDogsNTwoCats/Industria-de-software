import {
  createOrder,
  rejectPurchaseOrder,
  requestQuotation,
} from "../api/purchases.js";
import { saveInvoice, saveOrder } from "../api/sales.js";
import html2pdf from "html2pdf.js";

const sendInvoice = async ({
  purchaseList,
  subtotal,
  total,
  userName,
  userId,
  employeeId,
  email,
  discount,
  invoiceNumber,
  payMethod,
  typeIO,
}) => {
  const buildInvoiceHTML = () => {
    if (!userName) {
      userName = "--------------------";
    }
    if (!email) {
      email = "--------------------";
    }

    const watermarkHTML =
      typeIO === "ORDER"
        ? `
    <h3><strong>Orden de Venta</strong></h3>
    <div class="watermark">
      <span>ORDEN DE VENTA</span>
      <span>ORDEN DE VENTA</span>
      <span>ORDEN DE VENTA</span>
      <span>ORDEN DE VENTA</span>
      <span>ORDEN DE VENTA</span>
    </div>
      `
        : "";
    const isInvoice =
      typeIO === "INVOICE"
        ? `<strong> Factura #${invoiceNumber}</strong><br />`
        : "";

    let count = 0;

    const itemsHTML = purchaseList
      .map((item) => {
        const itemISV = (
          item.Price_Buy * item.quantity -
          (item.Price_Buy * item.quantity) / 1.15
        ).toFixed(2);

        count += parseFloat(itemISV);

        return `
                    <tr class="item">
                        <td>${item.Name}</td>
                        <td>${item.quantity}</td>
                        <td>${((item.Price_Buy * item.quantity) / 1.15).toFixed(
                          2
                        )}</td>
                        <td>${itemISV}</td>
                        <td style="text-align: right;"><b>${(
                          item.Price_Buy * item.quantity
                        ).toFixed(2)} HNL</b></td>
                    </tr>
                `;
      })
      .join("");

    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Factura</title>
          <style>
            .bodytest {
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              text-align: center;
              color: #777;
            }
    
            .h1text {
              font-weight: 300;
              margin-bottom: 0px;
              padding-bottom: 0px;
              color: #777;
            }
    
            h3 {
              font-weight: 300;
              margin-top: 10px;
              margin-bottom: 20px;
              font-style: italic;
              color: #555;
            }
    
            a {
              color: #06f;
            }
    
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
            }


            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              color: rgba(0, 0, 0, 0.1);
              font-size: 100px;
              font-weight: bold;
              z-index: 100;
              white-space: nowrap; 
          }
          
          .watermark span {
            display: block;
            margin-bottom: 100px; 
        }
          
          
            table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-collapse: collapse;
            }
    
            .tdtest {
              padding: 5px;
              vertical-align: top;
            }
    
            .right-align {
              text-align: right;
            }
    
            tr.top td {
              padding-bottom: 20px;
            }
    
            .title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
            }
    
            .information td {
              padding-bottom: 40px;
            }
    
            .heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
    
            .details td {
              padding-bottom: 20px;
            }
    
            .item td {
              border-bottom: 1px solid #eee;
            }
    
            .item.last td {
              border-bottom: none;
            }
    
            .total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
              }

              .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
              }
            }
          </style>
        </head>
        <div class="bodytest">
          <div class="invoice-box">
          ${watermarkHTML}
            <!-- Encabezado -->
            <tr class="top">
              <td colspan="2" class="tdtest" style="text-align: center;">
                <table>
                  <tr>
                    <td class="title tdtest">
                    </td>
                    <td class="tdtest right-align">
                      ${isInvoice}
                      <strong> Fecha: ${new Date().toLocaleDateString()}</strong><br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <img src="../../public/logo-horizontal.png" alt="Company logo"
                style="max-width: 500px; height: auto; filter: grayscale(100%);" />


            <!-- Información del cliente -->
            <table>
              <tr class="information">
                <td class="tdtest" colspan="5">
                  <table>
                    <tr>
                      <td class="tdtest">
                        Av. Siempre Viva 742<br />
                        Springfield
                      </td>
                      <td class="tdtest right-align">
                        Cliente: ${userName}<br />
                        Email: ${email}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Detalles de la factura -->
              <tr class="heading">
                <td class="tdtest">Item</td>
                <td class="tdtest">Cantidad</td>
                <td class="tdtest">Precio</td>
                <td class="tdtest">ISV</td>
                <td class="tdtest" style="text-align: right;">Precio Total</td>
              </tr>
              <!-- Ítems de la factura -->
              ${itemsHTML}

              <!-- Total -->
              <tr class="heading">
              <td class="tdtest" colspan="5">Detalles</td>
              </tr>

              <tr class="item">
                <td class="tdtest" colspan="4"><b>ISV 15%:</b></td>
                <td>${count.toFixed(2)} HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Descuento:</b></td>
                <td>${discount} HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>SubTotal:</b></td>
                <td>${subtotal} HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Total:</b></td>
                <td><b>${total} HNL</b></td>
                </tr>
            </table>
          </div>
        </div>
      </html>
    `;
    return invoiceHTML;
  };

  const downloadInvoiceAndSendToBackend = async () => {
    const invoiceHTML = buildInvoiceHTML();

    const options = {
      filename: "factura.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf()
      .from(invoiceHTML)
      .set(options)
      .output("blob");

    if (payMethod === "CAJA" && typeIO === "INVOICE") {
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const pdfWindow = window.open(pdfUrl);
      pdfWindow.onload = () => {
        pdfWindow.print();
      };
    }

    const formData = new FormData();
    formData.append("invoice", pdfBlob, "factura.pdf");
    formData.append("purchaseList", JSON.stringify(purchaseList));
    formData.append("userId", userId);
    formData.append("employeeId", employeeId);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("subTotal", subtotal);
    formData.append("discount", discount);
    formData.append("payMethod", payMethod);
    formData.append("ISV", 0.15);
    formData.append("total", total);

    try {
      if (typeIO === "INVOICE") {
        await saveInvoice(formData);
      } else {
        await saveOrder(formData);
      }
    } catch (error) {
      console.error("Error al enviar la factura al backend:", error);
    }
  };

  await downloadInvoiceAndSendToBackend();
};

export const sendOrder = async ({ purchaseList, typeIO }) => {
  let subtotal = 0;
  let total = 0;
  purchaseList.forEach((item) => {
    subtotal += (item.Product.Price_Buy * item.Quantity) / 1.15;
    total += item.Product.Price_Buy * item.Quantity;
  });

  const buildInvoiceHTML = () => {
    const watermarkHTML = `
    <h3><strong>${typeIO}</strong></h3>
    <div class="watermark">
      <span>ORDEN DE COMPRA</span>
      <span>ORDEN DE COMPRA</span>
      <span>ORDEN DE COMPRA</span>
      <span>ORDEN DE COMPRA</span>
      <span>ORDEN DE COMPRA</span>
    </div>
      `;
    let count = 0;

    const itemsHTML = purchaseList
      .map((item) => {
        const itemISV = (
          item.Product.Price_Buy * item.Quantity -
          (item.Product.Price_Buy * item.Quantity) / 1.15
        ).toFixed(2);

        count += parseFloat(itemISV);

        return `
                    <tr class="item">
                        <td>${item.Product.Name}</td>
                        <td>${item.Quantity}</td>
                        <td>${(
                          (item.Product.Price_Buy * item.Quantity) /
                          1.15
                        ).toFixed(2)}</td>
                        
                        <td>${(
                          item.Product.Price_Buy * item.Quantity -
                          (item.Product.Price_Buy * item.Quantity) / 1.15
                        ).toFixed(2)}</td>
                        <td style="text-align: right;"><b>${(
                          item.Product.Price_Buy * item.Quantity
                        ).toFixed(2)} HNL</b></td>
                    </tr>
                `;
      })
      .join("");

    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Factura</title>
          <style>
            .bodytest {
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              text-align: center;
              color: #777;
            }
    
            .h1text {
              font-weight: 300;
              margin-bottom: 0px;
              padding-bottom: 0px;
              color: #777;
            }
    
            h3 {
              font-weight: 300;
              margin-top: 10px;
              margin-bottom: 20px;
              font-style: italic;
              ${
                typeIO !== "Orden de Compra Rechazada"
                  ? "color: #555;"
                  : "color: red;"
              }
            }
    
            a {
              color: #06f;
            }
    
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
            }


            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              color: rgba(0, 0, 0, 0.1);
              font-size: 100px;
              font-weight: bold;
              z-index: 100;
              white-space: nowrap; 
            }
          
            .watermark span {
              display: block;
              margin-bottom: 100px; 
            }
          
            table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-collapse: collapse;
            }
    
            .tdtest {
              padding: 5px;
              vertical-align: top;
            }
    
            .right-align {
              text-align: right;
            }
    
            tr.top td {
              padding-bottom: 20px;
            }
    
            .title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
            }
    
            .information td {
              padding-bottom: 40px;
            }
    
            .heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
    
            .details td {
              padding-bottom: 20px;
            }
    
            .item td {
              border-bottom: 1px solid #eee;
            }
    
            .item.last td {
              border-bottom: none;
            }
    
            .total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
              }

              .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
              }
            }
          </style>
        </head>
        <div class="bodytest">
          <div class="invoice-box">
          ${watermarkHTML}
            <!-- Encabezado -->
            <tr class="top">
              <td colspan="2" class="tdtest" style="text-align: center;">
                <table>
                  <tr>
                    <td class="title tdtest">
                    </td>
                    <td class="tdtest right-align">
                      <strong> Fecha: ${new Date().toLocaleDateString()}</strong><br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <img src="/logo-horizontal.png" alt="Company logo"
                style="max-width: 500px; height: auto; filter: grayscale(100%);" />

            <!-- Información del cliente -->
            <table>
              <tr class="information">
                <td class="tdtest" colspan="5">
                  <table>
                    <tr>
                      <td class="tdtest">
                        Av. Siempre Viva 742 <br />
                        Springfield
                      </td>
                      <td class="tdtest right-align">
                      Proveedor: ${purchaseList[0].Product.Supplier.Name} <br />
                      Email: ${purchaseList[0].Product.Supplier.Email} <br />
                    </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Detalles de la factura -->
              <tr class="heading">
                <td class="tdtest">Item</td>
                <td class="tdtest">Cantidad</td>
                <td class="tdtest">Precio</td>
                <td class="tdtest">ISV</td>
                <td class="tdtest" style="text-align: right;">Precio Total</td>
              </tr>
              <!-- Ítems de la factura -->
              ${itemsHTML}

              <!-- Total -->
              <tr class="heading">
              <td class="tdtest" colspan="5">Detalles</td>
              </tr>

              <tr class="item">
                <td class="tdtest" colspan="4"><b>ISV 15%:</b></td>
                <td>${count.toFixed(2)} HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Descuento:</b></td>
                <td>0 HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>SubTotal:</b></td>
                <td>${subtotal.toFixed(2)} HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Total:</b></td>
                <td><b>${total.toFixed(2)} HNL</b></td>
              </tr>
            </table>
          </div>
        </div>
      </html>
    `;
    return invoiceHTML;
  };

  const downloadInvoiceAndSendToBackend = async () => {
    const invoiceHTML = buildInvoiceHTML();

    const options = {
      filename: "factura.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf()
      .from(invoiceHTML)
      .set(options)
      .output("blob");

    const formData = new FormData();
    formData.append("attachment_file", pdfBlob, "attachment_file.pdf");
    formData.append("purchaseList", JSON.stringify(purchaseList));
    formData.append("total", total);

    try {
      if (typeIO === "Orden de Compra") {
        await createOrder(formData);
      } else {
        await rejectPurchaseOrder(formData);
      }
    } catch (error) {
      console.error("Error al enviar la factura al backend:", error);
    }
  };

  await downloadInvoiceAndSendToBackend();
};

export const sendQuotation = async ({ purchaseList }) => {
  const buildInvoiceHTML = () => {
    const watermarkHTML = `
    <h3><strong>Solicitud de Cotización</strong></h3>
    <div class="watermark">
      <span>SOLICITUD DE COTIZACIÓN</span>
      <span>SOLICITUD DE COTIZACIÓN</span>
      <span>SOLICITUD DE COTIZACIÓN</span>
      <span>SOLICITUD DE COTIZACIÓN</span>
      <span>SOLICITUD DE COTIZACIÓN</span>
    </div>
      `;

    const itemsHTML = purchaseList
      .map((item) => {
        return `
                    <tr class="item">
                        <td>${item.productName}</td>
                        <td>${item.quantity}</td>
                        <td>-----</td>
                        
                        <td>-----</td>
                        <td style="text-align: right;"><b>-----</b></td>
                    </tr>
                `;
      })
      .join("");

    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            .bodytest {
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              text-align: center;
              color: #777;
            }
    
            .h1text {
              font-weight: 300;
              margin-bottom: 0px;
              padding-bottom: 0px;
              color: #777;
            }
    
            h3 {
              font-weight: 300;
              margin-top: 10px;
              margin-bottom: 20px;
              font-style: italic;
              color: #555;
            }
    
            a {
              color: #06f;
            }
    
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
              color: #555;
            }

            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              color: rgba(0, 0, 0, 0.1);
              font-size: 100px;
              font-weight: bold;
              z-index: 100;
              white-space: nowrap; 
            }
          
            .watermark span {
              display: block;
              margin-bottom: 100px; 
            }
          
            table {
              width: 100%;
              line-height: inherit;
              text-align: left;
              border-collapse: collapse;
            }
    
            .tdtest {
              padding: 5px;
              vertical-align: top;
            }
    
            .right-align {
              text-align: right;
            }
    
            tr.top td {
              padding-bottom: 20px;
            }
    
            .title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
            }
    
            .information td {
              padding-bottom: 40px;
            }
    
            .heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
    
            .details td {
              padding-bottom: 20px;
            }
    
            .item td {
              border-bottom: 1px solid #eee;
            }
    
            .item.last td {
              border-bottom: none;
            }
    
            .total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
              .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
              }

              .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
              }
            }
          </style>
        </head>
        <div class="bodytest">
          <div class="invoice-box">
          ${watermarkHTML}
            <!-- Encabezado -->
            <tr class="top">
              <td colspan="2" class="tdtest" style="text-align: center;">
                <table>
                  <tr>
                    <td class="title tdtest">
                    </td>
                    <td class="tdtest right-align">
                      <strong> Fecha: ${new Date().toLocaleDateString()}</strong><br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <img src="/logo-horizontal.png" alt="Company logo"
                style="max-width: 500px; height: auto; filter: grayscale(100%);" />

            <!-- Información del cliente -->
            <table>
              <tr class="information">
                <td class="tdtest" colspan="5">
                  <table>
                    <tr>
                      <td class="tdtest">
                        Av. Siempre Viva 742 <br />
                        Springfield
                      </td>
                      <td class="tdtest right-align">
                      Proveedor: ${purchaseList[0].supplier.Name} <br />
                      Email: ${purchaseList[0].supplier.Email} <br />
                    </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Detalles de la factura -->
              <tr class="heading">
                <td class="tdtest">Item</td>
                <td class="tdtest">Cantidad</td>
                <td class="tdtest">Precio</td>
                <td class="tdtest">ISV</td>
                <td class="tdtest" style="text-align: right;">Precio Total</td>
              </tr>
              <!-- Ítems de la factura -->
              ${itemsHTML}

              <!-- Total -->
              <tr class="heading">
              <td class="tdtest" colspan="5">Detalles</td>
              </tr>

              <tr class="item">
                <td class="tdtest" colspan="4"><b>ISV 15%:</b></td>
                <td>----- HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Descuento:</b></td>
                <td>----- HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>SubTotal:</b></td>
                <td>----- HNL</td>
              </tr>
              <tr class="item">
                <td class="tdtest" colspan="4"><b>Total:</b></td>
                <td><b>----- HNL</b></td>
              </tr>
            </table>
          </div>
        </div>
      </html>
    `;
    return invoiceHTML;
  };

  const downloadInvoiceAndSendToBackend = async () => {
    const invoiceHTML = buildInvoiceHTML();

    const options = {
      filename: "factura.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf()
      .from(invoiceHTML)
      .set(options)
      .output("blob");

    const formData = new FormData();
    formData.append("attachment_file", pdfBlob, "attachment_file.pdf");
    formData.append("quotationItems", JSON.stringify(purchaseList));

    try {
      await requestQuotation(formData);
    } catch (error) {
      console.error("Error al enviar la factura al backend:", error);
    }
  };

  await downloadInvoiceAndSendToBackend();
};
export default sendInvoice;
