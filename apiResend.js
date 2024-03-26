const {Resend} = require('resend');



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

(async function() {
    try {
      const data = await resend.emails.send({
        from: 'Acme <whast.tcg@gmail.com>',
        to: ['br.gutierrezsantana@gmail.com'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>'
      });
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  })();