export const forgotOtpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Password Reset - PlantBook</title>
    <style>
      body {
        background-color: #fff9f9;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #2e2e2e;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
  
      .logo {
        font-size: 28px;
        font-weight: bold;
        color: #c62828;
        margin-bottom: 20px;
        text-decoration: none;
      }
  
      .message {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #b71c1c;
      }
  
      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }
  
      .highlight {
        display: inline-block;
        padding: 12px 24px;
        background-color: #fcdada;
        color: #5d1a1a;
        border-radius: 8px;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 3px;
        margin: 20px 0;
      }
  
      .support {
        font-size: 14px;
        color: #666666;
        margin-top: 20px;
      }
  
      a {
        color: #c62828;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">🔒 PlantBook</div>
      <div class="message">Password Reset Request</div>
      <div class="body">
        <p>Hello Plant Lover,</p>
        <p>We received a request to reset your <strong>PlantBook</strong> account password.</p>
        <p>Use the OTP below to proceed with resetting your password:</p>
        <div class="highlight">${otp}</div>
        <p>This OTP is valid for <strong>5 minutes</strong>. If you did not request a password reset, please ignore this email or contact support immediately.</p>
      </div>
      <div class="support">
        Need help? Reach us at 
        <a href="mailto:support@plantbook.com">support@plantbook.com</a>.
      </div>
    </div>
  </body>
  </html>`;
};
