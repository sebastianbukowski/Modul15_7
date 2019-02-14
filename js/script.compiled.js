'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
    _inherits(StopWatch, _React$Component);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

        _this.reset = function () {
            _this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        };

        _this.pad0 = function (value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        };

        _this.format = function () {
            var _this$state$times = _this.state.times,
                minutes = _this$state$times.minutes,
                seconds = _this$state$times.seconds,
                miliseconds = _this$state$times.miliseconds;

            return _this.pad0(minutes) + ':' + _this.pad0(seconds) + ':' + _this.pad0(Math.floor(miliseconds));
        };

        _this.start = function () {
            if (!_this.state.running) {
                _this.setState({
                    running: true
                });
                setInterval(function () {
                    return _this.step();
                }, 10);
            }
        };

        _this.step = function () {
            if (!_this.state.running) return;
            _this.calculate();
        };

        _this.calculate = function () {
            _this.setState({
                times: {
                    minutes: _this.state.times.minutes,
                    seconds: _this.state.times.seconds,
                    miliseconds: _this.state.times.miliseconds + 1
                }
            });

            if (_this.state.times.miliseconds >= 100) {
                _this.setState({
                    times: {
                        minutes: _this.state.times.minutes,
                        seconds: _this.state.times.seconds + 1,
                        miliseconds: 0
                    }
                });
            }

            if (_this.state.times.seconds >= 60) {
                _this.setState({
                    times: {
                        minutes: _this.state.times.minutes + 1,
                        seconds: 0,
                        miliseconds: _this.state.times.miliseconds
                    }
                });
            }
        };

        _this.stop = function () {
            _this.setState({
                running: false
            });
            clearInterval(function () {
                return _this.step();
            });
        };

        _this.resetWatch = function () {
            _this.stop();
            _this.reset();
        };

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(StopWatch, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'nav',
                    null,
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'start', onClick: function onClick() {
                                return _this2.start();
                            } },
                        'start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop', onClick: function onClick() {
                                return _this2.stop();
                            } },
                        'stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'clear', onClick: function onClick() {
                                return _this2.resetWatch();
                            } },
                        'Clear'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopWatch' },
                    this.format()
                )
            );
        }
    }]);

    return StopWatch;
}(React.Component);

var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));
