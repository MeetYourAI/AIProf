'use client'
import React, { useState } from 'react';
import axios from 'axios';

const AskMe = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const handleAsk = async () => {
    try {
      const url = 'https://open-ai21.p.rapidapi.com/conversationgpt';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
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
          console.log('the response.GPT is', response.data.GPT);
          console.log('the type of response.GPT is', typeof (response.data.GPT));
          const regex = /\\n/g;
          const ans = response.data.GPT.replace(regex, '<br>');
          console.log('the ANS IS', ans);
          setResponse(ans);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }

    // setResponse("**Whispers of the Wind**\n\nIn a world where chaos reigns,\nAmidst the trials and storms that drain,\nThere lies a gentle whisper of the wind,\nA tranquil melody on which we transcend.\n\nThrough forests dense and rivers wide,\nThe wind carries secrets unspoken, untied,\nIt weaves through valleys and mountain peaks,\nA soothing touch that brings solace, it seeks.\n\nIn whispered verses, stories are told,\nOf far-off lands, of legends of old,\nEach gust carries the echoes of time,\nA symphony of whispers, both gentle and sublime.\n\nIt dances through meadows, fields so green,\nCaressing the flowers, painting a serene scene,\nThe wind's gentle touch, a tender embrace,\nAs it carries the fragrance of nature's grace.\n\nIt whispers to the leaves as they sway,\nSharing secrets of night and day,\nIt sings to the birds as they take flight,\nGuiding them through the darkness of the night.\n\nFrom ocean waves crashing against shore,\nTo sandy dunes standing tall and more,\nThe wind whispers of journeys yet to be,\nInstilling in us a sense of wanderlust, wild and free.\n\nIt carries our dreams to distant lands,\nFilling our hearts with hopes and plans,\nIn its gentle whispers, we find solace,\nA reminder that even in chaos, there is a place.\n\nSo pause for a moment and listen well,\nTo the whispers of the wind's ancient spell,\nLet it transport you to a world unseen,\nWhere dreams flourish and hearts convene.");
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center border-b border-gray-300 ">
        <input
          type="text"
          className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 "
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="px-4 py-2  rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAsk}
          style={{
            background: 'radial-gradient(#01471e, #000000)',
          }}
        >
          Ask
        </button>
      </div>
      <div style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: response }} />

    </div>
  );
};

export default AskMe;
