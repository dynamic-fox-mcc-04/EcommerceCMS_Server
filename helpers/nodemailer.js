const nodemailer = require('nodemailer');

// const numberFormat = require('../helpers/numberFormat');
function mailer(buyer, username, productName, imageUrl) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `pairprojectMCC4@gmail.com`,
      pass: `${process.env.PASSWORDEMAIL}`,
    }
  });
  const mailOptions = {
  from: `pairprojectMCC4@gmail.com`, // sender address
  to: buyer, // list of receivers
  subject: 'Node Contact Request', // Subject line
  html: 
  `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
      <meta charset="utf-8"> <!-- utf-8 works for most cases -->
      <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
      <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
      <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
      <script src="https://kit.fontawesome.com/18e6ba2528.js" crossorigin="anonymous"></script>
      <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,600&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Permanent+Marker&amp;display=swap" rel="stylesheet">
  
  
      <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">
  
      <!-- CSS Reset : BEGIN -->
  <style>
  
  html,
  body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: #f1f1f1;
  }
  
  /* What it does: Stops email clients resizing small text. */
  * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
  }
  
  /* What it does: Centers email on Android 4.4 */
  div[style*="margin: 16px 0"] {
      margin: 0 !important;
  }
  
  /* What it does: Stops Outlook from adding extra spacing to tables. */
  table,
  td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
  }
  
  /* What it does: Fixes webkit padding issue. */
  table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
  }
  
  /* What it does: Uses a better rendering method when resizing images in IE. */
  
  /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
  a {
      text-decoration: none;
  }
  
  /* What it does: A work-around for email clients meddling in triggered links. */
  *[x-apple-data-detectors],  /* iOS */
  .unstyle-auto-detected-links *,
  .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
  .a6S {
      display: none !important;
      opacity: 0.01 !important;
  }
  
  /* What it does: Prevents Gmail from changing the text color in conversation threads. */
  .im {
      color: inherit !important;
  }
  
  /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
  /* Create one of these media queries for each additional viewport size you'd like to fix */
  
  /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
  @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u ~ div .email-container {
          min-width: 320px !important;
      }
  }
  /* iPhone 6, 6S, 7, 8, and X */
  @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u ~ div .email-container {
          min-width: 375px !important;
      }
  }
  /* iPhone 6+, 7+, and 8+ */
  @media only screen and (min-device-width: 414px) {
      u ~ div .email-container {
          min-width: 414px !important;
      }
  }
  
  </style>
  
      <!-- CSS Reset : END -->
  
      <!-- Progressive Enhancements : BEGIN -->
  <style>
  
  .primary{
    background: #f3a333;
  }
  
  .bg_white{
    background: #ffffff;
  }
  .bg_light{
    background: #fafafa;
  }
  .bg_black{
    background: #000000;
  }
  .bg_dark{
    background: rgba(0,0,0,.8);
  }
  .email-section{
    padding:2.5em;
  }
  
  /*BUTTON*/
  .btn{
    padding: 10px 15px;
  }
  .btn.btn-primary{
    border-radius: 30px;
    background: #f3a333;
    color: #ffffff;
  }
  
  
  
  h1,h2,h3,h4,h5,h6{
    font-family: 'Playfair Display', serif;
    color: #000000;
    margin-top: 0;
  }
  
  body{
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.8;
    color: rgba(0,0,0,.4);
  }
  
  a{
    color: #f3a333;
  }
  
  table{
  }
  /*LOGO*/
  
  .logo h1{
    margin: 0;
  }
  .logo h1 a{
    color: #000;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  /*HERO*/
  .hero{
    position: relative;
  }

  .hero .text{
    color: rgba(255,255,255,.8);
  }
  .hero .text h2{
    color: #ffffff;
    font-size: 30px;
    margin-bottom: 0;
  }


  .icon{
    text-align: center;
  }
  
  /*BLOG*/
  
  /*TESTIMONY*/
  .text-testimony .name{
    margin: 0;
  }
  .text-testimony .position{
    color: rgba(0,0,0,.3);
  
  }
  
  
  /*FOOTER*/
  
  .footer{
    color: rgba(255,255,255,.5);
  
  }
  .footer .heading{
    color: #ffffff;
    font-size: 20px;
  }
  .footer ul{
    margin: 0;
    padding: 0;
  }
  .footer ul li{
    list-style: none;
    margin-bottom: 10px;
  }
  .footer ul li a{
    color: rgba(255,255,255,1);
  }
  
  
  @media screen and (max-width: 500px) {
  
    .icon{
      text-align: left;
    }
  
  }

  .text h2,.text p {
    color: white;
  }
  
  </style>
  
  
  </head>
  
  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
    <center style="width: 100%; background-color: #f1f1f1;">
      <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <div style="max-width: 600px; margin: 0 auto;" class="email-container">
        <!-- BEGIN BODY -->
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
          <tr>
            <td class="bg_white logo" style="padding: 1em 2.5em; text-align: center">
              <h1 style="font-family: 'Permanent Marker', cursive;"><i class="fas fa-shoe-prints text-white"></i>Brada</h1>
            </td>
          </tr><!-- end tr -->
          <tr>
          <td valign="middle" class="hero" style="background-image: url('${imageUrl}'); background-position: center; height: 400px;">
            </td>
          </tr><!-- end tr -->
        <!-- 1 Column Text + Button : END -->
        </table>
        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
        <tr>
        <td valign="middle" class="bg_black footer email-section">
          <table>
            <tr>
              <td valign="middle" class="hero" style="background-color: black; height: 400px;">
                <table>
                  <tr>
                    <td>
                      <div class="text" style="padding: 0 3em; text-align: center;">
                        <h2 style="color: white;">Hi! ${username}</h2>
                        <p style="color: white;">Thanks for your purchase! Your ${productName} is on the way your home. Please wait. if you want to see your transaction history, you can visit our site on the link below</p>
                        <p style="color: white;"><a href="https://brada-customer.web.app" class="btn btn-primary">Brada</a></p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end tr -->
          </table>
        </td>
      </tr><!-- end: tr -->
          <tr>
            <td valign="middle" class="bg_black footer email-section">
              <table>
                <tr>
                  <td valign="top" width="33.333%">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: left; padding-right: 10px;">
                          <p>&copy; 2020 Brada-Commerce. All Rights Reserved</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td valign="top" width="33.333%">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                          <p><a href="#" style="color: rgba(255,255,255,.4);">See ya</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
  </html>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
  if (err)
      console.log(err);
  else
      console.log(info.response);
  });
}

module.exports = mailer