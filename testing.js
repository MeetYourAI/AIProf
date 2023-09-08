    askButton.addEventListener("click", () => {
        const question = questionInput.value;

        if (question) {
            setResponse("Response is coming...");
            askButton.innerHTML = '<img id="loading-img" src="assets/images/loading2.svg" width="110" height="20" alt="Loading" />';
            setIsLoading(true);
            try {
                axios({
                    method: 'post',
                    url: 'https://robomatic-ai.p.rapidapi.com/api',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
                        'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
                    },
                    data: {
                        in: question,
                        op: 'in',
                        cbot: 1,
                        SessionID: 'RapidAPI1',
                        cbid: 1,
                        key: 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP',
                        ChatSource: 'RapidAPI',
                        duration: 1
                    }
                })
                    .then((response) => {
                        setResponse(response.data.out);
                        setIsLoading(false);
                        console.log('sucess, response')
                    })
                    .catch((error) => {
                        setResponse('Sorry, something went wrong. Please try again.');
                        setIsLoading(false);
                        console.log('faild, response', error);
                    });
            }
            catch (error) {
                console.error(error);
                setIsLoading(false)
                setResponse('Something went wrong. Please try again')
            }
        }
    });

    const response = "In twilight's tender, gentle glow,Where dreams in whispered breezes flow,I weave a tapestry of rhyme,A verse to mark this fleeting <br/> time.Beneath the canvas of the night,Stars ignite their beacons bright,They dance in cosmic, graceful streams,A sight that fills our deepest dreams.The moon, a pearl in velvet skies,Reflects in lovers' longing eyes,Its<br/> silver beams, a soft caress,In shadows, we find tenderness.Amidst the chaos and the rush,In nature's beauty, we find hush,A sanctuary for our souls,Where life's <br/>grand tapestry unfolds.With every sunrise, hope<br/> is born,In every heart, a love is sworn,In poetry, we find our<br/> way,To cherish each and every day.So let us savor moments sweet,In verses, <br/> life and love complete,For in this poem, we unite,In beauty's grace, our souls take flight.You can try<br/> our new always-free website: https://chat.acytoo.co Or telegram bot @chatacytoo_botFor developers, you can use <br/> In twilight's tender, gentle glow,Where dreams in whispered breezes flow,I weave a tapestry of rhyme,A verse to mark this fleeting <br/> time.Beneath the canvas of the night,Stars ignite their beacons bright,They dance in cosmic, graceful streams,A sight that fills our deepest dreams.The moon, a pearl in velvet skies,Reflects in lovers' longing eyes,Its<br/> silver beams, a soft caress,In shadows, we find tenderness.Amidst the chaos and the rush,In nature's beauty, we find hush,A sanctuary for our souls,Where life's <br/>grand tapestry unfolds.With every sunrise, hope<br/> is born,In every heart, a love is sworn,In poetry, we find our<br/> way,To cherish each and every day.So let us savor moments sweet,In verses, <br/> life and love complete,For in this poem, we unite,In beauty's grace, our souls take flight.You can try<br/> our new always-free website: https://chat.acytoo.co Or telegram bot @chatacytoo_botFor developers, you can use"