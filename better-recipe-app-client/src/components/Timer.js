import React, { Component } from 'react';

export default class Timer extends Component {
    state={
        label:this.props.label,
        seconds: this.props.seconds,
        minutes: this.props.minutes,
        hours: this.props.hours,
        startBoolean: true
    }
    componentDidMount() {
        this.countDown()
    }

    startStop = () => {
        this.setState({
            startBoolean:!this.state.startBoolean
        })
        setTimeout(()=> {
            if(this.state.startBoolean===true) {
            this.countDown()
            }
        }, 1 )
    }
    reset = () => {
        this.setState({
            seconds: this.props.seconds,
            minutes: this.props.minutes,
            hours: this.props.hours,
            startBoolean:false
        })

    }
    countDown = () => {
        setTimeout(()=> {
            if(this.state.startBoolean===false) {
                return
            }

            if (this.state.seconds===0) {
                this.setState({
                    seconds:59,
                    minutes: (this.state.minutes===0&&this.state.hours>0)?
                    59:(this.state.minutes===0 ? 0 : (this.state.minutes-1)),
                    hours:(this.state.hours>0 && this.state.minutes===0)?this.state.hours-1:this.state.hours
                })
            } else {
                this.setState({
                seconds:this.state.seconds-1
            })
        }
        if (this.state.seconds===0&&this.state.minutes===0&&this.state.hours===0){
            console.log("ring! timer done")
            return
        }
            this.countDown()
        }, 1000)

    }

    render () {
        return (
            <div>
                <h2>{this.state.label}</h2>
                <h2>{this.state.hours}</h2>
                <h2>{this.state.minutes}</h2>
                <h2>{this.state.seconds}</h2>
                <button onClick={this.startStop} className='action'>
                    {this.state.startBoolean===true?'Stop':'Start'}
                </button>
                <button onClick={this.reset} className='action'>
                    Reset
                </button>

            </div>
        )
    }
}
