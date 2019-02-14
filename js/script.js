class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            }
        }
    }
    reset = () => {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }
    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    format = () => {
        let {minutes, seconds, miliseconds} = this.state.times;
        return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`;
    }
    start = () => {
        if (!this.state.running) {
            this.setState({
                running: true,
            })
            setInterval(() => this.step(), 10);
        }
    }
    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }
    calculate = () => {
        this.setState({
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}	
		});
		
		if(this.state.times.miliseconds >= 100){
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			});
		}
		
		if(this.state.times.seconds >= 60){
			this.setState({
				times: {
					minutes: this.state.times.minutes +1,
					seconds: 0, 
					miliseconds: this.state.times.miliseconds 
				}
			});
		}
    }
    stop = () => {
        this.setState({
            running: false,
        })
        clearInterval(() => this.step());
    }
    resetWatch = () => {
        this.stop();
        this.reset();
    }
    render () {
        return (
            <div className = {'container'}>
                <nav>
                    <a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>start</a>
                    <a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => this.stop()}>stop</a>
                    <a href = {'#'} className = {'button'} id = {'clear'} onClick = {() => this.resetWatch()}>Clear</a>
                </nav>
                <div className = {'stopWatch'}>
                    {this.format()}
                </div>			
			</div>
        );
    }
} 

let element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));
