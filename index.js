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
    alert("Error fetching data:", error);
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
          result.innerHTML = "mudou mandar alerta";
          alert(
            `Status de Processo Atualizado: ${descricaoMovimentacao2.innerText}`
          );
          clearInterval(intervalId);
        }
      });
    }, 1000000);
  });
}

button.addEventListener("click", function () {
  if (!numberInput.value) {
    alert("Must Provide Number");
  } else {
    minhaFunfa(numberInput.value);
    numberInput.value = "";
  }
});
