document.addEventListener("DOMContentLoaded", () => {
    const imageForm = document.getElementById("imageForm");
    const inputText = document.getElementById("inputText");
    const generatedImage = document.getElementById("generatedImage");
    const Api = "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";

    imageForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const text = inputText.value.trim();

        if (!text) {
            alert("Please enter text.");
            return;
        }

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Api}`
                    },
                    body: JSON.stringify({ inputs: text }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch image.");
            }

            const blob = await response.blob();
            const imageURL = window.URL.createObjectURL(blob);
            generatedImage.src = imageURL;
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while generating the image.");
        }
    });
});
