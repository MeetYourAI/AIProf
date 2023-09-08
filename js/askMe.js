document.addEventListener("DOMContentLoaded", () => {
    const questionInput = document.getElementById("question");
    const askButton = document.getElementById("ask");
    const responseDiv = document.getElementById("response");

    const handleAsk = async () => {
        const question = questionInput.value;
        questionInput.innerHTML = " "
        if (question) {
            askButton.innerHTML = '<img id="loading-img" src="assets/images/loading2.svg" width="110" height="20" alt="Loading" />';
            setResponse('Please wait! Response is coming....')
            setIsLoading(true)
            try {
                const url = 'https://open-ai21.p.rapidapi.com/conversationgpt';
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '12865b262bmsh1df342a7a8209adp11946djsned15b0207e45',
                        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
                    },
                    body: JSON.stringify({
                        messages: [
                            {
                                role: 'user',
                                content: question
                            }
                        ]
                    })
                };
                axios
                    .request({
                        url,
                        method: options.method,
                        headers: options.headers,
                        data: options.body
                    })
                    .then((response) => {
                        const regex = /\\n/g;
                        const ans = response.data.GPT.replace(regex, '<br>');
                        setResponse(ans);
                        setIsLoading(false)
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoading(false)
                        setResponse('Something went wrong. Please try again')
                    });
            } catch (error) {
                console.error(error);
                setIsLoading(false)
                setResponse('Something went wrong. Please try again')
            }
        }
    };

    const setResponse = (text) => {
        responseDiv.innerHTML = text;
    };

    const setIsLoading = (isLoading) => {
        console.log("i'm in setIsLoading", isLoading)
        askButton.disabled = isLoading;
        if (isLoading) {
            askButton.style.cursor = 'not-allowed'
        }
        else {
            askButton.innerHTML = 'Ask';
            askButton.style.cursor = 'pointer';
        }
    };

    askButton.onclick = handleAsk
});  