import React, { useState, useEffect } from 'react';

const ScrambleTextComponent = () => {
  const [scrambledText, setScrambledText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [speed, setSpeed] = useState(1); // 초기 속도: 1

  useEffect(() => {
    const originalText = `
    test start : 2023-11-05 19:38:21.987013+09:00
test start : 2023-11-05 19:49:11.509581+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 19:55:03.963213+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 19:57:04.063109+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 19:58:05.016008+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 19:59:10.882472+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 20:00:11.480922+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 20:02:36.196146+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 20:03:03.117589+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 20:07:53.785139+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________
test start : 2023-11-05 22:17:25.703331+09:00
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #
=================================================================
 inception_resnet_v2 (Funct  (None, 1536)              54336736
 ional)

 dense (Dense)               (None, 2048)              3147776

 dense_1 (Dense)             (None, 7)                 14343

=================================================================
Total params: 57498855 (219.34 MB)
Trainable params: 57438311 (219.11 MB)
Non-trainable params: 60544 (236.50 KB)
_________________________________________________________________

    `;

    const scrambleText = () => {
      const words = originalText.split(' ');
      const scrambledWords = words.map(word => {
        if (Math.random() < 0.5) {
          return word.split('').sort(() => 0.5 - Math.random()).join('');
        } else {
          return word;
        }
      });
      return scrambledWords.join(' ');
    };

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < originalText.length) {
        setDisplayedText(prevText => prevText + originalText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 20 / speed);

    setTimeout(() => {
      const scrambleIntervalId = setInterval(() => {
        setScrambledText(scrambleText());
      }, 100 / speed);

      return () => clearInterval(scrambleIntervalId);
    }, originalText.length * 20 / speed);

    return () => clearInterval(intervalId);
  }, [speed]);

  const handleSpeedChange = event => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
  };

  return (
    <div>
      <div className="black-screen">
        <div className="scrambled-text-container">
          <div className="displayed-text">{displayedText}</div>
          <div className="scrambled-text">{scrambledText}</div>
        </div>

        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <input
            type="range"
            id="speed"
            name="speed"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
          />
          <span>{speed.toFixed(1)}</span>
        </div>
      </div>
    </div>

  );
};

export default ScrambleTextComponent;
