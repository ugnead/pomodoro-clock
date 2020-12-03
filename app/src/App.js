import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const audio = document.getElementById('beep');

        class App extends React.Component {
          constructor(props) {
            super(props);
            this.loop = undefined;
          }
          
          state = {
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: 'Session',
            loop: undefined,
            isPlaying: false
          }
          
          handleBreakDecrease = () => {
            const {breakCount, isPlaying, currentTimer} = this.state;
            if(breakCount > 1) {
              if(!isPlaying && currentTimer === 'Break') {
                this.setState({
                breakCount: breakCount - 1,
                  clockCount: (breakCount - 1) * 60
                });
              } else {
                this.setState({
                  breakCount: breakCount - 1,
                });
              }
            }
          }
          
          handleBreakIncrease = () => {
            const {breakCount, isPlaying, currentTimer} = this.state;
            if(breakCount < 60) {
              if(!isPlaying && currentTimer === 'Break') {
                this.setState({
                breakCount: breakCount + 1,
                  clockCount: (breakCount + 1) * 60
                });
              } else {
                this.setState({
                  breakCount: breakCount + 1,
                });
              }
            }
          }
          
          handleSessionDecrease = () => {
            const {sessionCount, isPlaying, currentTimer} = this.state;
            if(sessionCount > 1) {
              if(!isPlaying && currentTimer === 'Session') {
                this.setState({
                sessionCount: sessionCount - 1,
                  clockCount: (sessionCount - 1) * 60
                });
              } else {
                this.setState({
                  sessionCount: sessionCount - 1,
                });
              }
            }
          }
          
          handleSessionIncrease = () => {
            const {sessionCount, isPlaying, currentTimer} = this.state;
            
            if(sessionCount < 60) {
              if(!isPlaying && currentTimer === 'Session') {
                this.setState({
                sessionCount: sessionCount + 1,
                  clockCount: (sessionCount + 1) * 60
                });
              } else {
                this.setState({
                  sessionCount: sessionCount + 1,
                });
              }
            }
          }

          handlePlayPause = () => {
            const {isPlaying} = this.state;
            
            if(isPlaying) {
              clearInterval(this.loop);
              this.setState({
                isPlaying: false
              });
            } else {
              this.setState({
                isPlaying: true
              });
              
              this.loop = setInterval(() => {
                const { clockCount, 
                       currentTimer, 
                       breakCount, 
                       sessionCount
                      } = this.state;
                
                if(clockCount === 0) {
                  this.setState({
                    currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
                    clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
                  });
                  
                  audio.play();
                  console.log(audio);
                  
                } else {
                  this.setState({
                    clockCount: clockCount - 1
                  });
                }
              }, 1000);
            }
          }
          
          handleReset = () => {
            this.setState({
              breakCount: 5,
              sessionCount: 25,
              clockCount: 25 * 60,
              currentTimer: 'Session',
              isPlaying: false
            });
            
            clearInterval(this.loop);
            
            audio.pause();
            audio.currentTime = 0;
          }
          
          componentWillUnmount() {
            clearInterval(this.loop);
          }
          
          convertToTime = (count) => {
            let minutes = Math.floor(count / 60);
            let seconds = count % 60;
            
            minutes = minutes < 10 ? ('0'+ minutes) : minutes;
            seconds = seconds < 10 ? ('0'+ seconds) : seconds;
            
            return `${minutes}:${seconds}`;
          }
          
        render() {
          const { breakCount,
                  sessionCount, 
                  clockCount,
                  currentTimer,
                  isPlaying
                } = this.state;
          
          const breakProps = {
            title: 'Break',
            count: breakCount,
            handleDecrease: this.handleBreakDecrease,
            handleIncrease: this.handleBreakIncrease
          }
          
          const sessionProps = {
            title: 'Session',
            count: sessionCount,
            handleDecrease: this.handleSessionDecrease,
            handleIncrease: this.handleSessionIncrease
          }
          
          return(
            <div className="wrapper d-flex justify-content-center align-items-center">
              <div className="box col-md-8 text-center m-4 rounded-lg">
                <div className='clock-container'>
                  <h1 id='timer-label'>{currentTimer}</h1>
                  <div>
                    <span id='time-left'>{this.convertToTime(clockCount)}</span>
                    
                    <button id='start_stop' onClick={this.handlePlayPause}>
                      <i className={`icon fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
                    </button>
                    
                    <button  id='reset' onClick={this.handleReset}>
                      <i className='icon fas fa-sync'></i>
                    </button>
                  </div>
                </div>
                <div className='d-flex justify-content-around'>
                  <SetTimer {...breakProps} />
                  <SetTimer {...sessionProps} />
                </div>
              </div>
            </div>
          );
         }
        }
        
        const SetTimer = (props) => {
          const id = props.title.toLowerCase();
          return (
            <div className='timer-container'>
              <h1 id={`${id}-label`}>{props.title} Length</h1>
              <div>
                <button id={`${id}-decrement`} onClick={props.handleDecrease}>
                  <i className='fas fa-minus'></i>
                </button>
                
                <span id={`${id}-length`}>{props.count}</span>
                 
                <button id={`${id}-increment`} onClick={props.handleIncrease}>
                  <i className='fas fa-plus'></i>
                </button>
              </div>
            </div>
          );
        }

export default App;
