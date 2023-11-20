const newsLetterEmail = (clientName) => `<p>Hi ${clientName}, here you have today news.</p>`
const welcomeEmail = (clientName, token) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=">
  <title></title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

    body {
      margin: 0;
      padding: 0;
      padding-top: 20px;
      padding-bottom: 20px;
      
      font-size: 16px;
      box-sizing: border-box;
      background-color: #f2f2f2;
    }

    img {
      width: 100%;
      border: 0;
      outline: none;
    }

    h2 {
      padding: 50px 0 0 0;
      margin: 0;
      font-weight: 700;
      font-size: 25.31px;
      line-height: 29.8734177px;
    }

    p.text-main {
      margin: 0;
      padding-top: 16.7088608px;
      font-size: 15.1898734px;
    }

    .wrapper {
      max-width: 650px;
      margin: 0 auto;
      height: 100%;
    }

    .container {
      background-color: #FAFAF9;
      height: inherit;
      -webkit-box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      -moz-box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      box-shadow: inset 0px 0px 0px 0.8px #E4E4E4;
      border-radius: 2px;
    }

    .header {
      font-size: 46px;
      font-weight: bold;
      text-align: center;
      padding: 2rem;
      background: #44a8c7;
      color: #fff;
      font-family: bitter, georgia, serif;
    }

    .main-content {
      padding: 28px 11% 20px 11%;
      text-align: center;
      color: #201F2F;
    }

    .button {
      text-decoration: none;
      border-radius: 3px;
      font-size: 15.1898734px;
      font-weight: 700;
      color: #FAFAF9;
      outline: 0;
      outline-offset: 0;
      border: 0;
      background-color: #44a8c7;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 40px;
      padding-right: 40px;
      display: inline-block;
      margin-top: 30.8860759px;
    }

    .footer {
      height: 90px;
      padding-top: 15.6962025px;
      padding-left: 11%;
      padding-right: 11%;
      font-size: 12.6582278px;
      line-height: 14.6835443px;
      text-align: center;
    }

    .footer p,
    .footer a {
      font-size: 10.6582278px;
      line-height: 12.6835443px;
      margin: 0;
      padding: 0;
      padding-bottom: 5.56962025px;
      color: #a9a9a9;
    }

    p.sub-text {
      margin: 0;
      padding-top: 100px;
      font-size: 15.1898734px;
      color: #62626d;
    }

    p.long-link {
      font-size: 10.1265823px;
      text-align: justify;
      overflow-wrap: anywhere;
      color: #62626d;
    }

    .verify_txt {
      font-style: normal;
      font-weight: normal;
      color: #44a8c7;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      font-weight: bold;
    }

    .content {
      text-align: left;
      color: #60666d;
      font-size: 14px;
      line-height: 21px;
      font-family: "Open Sans", sans-serif;
      line-height: 21px;
      font-weight: bold;
    }
    
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        PhotoGram
      </div>
      <div class="main-content">
        <p class="verify_txt">Verify Your Email</p>
        <p class="content">Hello ${clientName},</p>
       <p class="content">Thank you for signing up to Photobook App.</p>
       <p class="content">Please click on the following button to activate your token.</p>
       <p class="content">Sincerely,<br/>Team Photobook</p>
       <p class="content"></p>
      
        <a href="£" class="button">Verify Email</a>

      </div>
    </div>

  </div>
</body>

</html>`

module.exports ={newsLetterEmail, welcomeEmail}