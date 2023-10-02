
//........ LLM ChatGpt functionality...........
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask");
const responseDiv = document.getElementById("response");
let forVoice = " ";


document.addEventListener("DOMContentLoaded", () => {
  let access_token = null;
  let refresh_token = null;
  responseDiv.style.display = "none";
  const handleAsk = () => {
      const question = questionInput.value;
      questionInput.innerHTML = " "
      if (question) {
      askButton.innerHTML = '<img id="loading-img" src="assets/images/loading2.svg" width="110" height="20" alt="Loading" />';
      setResponse('Please wait! Response is coming....')
      setIsLoading(true)

      if (access_token) {
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`,
          };
          const api_url = "https://awesome-terra-400014.lm.r.appspot.com/chat/";
          const data = { "user_input": question };
  
          fetch(api_url, {
              method: "POST",
              headers: headers,
              body: JSON.stringify(data),
          })
          .then((response) => {
              if (response.status === 401) {
                  console.log("I'm in refresh mode", response);
                  refreshAccessToken(refresh_token, makeApiRequest);
              } else {
                  console.log("I'm not in response mode", response);
                  return response.json();
              }
          })
          .then((result) => {
            forVoice = result.chatbot_response;
            const ans = result.chatbot_response;
            setResponse(ans);
            setIsLoading(false)
            // toogle()
          })
          .catch((error) => {
            responseDiv.textContent = "Request failed with an error.";
            setIsLoading(false)
            setResponse('Something went wrong. Please try again')
          });
      } else {
        setIsLoading(false)
        setResponse('No access token found.')
      }
  }};
  
  const refreshAccessToken = (refreshToken, onSuccess) => {
      console.log('Refresh token')
      fetch("https://awesome-terra-400014.lm.r.appspot.com/api/token/refresh/", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
      })
      .then((response) => response.json())
      .then((result) => {
          if (result.access) {
              access_token = result.access;
              onSuccess();
          } else {
            responseDiv.textContent = "Failed to refresh access token.";
          }
      })
      .catch((error) => {
        responseDiv.textContent = "Failed to refresh access token.";
      });
  };
  access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NjMzOTE3LCJpYXQiOjE2OTYyNzM5MTcsImp0aSI6ImQ3MDdjMTI5ZDQwZjRhMjZhMTA4ZjkzODgwOTU1ZGM1IiwidXNlcl9pZCI6MX0.Us98nSq9AWIdcV-6pCAOzaIRYMVhmkYXAxAyorxwUHs';
  refresh_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NjM2MDMxNywiaWF0IjoxNjk2MjczOTE3LCJqdGkiOiJjMWYxMTE2M2Q4Mzg0OGU4OTI2YmQ2NzVjYTY5MjljYSIsInVzZXJfaWQiOjF9.AqCI67puLcsYiWh4_InIwRkgCkOGNdgkunZFMmIIfro';
  
  const setResponse = (text) => {
    responseDiv.style.display = "block";
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
  const openMic = () => {
    mic.style.display = 'inline-block';
    mutedMic.style.display = 'none'
  }

  const muteMic = () => {
    mic.style.display = 'none';
    mutedMic.style.display = 'inline-block'
  }

  let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  let recognizedWords = [];

  const startUsingMicrophone = () => {
    openMic();
    recognition.start();
    recognizedWords = [];
  }

  const closeSocket = () => {
    muteMic()
    recognition.stop();
  }

  recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        recognizedWords.push(event.results[i][0].transcript);
      }
    }
    questionInput.value = recognizedWords.join(' ');
  };

  recognition.onend = function () {
    muteMic()
  };

  recognition.onerror = function (event) {
    muteMic()
    questionInput.value = 'Error occurred in recognition';
  }
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