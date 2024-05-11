const { Resend } = require('resend');



// const resend = new Resend({
//     apiKey: 're_LQx6bM5h_QBixV8MYAVgDuhCdnH6PorvS',
//     domain: 'onboarding@resend.dev',
// });

// const correo = {
//     from: 'br.gutierrezsantana@gmail.com',
//     to: 'br.gutierrezSantana@gmail.com',
//     subject: 'Asunto del correo electrónico',
//     text: 'Contenido del correo electrónico',
// };

// resend.send(correo, (error, data) => {
//     if (error) {
//         console.error('Error al enviar el correo electrónico:', error);
//     } else {
//         console.log('Correo electrónico enviado exitosamente:', data);
//     }
// });









const resend = new Resend('re_LQx6bM5h_QBixV8MYAVgDuhCdnH6PorvS');
const miPagina = "www.lasttcgstore.com";
// (async function () {
//   try {
//     const data = await resend.emails.send({
//       from: 'LastTcgStore@lasttcgstore.com',
//       to: ['br.gutierrezsantana@gmail.com'],
//       subject: 'Hello World',
//       html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html dir="ltr" lang="en">

//           <head>
//             <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
//           </head>
//           <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your login code for Linear<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
//           </div>

//           <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
//             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;margin:0 auto;padding:20px 0 48px">
//               <tbody>
//                 <tr style="width:100%">
//                   <td><img alt="Linear" height="42" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/linear-logo.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" width="42" />
//                     <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Your login code for Linear</h1>
//                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:27px 0 27px">
//                       <tbody>
//                         <tr>
//                           <td><a href=${miPagina} style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;padding:11px 23px 11px 23px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">Login to Linear</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">This link and code will only be valid for the next 5 minutes. If the link does not work, you can use the login verification code directly:</p><code style="font-family:monospace;font-weight:700;padding:1px 4px;background-color:#dfe1e4;letter-spacing:-0.3px;font-size:21px;border-radius:4px;color:#3c4149">tt226-5398x</code>
//                     <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a href="https://linear.app" style="color:#b4becc;text-decoration:none;font-size:14px" target="_blank">Linear</a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </body>

//         </html>`
//     });

//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// })();
// funcion que envia un correo con el enlace para verificar la cuenta creada
const verificarCuenta = async (email, ruta) => {
  try {
    const data = await resend.emails.send({
      from: 'LastTcgStore@lasttcgstore.com',
      to: [email],
      subject: 'Verifica Tu Cuenta',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html dir="ltr" lang="en">
        
          <head>
            <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          </head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your login code for Linear<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
          </div>
        
          <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;margin:0 auto;padding:20px 0 48px">
              <tbody>
                <tr style="width:100%">
                  <td><img alt="Linear" height="42" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/linear-logo.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" width="42" />
                    <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Accede el link para verificar tu cuenta</h1>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:27px 0 27px">
                      <tbody>
                        <tr>
                          <td><a href=${ruta} style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;padding:11px 23px 11px 23px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">Verificar Cuenta</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a href="www.lasttcgstore.com" style="color:#b4becc;text-decoration:none;font-size:14px" target="_blank">www.LastTcgStore.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        
        </html>`
    });

    console.log(data)
  } catch (error) {
    console.error(error);
  }

}

//funcion para el endpoint recuperar password, en caso de no querer usar el token
const recuperarContraseñaEmail = async (email, password) => {
  try {
    const data = await resend.emails.send({
      from: 'LastTcgStore@lasttcgstore.com',
      to: [email],
      subject: 'Cambio de Contraseña',
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <style>
          body {
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          }
          .container {
            max-width: 560px;
            margin: 0 auto;
            padding: 20px 0 48px;
          }
          .logo {
            display: block;
            width: 42px;
            height: 42px;
            outline: none;
            border: none;
            text-decoration: none;
            border-radius: 21px;
          }
          .title {
            font-size: 24px;
            letter-spacing: -0.5px;
            line-height: 1.3;
            font-weight: 400;
            color: #484848;
            padding: 17px 0 0;
          }
          .password-box {
            background-color: #f4f4f4;
            border-radius: 4px;
            padding: 20px;
            text-align: center;
            margin-top: 27px;
          }
          .password-text {
            font-size: 18px;
            font-weight: bold;
            color: #5e6ad2;
            margin: 0;
          }
          .footer {
            color: #b4becc;
            text-decoration: none;
            font-size: 14px;
            margin-top: 42px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="logo" alt="Linear" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/linear-logo.png" />
          <h1 class="title">Tu nueva contraseña es:</h1>
          <div class="password-box">
            <p class="password-text">${password}</p>
          </div>
          <a class="footer" href="www.lasttcgstore.com" target="_blank">www.LastTcgStore.com</a>
        </div>
      </body>
      </html>
      `,
    });

    console.log(data)
  } catch (error) {
    console.error(error);
  }

}

// funcion para el endpoint recuperar password envia un token al correo para recuperar el password
const recuperarContraseñaEmailToken = async (email, token) => {
  try {
    const data = await resend.emails.send({
      from: 'LastTcgStore@lasttcgstore.com',
      to: [email],
      subject: 'Cambio de Contraseña',
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <style>
          body {
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          }
          .container {
            max-width: 560px;
            margin: 0 auto;
            padding: 20px 0 48px;
          }
          .logo {
            display: block;
            width: 42px;
            height: 42px;
            outline: none;
            border: none;
            text-decoration: none;
            border-radius: 21px;
          }
          .title {
            font-size: 24px;
            letter-spacing: -0.5px;
            line-height: 1.3;
            font-weight: 400;
            color: #484848;
            padding: 17px 0 0;
          }
          .password-box {
            background-color: #f4f4f4;
            border-radius: 4px;
            padding: 20px;
            text-align: center;
            margin-top: 27px;
          }
          .password-text {
            font-size: 18px;
            font-weight: bold;
            color: #5e6ad2;
            margin: 0;
          }
          .footer {
            color: #b4becc;
            text-decoration: none;
            font-size: 14px;
            margin-top: 42px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="logo" alt="Linear" src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/linear-logo.png" />
          <h1 class="title">ingresa el codigo en el siguiente enlace:</h1>
          <div class="password-box">
            <p class="password-text">${token}</p>
          </div>
          <div>
            <a class="footer" href="www.lasttcgstore.com" target="_blank">www.LastTcgStore.com</a>
        </div>
          <a class="footer" href=http://localhost:3000/recuperar-contrase%C3%B1a-token/${email}>" target="_blank">www.LastTcgStore.com</a>
        </div>
      </body>
      </html>
      `,
    });

    console.log(data)
  } catch (error) {
    console.error(error);
  }

}

//funcion para  el endpoint crear venta, envia un correo cuando la venta se crea con el detalle de esta
const correoDeVenta = async (email, productosConDetalles, total, metodoPago, idVentaString) => {
  try {
    console.log(total);
    const data = await resend.emails.send({
      from: 'LastTcgStore@lasttcgstore.com',
      to: [email],
      subject: 'Resumen de su compra',
      html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
      <head>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          <title>Resumen de Compra</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 20px;
              }
              h1, h2 {
                  color: #333;
              }
              ul {
                  list-style-type: none;
                  padding: 0;
              }
              li {
                  margin-bottom: 10px;
                  padding: 10px;
                  background-color: #f4f4f4;
                  border-radius: 5px;
              }
              a {
                  color: #007bff;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <h1>Resumen de la Venta</h1>
          <h2>Detalles de los Productos</h2>
          <ul>
              ${productosConDetalles.map(producto => `
                  <li>
                      <strong>Nombre:</strong> ${producto.cardText}<br>
                      <strong>Cantidad:</strong> ${producto.cantidad}<br>
                      <strong>Precio Unitario:</strong> ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(producto.cardPrice)}<br>
                      <strong>Total:</strong> ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(producto.cardPrice * producto.cantidad)}
                  </li>
              `).join('')}
          </ul>
         <h2>Total de la Venta: ${total}</h2>
          <h2>Método de Pago: ${metodoPago}</h2>
          ${idVentaString ? `<h2>Código de venta: ${idVentaString.toString()}</h2>` : ''}
          <h2>Para saber el estado de su compra, ingrese el código de venta en el siguiente enlace</h2>
          <a class="footer" href="http://www.lasttcgstore.com/cargar-estado-venta" target="_blank">Verificar Estado De Venta</a>

          <h2>Datos de Transferencia</h2>
          <p>Por favor, transfiera el monto total de la venta a la siguiente cuenta bancaria:</p>
          <p>Número de Cuenta: [18071516]</p>
          <p>RUT: [180715169]</p>
          <p>Nombre del Banco: [Banco Estado]</p>
          <p>Tipo de Cuenta: [Cuenta Vista]</p>
          <p>Tiene 24 horas para realizar el pago. Si el pago no se completa dentro de este período, la venta será cancelada automáticamente.</p>
          
          <h2>Envío de Comprobante de Transferencia</h2>
          <p>Una vez realizada la transferencia, por favor envíe el comprobante junto con el código de venta a:</p>
          <p>Correo: <a href="mailto:pagos.last.tcg@gmail.com">pagos.last.tcg@gmail.com</a></p>
      </body>
      </html>
      `
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  verificarCuenta,
  recuperarContraseñaEmail,
  recuperarContraseñaEmailToken,
  correoDeVenta
}

