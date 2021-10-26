import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss"
import { Header } from "./header.js"
import { Footer } from "./footer.js";


class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            lapReset: 'disabled',
            lapResetTxt: 'lap',
            startStop: 'start',
            startStopTxt: 'start',
            lapList: ["", "", "", "", ""],
            lapIndex: 0,
            counter: {
                elapsedTimeMS: 0,
                startTime: 0,
                milisecond: '00',
                second: '00',
                minute: '00',
                hour: '00',
                day: '00'
            }
        };
        this.counter = null;
    }

    toggleStartStop() {
        this.setState((state) => {
            // startCounting()
            if (!state.active && state.lapReset === 'disabled') {
                //enable button lap and start the counting
                this.startCounting()
                return {
                    lapReset: 'lap',
                    lapResetTxt: 'lap',
                    startStop: "stop",
                    startStopTxt: "stop",
                    active: true
                }
            }
            else if (state.active && state.lapReset === 'lap') {
                // enable button reset and stop the counting
                clearInterval(this.counter)
                return {
                    lapReset: 'reset',
                    lapResetTxt: 'reset',
                    startStop: 'disabled',
                    startStopTxt: 'start',
                    active: false
                }
            }
            else if (state.active && state.lapReset === 'lap' && state.startStop === "stop") {
                return {
                    startStop: 'disabled',
                    startStopTxt: 'start'
                }
            }
        });
    }
    w


    startCounting() {
        this.state.counter.startTime = Date.now();
        this.counter = setInterval(() => {
            if (this.state.active) {                    // clear interval funkcija za da ne se zamarat processorot
                this.setState((state) => ({             // so mala zagrada vrakjat eden objekt ustvari ovde e state na komponentata
                    counter: {
                        ...state.counter,
                        elapsedTimeMS: (Date.now() - state.counter.startTime),
                        milisecond: ("0" + (parseInt(state.counter.elapsedTimeMS / 10) % 100)).slice(-2),
                        second: ("0" + (parseInt(state.counter.elapsedTimeMS / 1000) % 60)).slice(-2),
                        minute: ("0" + (parseInt(state.counter.elapsedTimeMS / 60000) % 60)).slice(-2),
                        hour: ("0" + (parseInt(state.counter.elapsedTimeMS / 3600000) % 24)).slice(-2),
                        day: ("0" + (parseInt(state.counter.elapsedTimeMS / 3600000) % 365)).slice(-3),
                    }
                }))
            }
        }, 10);
    }

    handleLap() {
        if (this.state.active) {
            let lapTime = [this.state.counter.day, ':', this.state.counter.hour, ':', this.state.counter.minute, ':', this.state.counter.second, ':', this.state.counter.milisecond]
            this.componentDidMount(lapTime)
        }
    }

    componentDidMount(lapTime) {
        this.setState((state) => {
            state.lapList.length = 4
            state.lapList.unshift(lapTime)
            state.lapIndex = (this.state.lapList.indexOf(lapTime) + 1)
        });

    }

    toggleLapReset() {
        if (this.state.active && this.state.lapReset === 'lap') {
            // write current value of the counter in th lap lines
            this.handleLap()
        }
        else if (!this.state.active && this.state.lapReset === 'reset') {
            // reset the buttons the counter and the lap lines
            this.handleLap()
            this.setState((state) => {
                return {
                    counter: {
                        ...state.counter,
                        startTime: 0,
                        milisecond: '00',
                        second: '00',
                        minute: '00',
                        hour: '00',
                        day: '00'
                    },
                    lapList: ["", "", "", "", ""],
                    lapReset: 'disabled',
                    lapResetTxt: 'lap',
                    startStop: 'start',
                    startStopTxt: 'start',
                    active: false,
                    lapIndex: 0
                }
            });
        }
    }

    render() {
        return (
            <div className="container" >
                <div className="container__counter">
                    <span id="day">{this.state.counter.day}</span> d :  <span id="hour">{this.state.counter.hour}</span> h : <span id="minute">{this.state.counter.minute}</span> m : <span id="second">{this.state.counter.second}</span> s : <span id="hundred">{this.state.counter.milisecond}</span><span> ms </span>
                </div>
                <div className="d-flex">
                    <button className={`btn btn--${this.state.startStop}`} onClick={() => this.toggleStartStop()}>{this.state.startStopTxt}</button>
                    <ul className="container__lapList" >
                        {this.state.lapList.map((listItem, index) => (
                            <li key={index} className="container__lapList--lap">
                                {listItem}
                            </li>
                        ))}
                    </ul>
                    < button className={`btn btn--${this.state.lapReset}`} onClick={() => this.toggleLapReset()}> {this.state.lapResetTxt}</button >
                </div >
                <div className="saved-lap" ></div>
            </div >
        );
    }
}

class Stopwatch extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Counter />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById("root"))