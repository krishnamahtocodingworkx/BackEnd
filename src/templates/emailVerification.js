export const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Verify Your Email - PlantBook</title>
        <style>
            body {
                background-color: #f9fff9;
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
                color: #2e7d32;
                margin-bottom: 20px;
                text-decoration: none;
            }
    
            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #1b5e20;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .highlight {
                display: inline-block;
                padding: 12px 24px;
                background-color:rgb(205, 240, 206);
                color:rgb(23, 43, 24);
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
                color: #2e7d32;
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="logo">🌱 PlantBook</div>
            <div class="message">Verify Your Email</div>
            <div class="body">
                <p>Hello Plant Lover,</p>
                <p>Welcome to <strong>PlantBook</strong> — your green community where you can share and discover amazing plant photos.</p>
                <p>To complete your signup and start growing your garden of memories, please use the following OTP (One-Time Password):</p>
                <div class="highlight">${otp}</div>
                <p>This OTP is valid for <strong>5 minutes</strong>. If you didn’t sign up for PlantBook, you can safely ignore this email.</p>
            </div>
            <div class="support">
                Need help? Reach us anytime at 
                <a href="mailto:support@plantbook.com">support@plantbook.com</a>.
            </div>
        </div>
    </body>
    
    </html>`;
};
