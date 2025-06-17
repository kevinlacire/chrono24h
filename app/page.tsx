"use client";
import { useRef, useState } from 'react'
import {Howl, Howler} from 'howler';
import Countdown from 'react-countdown';
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
import PhotoAlbum from "react-photo-album";
import photos from "./photos";

type ScoreProps = {
  value: number;
};

type AddPointsProps = {
  classes: string;
  inc: number;
  onClick: () => void;
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

export default function Scoreboard() {
  const [scoreBlue, setScoreBlue] = useState(0);
  const [scoreRed, setScoreRed] = useState(0);
  const officialEndDatetime = Date.UTC(2025, 5, 27, 17, 0, 0); // (months 0 based)
  //const officialEndDatetime = Date.now() + 3000;
  
  const [isMuted, setIsMuted] = useState(false);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  
  const ref = useRef<FireworksHandlers>(null)

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
      song+='-'+getRandomInt(2)
    }
    console.log(song + '.mp3');
    var sound = new Howl({
      src: [song + '.mp3'],
      html5: true
    });

    if (!soundIsPlaying && !isMuted) {
      sound.play();
      setSoundIsPlaying(true);
      sound.on('end', function(){
        setSoundIsPlaying(false);
      });
    }
  }

  return (
    <>
      <div className="container-fluid h-100 diagonal-split-background">
        <div className="row time">
          <Countdown date={officialEndDatetime} daysInHours={true} onComplete={fireworks} />
        </div>        
        <div className="row h-100">
          <div className="col bk-black">
            <Score value={scoreBlue} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreBlue, setScoreBlue) ; playSong('coin-mario-2pts') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreBlue, setScoreBlue) ; playSong('coin-mario-3pts') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreBlue, setScoreBlue) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreBlue, setScoreBlue) } } />
              </div>
            </div>
          </div>
          <div className="col bk-white">
            <Score value={scoreRed} />
            <div className="row controls">
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-success'} inc={+2} onClick={() => { incScore(2, scoreRed, setScoreRed) ; playSong('coin-mario-2pts') } } />
                <AddPoints classes={'btn btn-outline-success'} inc={+3} onClick={() => { incScore(3, scoreRed, setScoreRed) ; playSong('coin-mario-3pts') } } />
              </div>
              <div className="btn-group" role="group">
                <AddPoints classes={'btn btn-outline-danger'} inc={-2} onClick={() => { incScore(-2, scoreRed, setScoreRed) } } />
                <AddPoints classes={'btn btn-outline-danger'} inc={-3} onClick={() => { incScore(-3, scoreRed, setScoreRed) } } />
              </div>
            </div>
          </div>
          <div className="row">
            <PhotoAlbum layout="rows" photos={photos} spacing={5} targetRowHeight={150} />
          </div>
          <div className="row controls">
            <div className="btn-group" role="group">
              <FunnyEvent classes={'btn btn-light'} value={'🙈 airball'} onClick={() => playSong('airball')} />
              <FunnyEvent classes={'btn btn-light'} value={"🇺🇸 l'américain"} onClick={() => playSong('usa', true)} />
              <FunnyEvent classes={'btn btn-light'} value={'💥 kaboom'} onClick={() => playSong('kaboom', true)} />
              <FunnyEvent classes={'btn btn-light'} value={'🙅‍♂️ no good'} onClick={() => playSong('no-good')} />
              <FunnyEvent classes={'btn btn-light'} value={'🔥 on fire'} onClick={() => playSong('on-fire')} />
              <FunnyEvent classes={'btn btn-light'} value={'too easy'} onClick={() => playSong('too-easy')} />
              <FunnyEvent classes={'btn btn-light'} value={'🫨 wild shot'} onClick={() => playSong('wild-shot')} />

              <MuteUnmute classes={'btn btn-light'} value="🔇 mute/unmute" onClick={toggleSound} />
            </div>
          </div>
        </div>        
      </div>
      <Fireworks
        ref={ref}
        autostart={false}
        options={{ opacity: 0.5 }}
        style={{
          top: 0,
          left: 0,
          position: 'fixed',
          background: 'transparent'
        }}
      />
    </>
  );
}
