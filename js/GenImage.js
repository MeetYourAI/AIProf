document.addEventListener("DOMContentLoaded", () => {
    const imageForm = document.getElementById("imageForm");
    const inputText = document.getElementById("inputText");
    const generatedImage = document.getElementById("generatedImage");
    const Api = "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";
    const imageSubmitButton = document.getElementById("image-submit");

    imageForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const text = inputText.value.trim();

        if (!text) {
            alert("Please enter text.");
            return;
        }

        imageSubmitButton.innerHTML = '<img id="loading-img" src="assets/images/loading2.svg" width="110" height="20" alt="Loading" />';
        setIsLoading(true)

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
                setIsLoading(false)
                throw new Error("Failed to fetch image.");
            }

            const blob = await response.blob();
            const imageURL = window.URL.createObjectURL(blob);
            generatedImage.src = imageURL;
            setIsLoading(false)
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false)
            alert("An error occurred while generating the image.");
        }
    });

    const setIsLoading = (isLoading) => {
        imageSubmitButton.disabled = isLoading;
        if (isLoading) {
            imageSubmitButton.style.cursor = 'not-allowed'
        }
        else {
            imageSubmitButton.innerHTML = 'Submit';
            imageSubmitButton.style.cursor = 'pointer';
        }
      };
});
