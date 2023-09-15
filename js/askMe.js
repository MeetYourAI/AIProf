
//........ LLM ChatGpt functionality...........
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask");
const responseDiv = document.getElementById("response");
let forVoice = " ";

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
            'X-RapidAPI-Key': '40d33ba524msh231cad64d36679ep120df2jsn041e8eea61b1',
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
            forVoice = response.data.GPT.replace(regex, ' ');
            const ans = response.data.GPT.replace(regex, '<br>');
            setResponse(ans);
            setIsLoading(false)
            speaker.src = "assets/images/spaker/speaker.svg";
            speaker_container.appendChild(speaker);
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
    if (!MediaRecorder.isTypeSupported('audio/webm')) {
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




// ............Text to speech...........
const synth = window.speechSynthesis;
const inputTxt = document.querySelector("#response");
const voiceSelect = document.querySelector("select");
const speaker_container = document.querySelector("#speaker-container");
const speaker = document.createElement("img");
speaker.alt = "This is a speaker";
let isSpeaking = false;
let voices = [];
const populateVoiceList = () => {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 252 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

voiceSelect.onchange = function () {
  if (synth.speaking) {
    synth.cancel();
  }
  speak();
};

const speak = () => {
  if (inputTxt.innerHTML !== "") {
    const utterThis = new SpeechSynthesisUtterance(forVoice);

    utterThis.onend = function (event) {
      speaker.src = "assets/images/spaker/mutespeaker.svg";
      speaker_container.appendChild(speaker);
      isSpeaking = false;
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.log("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    isSpeaking = true;
  }
  console.log('speaking')
}

const toogle = () => {
  voiceSelect.style.display = 'block';
  speaker.src = "assets/images/spaker/speaker.svg";
  speaker_container.appendChild(speaker);
  if (isSpeaking) {
    synth.cancel();
    speaker.src = "assets/images/spaker/mutespeaker.svg";
    speaker_container.appendChild(speaker);
    isSpeaking = false;
    console.log('stop speaking')
  }
  else {
    speak()
  }
}
speaker.addEventListener('click', toogle)
});