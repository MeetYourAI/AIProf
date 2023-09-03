import React from 'react';

interface MyComponentProps {
    text: string; 
}
const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
    const textWithLineBreaks = text;
    console.log('the text is', text)

    return (
      <div className='text-black'>
        {textWithLineBreaks.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  };

// const MyComponent = () => {
//   const textWithLineBreaks = `In the golden light of a radiant dawn,\nWhere dreams take flight and hopes are born,\nI'll weave for you a tapestry divine,\nA poem to make your heart entwine.\n\nThe sun whispers secrets in the gentle breeze,\nAs nature dances among the swaying trees.\nEach flower blooms with vibrant grace,\nPainting colors upon life's canvas space.\n\nOh, how the stars shimmer in the night's embrace,\nLike diamonds scattered across celestial lace.\nTheir distant glow, a celestial guide,\nLeading us on an endless cosmic tide.\n\nWhen raindrops fall, they serenade the earth,\nA symphony of nature's miraculous birth.\nThey cleanse the wounds of a weary soul,\nHealing the scars that time can't control.\n\nLove's tender touch, a symphony of bliss,\nA melody that resonates with eternal kiss.\nTwo souls entwined in harmonious tune,\nUnited forever under the radiant moon.\n\nSo let this poem be a token of my heart,\nA work of art, a moment's gentle start.\nMay its words paint a smile upon your face,\nAnd fill your world with love and grace.`;

//   return (
//     <div className='text-black'>
//       {textWithLineBreaks.split('\n').map((line, index) => (
//         <React.Fragment key={index}>
//           {line}
//           <br />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

export default MyComponent;
