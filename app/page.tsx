"use client";
import { useRef, useState, useEffect } from 'react'
import { Howl, Howler } from 'howler';
import Countdown, { CountdownTimeDelta } from 'react-countdown';
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import PhotoAlbum from "react-photo-album";
import photos from "./photos";
import useExitPrompt from "./useExitPrompt.js";
import { CountdownTimeDeltaFn } from 'react-countdown/dist/Countdown';

type ScoreProps = {
  value: number;
};

type AddPointsProps = {
  classes: string;
  inc: number;
  onClick: () => void;
}

type StyleProps = {
  style: object
}

type CommonProps = {
  classes: string;
  value: string;
  onClick: () => void;
}

const Score: React.FC<ScoreProps> = ({ value }) => {
  return <p className="score text-center">{value}</p>;
}

const AddPoints: React.FC<AddPointsProps> = ({ classes, inc, onClick }) => {
  return <button className={classes} onClick={onClick}>{inc}pts</button>;
}

const FunnyEvent: React.FC<CommonProps> = ({ classes, value, onClick }) => {
  return <button className={classes} onClick={onClick}>{value}</button>;
}

const MuteUnmute: React.FC<CommonProps> = ({ classes, value, onClick }) => {
  return <button className={classes} onClick={onClick}>{value}</button>;
}

const TributeImage: React.FC<CommonProps & StyleProps> = ({ classes, value, onClick, style }) => {
  return <img className={classes} src={value} style={style} onClick={onClick} />;
}

export default function Scoreboard() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const officialEndDatetime = Date.UTC(2026, 4, 30, 17, 0, 0); // (months 0 based)
  //const officialEndDatetime = Date.now() + 5000;
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(true);
  const [showImage, setShowImage] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);

  const ref = useRef<FireworksHandlers>(null)

  // Écouter les changements de taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculer la hauteur des photos en fonction de la largeur
  const photoRowHeight = windowWidth < 480 ? 80 : windowWidth < 768 ? 100 : 120;

  // Charger les scores au montage du composant
  useEffect(() => {
    const savedScoreBlue = localStorage.getItem('scoreBlue');
    const savedScoreRed = localStorage.getItem('scoreRed');
    console.log('Loading from localStorage:', { scoreBlue: savedScoreBlue, scoreRed: savedScoreRed });
    if (savedScoreBlue !== null) setScoreBlue(Number(savedScoreBlue));
    if (savedScoreRed !== null) setScoreRed(Number(savedScoreRed));
    setIsLoaded(true);
  }, []);

  // Sauvegarder les scores dans localStorage à chaque changement
  useEffect(() => {
    if (isLoaded) {
      console.log('Saving to localStorage:', { scoreBlue, scoreRed });
      localStorage.setItem('scoreBlue', scoreBlue.toString());
      localStorage.setItem('scoreRed', scoreRed.toString());
    }
  }, [scoreBlue, scoreRed, isLoaded]);

  function onTick(countdownTimeDelta: CountdownTimeDelta) {
    if (countdownTimeDelta.days === 0 && countdownTimeDelta.hours === 0 && countdownTimeDelta.minutes <= 2 && countdownTimeDelta.seconds <= 2) {
      setShowImage(true)
    }
  }

  function fireworks() {
    if (!ref.current) return;
    if (ref.current.isRunning) {
      ref.current.stop();
    } else {
      ref.current.updateSize({
        height: window.outerHeight,
        width: window.outerWidth
      });
      ref.current.start();
    }
  }

  function incScore(inc: number, score: number, setScore: any): void {
    setScore(Math.max(0, score + inc));
  }

  function toggleSound() {
    setIsMuted(!isMuted);
    if (!isMuted) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
  }

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  function playSong(song: string, random: boolean = false) {
    if (random) {
      song += '-' + getRandomInt(2)
    }
    var sound = new Howl({
      src: [song + '.mp3'],
      html5: true
    });

    if (!isMuted) {
      if (soundIsPlaying) {
        Howler.stop();
        setSoundIsPlaying(false);
      }
      sound.play();
      setSoundIsPlaying(true);
      sound.on('end', function () {
        setSoundIsPlaying(false);
      });
    }
  }

  function resetScores() {
    setScoreBlue(0);
    setScoreRed(0);
    localStorage.removeItem('scoreBlue');
    localStorage.removeItem('scoreRed');
  }

  return (
    <>
      <div className="container-fluid h-100 diagonal-split-background">
        <div className="row time">
          <Countdown date={officialEndDatetime} daysInHours={true} onComplete={fireworks} onTick={(e => onTick(e))} />
        </div>
        <div className="row" id="score">
          <div className="col bk-black">
            <Score value={scoreBlue} />
          </div>
          <div className="col bk-white">
            <Score value={scoreRed} />
          </div>
        </div>
        <div className="row">
          <PhotoAlbum layout="rows" photos={photos} spacing={3} targetRowHeight={photoRowHeight} />
        </div>
        <div className="row controls fixed bottom-10 left-0 w-full">
          <div className="btn-group" role="group">
            <FunnyEvent classes={'btn btn-light'} value={'🙈 airball'} onClick={() => playSong('airball')} />
            <FunnyEvent classes={'btn btn-light'} value={"🇺🇸 l'américain"} onClick={() => playSong('usa', true)} />
            <FunnyEvent classes={'btn btn-light'} value={'💥 kaboom'} onClick={() => playSong('kaboom', true)} />
            <FunnyEvent classes={'btn btn-light'} value={'🙅‍♂️ no good'} onClick={() => playSong('no-good')} />
            <FunnyEvent classes={'btn btn-light'} value={'🔥 on fire'} onClick={() => playSong('on-fire')} />
            <FunnyEvent classes={'btn btn-light'} value={'too easy'} onClick={() => playSong('too-easy')} />
            <FunnyEvent classes={'btn btn-light'} value={'🫨 wild shot'} onClick={() => playSong('wild-shot')} />
            <FunnyEvent classes={'btn btn-light'} value={'🎉 tada'} onClick={() => playSong('tada')} />
            <FunnyEvent classes={'btn btn-light'} value={'📯 horn'} onClick={() => playSong('horn')} />

            <MuteUnmute classes={'btn btn-light'} value="🔇 mute/unmute" onClick={toggleSound} />
          </div>
        </div>
        <div className="row bg-gray-800 text-white fixed bottom-0 left-0 w-full">
          <div className="col">
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreBlue, setScoreBlue) }} />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreBlue, setScoreBlue) }} />
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreBlue, setScoreBlue) }} />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreBlue, setScoreBlue) }} />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreRed, setScoreRed) }} />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreRed, setScoreRed) }} />
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreRed, setScoreRed) }} />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreRed, setScoreRed) }} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <button onClick={resetScores}>🔄 Reset</button>
        </div> */}
      </div>
    </>
  );
}
