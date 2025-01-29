const nodemailer = require("nodemailer");
const errorHanler = require("../error/errorHandler");

exports.sendmail = (req, res, next, url) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    post: 465,
    auth: {
      user: process.env.NODE_MAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailoption = {
    from: "Garvit Jain pvt.lmtd",
    to: req.body.email,  // Ensure req.body.email is passed correctly
    subject: "Password Reset Link ",
    html: `
      <h1>Click Link Below to reset your password</h1> <br/>
      <a href="${url}">Password Reset Link</a>
    `,
  };

  transport.sendMail(mailoption, (err, info) => {
    if (err) return next(new errorHanler(err, 500));
    console.log(info);
    return res.status(200).json({
      message: "Mail sent successfully",
      url,
    });
  });
};

exports.sendmailPassword = (req, res, next, password, user) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    post: 465,
    auth: {
      user: process.env.NODE_MAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  // Log user and password for debugging
  console.log("User:", user);
  console.log("Password:", password);

  // Check if the user object and email exist
  if (!user || !user.email) {
    return next(new errorHanler("Recipient email not found", 400));
  }

  const mailoption = {
    from: "Garvit Jain pvt.lmtd",
    to: user.email,  // Ensure user.email exists
    subject: "Your Dashboard Password",
    html: `
      <h1>Congratulations, you are now a verified user</h1> <br/>
      <h1>Hello, ${user.firstname} ${user.lastname}, the password for your dashboard is:</h1> <br/>
      <h3>${password}</h3>
      <br/>
      <h4>Thank you, MyCozee</h4>
    `,
  };

  transport.sendMail(mailoption, (err, info) => {
    if (err) return next(new errorHanler(err, 500));
    console.log(info);
    return res.status(200).json({
      message: "Salesperson Status updated successfully",
    });
  });
};
