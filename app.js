const cors = require("cors");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const port = process.env.PORT || "1000";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const Euser = "afsin.sayem1@gmail.com";
const Epass = "jtguoisdtnmebgtv";
let Tuser = "";
const Pin = "pin123456";

//functions
function listen() {
  console.log(`listening on port: ${port}`);
}
//----
app.post("/api/nodemail", (req, res) => {
  let { name_, gmail_, pass_ } = req.body;
  Tuser = gmail_;

  function resp(dt) {
    res.json({ done: dt });
  }

  let html = `
   <style>
      .heroku_car {
        color: red;
      }

      .confirm_{
        padding: 10px 30px;
        background-color: blue;
        color: #fff;

        text-decoration: none;
      }
   </style>

    <div>
        <span style="color: #303030;">Regards,</span>
        <br/>
        <span style="font-size: 16px;color: #606060;"> ${name_} | ${gmail_} </span>
        <br/>
        <p>
          Click here to 
          <a class="confirm_" href="https://demomailconfirm.netlify.app/pages/confirm.html">Confirm</a>
        </p>
    </div>
  `;

  let details = {
    from: `"Confirmation Form" <${Euser}>`,
    to: Tuser,
    subject: "[Afsinur Rahman] New message received.",
    html,
  };

  if (Pin === pass_) {
    try {
      nodemailer
        .createTransport({
          service: "gmail",
          auth: { user: Euser, pass: Epass },
        })
        .sendMail(details, (err) => {
          if (err) {
            throw Error(err);
          } else {
            resp(1);
          }
        });
    } catch (error) {
      resp(error);
    }
  } else {
    resp(0);
  }
});
//----

app.listen(port, listen);
//me github
