
//........ LLM ChatGpt functionality...........
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask");
const responseDiv = document.getElementById("response");

document.addEventListener("DOMContentLoaded", () => {
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


// ...........mic Related js (Speech Recognition)............
const mic = document.querySelector('#mic')
const mutedMic = document.querySelector('#muteMic')
let socket;
let mediaRecorder;
let lastUserActivityTime;
let activityTimer;

const startUsingMicrophone = () => {
  openMic();
  lastUserActivityTime = Date.now()
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    if (!MediaRecorder.isTypeSupported('audio/webm'))
    {
      muteMic();
      return alert('Browser not supported')
    }
    console.log('In  navigator');
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm',
    })
    socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
      'token',
      'd39b4e9d55390e5e8065a9b69966ff361a3db22d',
    ])
    socket.onopen = () => {
      mediaRecorder.addEventListener('dataavailable', async (event) => {
        if (event.data.size > 0 && socket.readyState == 1) {
          socket.send(event.data)
        }
      })
      mediaRecorder.start(1000)
    }

    socket.onmessage = (message) => {
      const received = JSON.parse(message.data)
      const transcript = received.channel.alternatives[0].transcript
      if (transcript && received.is_final) {
        lastUserActivityTime = Date.now() 
        questionInput.value +=
          transcript + ' '
      }
    }

    socket.onclose = () => {
      console.log({ event: 'onclose' })
    }

    socket.onerror = (error) => {
      questionInput.value = 'Somethign went worng'
      muteMic()
      console.log({ event: 'onerror', error })
    }

    startActivityTimer()
  })
}

const openMic = () => {
  mic.style.display = 'inline-block';
  mutedMic.style.display = 'none'
} 

const muteMic = () => {
  mic.style.display = 'none';
  mutedMic.style.display = 'inline-block'
}

const closeSocket = () => {
  muteMic();
  socket.close();
  mediaRecorder.stop();
  clearInterval(activityTimer);
};

const startActivityTimer = () => {
  activityTimer = setInterval(() => {
    const currentTime = Date.now();
    const inactivityTime = currentTime - lastUserActivityTime;
    if (inactivityTime > 10000) {
      closeSocket();
    }
  }, 1000);
};

mic.addEventListener('click', closeSocket)
mutedMic.addEventListener('click', startUsingMicrophone)
