import nodemailer from "nodemailer";
const sendEmail = (email:string, message:string) => {  
  try {
    const transporter = nodemailer.createTransport({      
      host: 'mail.smtp2go.com',
      port: 2525,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,        
        pass: process.env.NODEMAILER_PASSWORD
      },
      tls: { 
        ciphers:'SSLv3' 
    }    
    });
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,      
      subject: 'Email subscription verification code',
      html: message,    
    }

    transporter.verify(function(err, success) { 
      if (err) { 
              console.log(err); 
        }
    });

    return transporter.sendMail(mailOptions)  
  } catch (err) {
    console.log(err)  
  }
}

export {sendEmail}