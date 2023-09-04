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