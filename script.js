async function predict() {
    const textArea = document.getElementById("textInput");
    const button = document.getElementById("btnPredict");
    const resultDiv = document.getElementById("result");
    const container = document.querySelector(".container");

    const text = textArea.value;

    if (!text.trim()) {
        alert("Digite um texto para classificar!");
        return;
    }

    textArea.disabled = true;
    button.disabled = true;
    button.innerText = "Classificando...";

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        document.getElementById("label").innerText = data.label_name;
        document.getElementById("confidence").innerText =
            (data.confidence * 100).toFixed(2) + "%";

        const backgroundMap = {
            Politics: "https://d30903flf7mc19.cloudfront.net/wp-content/uploads/2022/09/23111209/discussao-politica-trabalho.webp",
            Sport: "https://img.freepik.com/fotos-gratis/ferramentas-desportivas_53876-138077.jpg?semt=ais_hybrid&w=740&q=80",
            Technology: "https://ravel.com.br/blog/wp-content/uploads/2023/02/Tendencias-de-tecnologia-2023-Capa.jpg",
            Entertainment: "https://www.telavita.com.br/blog/wp-content/uploads/2023/01/comemoracao-entretenimento-1.jpg",
            Business: "https://vbmc.com.br/wp-content/uploads/2021/03/plano-de-negocios.jpg"
        };

        if (backgroundMap[data.label_name]) {
            document.querySelector('.background').style.backgroundImage = `url(${backgroundMap[data.label_name]})`;
        }

        resultDiv.classList.remove("hidden");

    } catch (error) {
        alert("Erro ao conectar com a API");
        console.error(error);

    } finally {
        textArea.disabled = false;
        button.disabled = false;
        button.innerText = "Classificar";
    }
}
