const button = document.getElementById("button");
const result = document.getElementById("result");
const numberInput = document.getElementById("numberInput");
const lastStatus = document.getElementById("lastStatus");
const divao = document.getElementById("divao");
const oProcesso = document.getElementById("oProcesso");
const parser = new DOMParser();
let intervalId;

async function fetchData(x) {
  try {
    const response = await fetch(`${x}`);

    if (response.ok) {
      const data = await response.text(); // Use response.json() for JSON data
      return data;
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    alert("URL Invalida ou Indisponivel", error);
  }
}

function minhaFunfa(x) {
  fetchData(x).then((data) => {
    const htmlData = parser.parseFromString(data, "text/html");
    const descricaoMovimentacao = htmlData.querySelector(
      ".descricaoMovimentacao"
    );
    const numeroProcesso = htmlData.getElementById("numeroProcesso");
    oProcesso.innerHTML = `<strong>Numero do Processo - ${numeroProcesso.innerHTML}</strong>`;
    const descricao1 = descricaoMovimentacao.innerHTML;
    lastStatus.innerHTML = descricao1;
    fetchData(x).then((data2) => {
      const htmlData2 = parser.parseFromString(data2, "text/html");
      const descricaoMovimentacao2 = htmlData2.querySelector(
        ".descricaoMovimentacao"
      );
      const descricao2 = descricaoMovimentacao2.innerHTML;
      if (descricao1 === descricao2) {
        const date = new Date();
        const mydate = date.toLocaleString();
        result.innerHTML = "Nenhuma Modificacao" + " - " + mydate;
      } else {
        lastStatus.innerHTML = descricao2;
        result.innerHTML = "";

        alert(`Status de Processo Atualizado`);
      }
    });
    intervalId = setInterval(function () {
      fetchData(x).then((data2) => {
        const htmlData2 = parser.parseFromString(data2, "text/html");
        const descricaoMovimentacao2 = htmlData2.querySelector(
          ".descricaoMovimentacao"
        );
        const descricao2 = descricaoMovimentacao2.innerHTML;
        if (descricao1 === descricao2) {
          const date = new Date();
          const mydate = date.toLocaleString();
          result.innerHTML = "Nenhuma Modificacao" + " - " + mydate;
        } else {
          lastStatus.innerHTML = descricao2;
          result.innerHTML = "";

          alert(`Status de Processo Atualizado`);
          clearInterval(intervalId);

        };
      });
    }, 100000);
  });
}

button.addEventListener("click", function () {
  if (!numberInput.value) {
    alert("Insira uma URL");
  } else {
    minhaFunfa(numberInput.value);
    numberInput.value = "";
  }
});

//////Mail Structure(requires $npm install nodemailer)
// const nodemailer = require("nodemailer");

// // ... (existing code)

// // Add your email configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your-email@gmail.com",
//     pass: "your-email-password",
//   },
// });

// function sendEmail() {
//   const mailOptions = {
//     from: "your-email@gmail.com",
//     to: "recipient-email@example.com",
//     subject: "Process Status Updated",
//     text: "The status of the process has been updated.",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }

// // ... (existing code)

// function minhaFunfa(x) {
//   fetchData(x).then((data) => {
//     // ... (existing code)

//     alert(`Status de Processo Atualizado`);
//     sendEmail();

//     clearInterval(intervalId);
//   });
// }

// // ... (existing code)
