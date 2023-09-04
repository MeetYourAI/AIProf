'use client'
import React, { useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import LoadingDots from './loadingAnimation';

const AskMe = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleAsk = async () => {
    setQuestion('')
    setResponse('Response is coming....')
    setIsLoading(true)
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
  };

  // const handleAsk = () => {
  //   try {
  //     setQuestion('')
  //     setResponse('Response is coming....')
  //     setIsLoading(true)
  //     const encodedParams = new URLSearchParams();
  //     const ques = question 
  //     encodedParams.set('in', ques);
  //     encodedParams.set('op', 'in');
  //     encodedParams.set('cbot', '1');
  //     encodedParams.set('SessionID', 'RapidAPI1');
  //     encodedParams.set('cbid', '1');
  //     encodedParams.set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP');
  //     encodedParams.set('ChatSource', 'RapidAPI');
  //     encodedParams.set('duration', '1');
  
  //     const options = {
  //       method: 'POST',
  //       url: 'https://robomatic-ai.p.rapidapi.com/api',
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //         'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
  //         'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
  //       },
  //       data: encodedParams,
  //     };
  
  //     axios
  //       .request(options)
  //       .then((response) => {
  //         setResponse(response.data.out);
  //         setIsLoading(false)
  //       })
  //       .catch((error) => {
  //         setResponse('Sorry some went wrong. Please try again')
  //         setIsLoading(false)
  //       });
  
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }   

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
          disabled={isLoading}
        >
          {isLoading ? <Image src={"/images/loading2.svg"} width={110} height={20} alt='this is a loading animation' /> : "Ask"}
          
        </button>
      </div>
      {response && <div className='mt-6' style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: response }} />}
      
    </div>
  );
};

export default AskMe;
