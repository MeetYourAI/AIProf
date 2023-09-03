// const axios = require('axios');

// const url = 'https://open-ai21.p.rapidapi.com/conversationgpt';
// const options = {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
//     'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
//   },

//   body: JSON.stringify({
//     messages: [
//       {
//         role: 'user',
//         content: 'hello'
//       }
//     ]
//   })
// };

// axios
//   .request({
//     url,
//     method: options.method,
//     headers: options.headers,
//     data: options.body
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });







import React from 'react';

  const textWithLineBreaks = "**Whispers of the Wind**\n\nIn a world where chaos reigns,\nAmidst the trials and storms that drain,\nThere lies a gentle whisper of the wind,\nA tranquil melody on which we transcend.\n\nThrough forests dense and rivers wide,\nThe wind carries secrets unspoken, untied,\nIt weaves through valleys and mountain peaks,\nA soothing touch that brings solace, it seeks.\n\nIn whispered verses, stories are told,\nOf far-off lands, of legends of old,\nEach gust carries the echoes of time,\nA symphony of whispers, both gentle and sublime.\n\nIt dances through meadows, fields so green,\nCaressing the flowers, painting a serene scene,\nThe wind's gentle touch, a tender embrace,\nAs it carries the fragrance of nature's grace.\n\nIt whispers to the leaves as they sway,\nSharing secrets of night and day,\nIt sings to the birds as they take flight,\nGuiding them through the darkness of the night.\n\nFrom ocean waves crashing against shore,\nTo sandy dunes standing tall and more,\nThe wind whispers of journeys yet to be,\nInstilling in us a sense of wanderlust, wild and free.\n\nIt carries our dreams to distant lands,\nFilling our hearts with hopes and plans,\nIn its gentle whispers, we find solace,\nA reminder that even in chaos, there is a place.\n\nSo pause for a moment and listen well,\nTo the whispers of the wind's ancient spell,\nLet it transport you to a world unseen,\nWhere dreams flourish and hearts convene.";



  textWithLineBreaks.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))




    // const handleAsk = () => {
  //   try {
  //     console.log('the question is', question);
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
  //         console.log(response.data.out);
  //         setResponse(response.data.out);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  setResponse("**Nature's Symphony**\n\nIn the stillness of dawn's tender light,\nWhere shadows dance and dreams take flight.\nNature awakens with purest grace,\nA symphony of beauty to embrace.\n\nThe golden sun ignites the sky,\nPainting colors that never die.\nWith every hue, a masterpiece,\nA miracle of earth's release.\n\nWhispering leaves, in gentle breeze,\nDancing with the ancient trees.\nSinging symphonies of tranquil peace,\nTheir melodies a sweet release.\n\nThe river hums a lullaby,\nAs it cascades, flowing by.\nIts waters shimmer, crystal clear,\nReflecting heavens, ever near.\n\nThe flowers bloom with vibrant zeal,\nTheir fragrance a balm to deeply heal.\nPetals kissed by the morning dew,\nNature's bouquet, an enchanting view.\n\nThe birds take flight, on graceful wing,\nTheir songs of joy, they sweetly sing.\nTheir melodies, like music in the air,\nFilling hearts with love and care.\n\nAs day fades into twilight's embrace,\nStars adorn the sky, with radiant grace.\nMoonlight weaves its gentle spell,\nInspiring dreams, where secrets dwell.\n\nOh, nature's symphony, so divine,\nAn ode to life, a sacred shrine.\nA gift bestowed, for all to see,\nA masterpiece of serenity.\n\nSo let us cherish nature's grace,\nProtect this sacred, wondrous place.\nFor in its beauty, we find rebirth,\nA harmony that heals the earth.")