function ProcessoMonitor(
  containerId,
  inputId,
  buttonId,
  resultId,
  lastStatusId,
  oProcessoId
) {
  const container = document.getElementById(containerId);
  const input = container.querySelector(`#${inputId}`);
  const button = container.querySelector(`#${buttonId}`);
  const result = container.querySelector(`#${resultId}`);
  const lastStatus = container.querySelector(`#${lastStatusId}`);
  const oProcesso = container.querySelector(`#${oProcessoId}`);
  const parser = new DOMParser();
  let intervalId;

  async function fetchData() {
    try {
      const response = await fetch(input.value);

      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      alert("URL Inválida ou Indisponível", error);
    }
  }

  this.startMonitoring = function () {
    fetchData().then((data) => {
      const htmlData = parser.parseFromString(data, "text/html");
      const descricaoMovimentacao = htmlData.querySelector(
        ".descricaoMovimentacao"
      );
      const numeroProcesso = htmlData.getElementById("numeroProcesso");
      oProcesso.innerHTML = `<strong>Número do Processo - ${numeroProcesso.innerHTML}</strong>`;
      const descricao1 = descricaoMovimentacao.innerHTML;
      lastStatus.innerHTML = descricao1;
      fetchData().then((data2) => {
        const htmlData2 = parser.parseFromString(data2, "text/html");
        const descricaoMovimentacao2 = htmlData2.querySelector(
          ".descricaoMovimentacao"
        );
        const descricao2 = descricaoMovimentacao2.innerHTML;
        if (descricao1 === descricao2) {
          const date = new Date();
          const mydate = date.toLocaleString();
          result.innerHTML = "Nenhuma Modificação" + " - " + mydate;
        } else {
          lastStatus.innerHTML = descricao2;
          result.innerHTML = "xx";
          alert(`Status de Processo Atualizado`);
          clearInterval(intervalId);
        }
      });

      intervalId = setInterval(function () {
        fetchData().then((data2) => {
          const htmlData2 = parser.parseFromString(data2, "text/html");
          const descricaoMovimentacao2 = htmlData2.querySelector(
            ".descricaoMovimentacao"
          );
          const descricao2 = descricaoMovimentacao2.innerHTML;
          if (descricao1 === descricao2) {
            const date = new Date();
            const mydate = date.toLocaleString();
            result.innerHTML = "Nenhuma Modificação" + " - " + mydate;
          } else {
            lastStatus.innerHTML = descricao2;
            result.innerHTML = "xx";
            alert(`Status de Processo Atualizado`);
            clearInterval(intervalId);
          }
        });
      }, 100000);
    });
  };

  button.addEventListener("click", () => {
    if (!input.value) {
      alert("Insira uma URL");
    } else {
      clearInterval(intervalId);
      this.startMonitoring();
    }
  });
}

const processoMonitor1 = new ProcessoMonitor(
  "divao",
  "numberInput",
  "button",
  "result",
  "lastStatus",
  "oProcesso"
);
processoMonitor1.startMonitoring();

const processoMonitor2 = new ProcessoMonitor(
  "divao2",
  "numberInput2",
  "button2",
  "result2",
  "lastStatus2",
  "oProcesso2"
);
processoMonitor2.startMonitoring();
const processoMonitor3 = new ProcessoMonitor(
  "divao3",
  "numberInput3",
  "button3",
  "result3",
  "lastStatus3",
  "oProcesso3"
);
processoMonitor3.startMonitoring();
const processoMonitor4 = new ProcessoMonitor(
  "divao4",
  "numberInput4",
  "button4",
  "result4",
  "lastStatus4",
  "oProcesso4"
);
processoMonitor4.startMonitoring();
const processoMonitor5 = new ProcessoMonitor(
  "divao5",
  "numberInput5",
  "button5",
  "result5",
  "lastStatus5",
  "oProcesso5"
);
processoMonitor5.startMonitoring();

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
