const key = "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"; // Replace with your actual Hugging Face API key
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const Genbtn = document.getElementById("btn");
const DownloadBtn = document.getElementById("Download");
const ResetBtn = document.getElementById("Reset");

// Function to query the Hugging Face Text-to-Image model
async function query(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: {
                    Authorization: `Bearer ${key}`
                },
                method: "POST",
                body: JSON.stringify({ inputs: data }),
            }
        );

        if (!response.ok) {
            throw new Error("Error generating image. Please try again.");
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        alert(error.message);
    }
}

// Function to generate an image based on input text
async function generate() {
    const data = inputText.value.trim();
    if (!data) {
        alert("Please enter a prompt to generate an image.");
        return;
    }

    image.src = ""; // Clear previous image
    try {
        const response = await query(data);
        if (response) {
            const url = URL.createObjectURL(response);
            image.src = url;
        }
    } catch (error) {
        console.error(error);
    }
}

// Event listeners for button actions
Genbtn.addEventListener("click", () => {
    generate();
});

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generate();
    }
});

DownloadBtn.addEventListener("click", () => {
    const imageSrc = image.src;
    if (imageSrc) {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = "generated_image.jpg";
        link.click();
    } else {
        alert("No image to download!");
    }
});

ResetBtn.addEventListener("click", () => {
    inputText.value = "";
    image.src = "";
});
