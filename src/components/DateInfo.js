import React, {Component} from 'react';
import './DateInfo.css';

class DateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            months : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            today : { year : null, month : null, date : null, day : null },
            todayDate : new Date()
        }
    }

    componentDidMount() {
        this.getDate(this.state.todayDate);
    }

    getDate(dateObj) {
        const _day = this.state.days[dateObj.getDay()];
        const _date = dateObj.getDate();
        const _year = dateObj.getFullYear();
        const _month = this.state.months[dateObj.getMonth()];
        this.setState({ 
            todayDate : dateObj,
            today : {
                day : _day,
                date : _date,
                year : _year,
                month : _month
            }
        });
        this.props.onChangeDate(`${_year}-${_month}-${_date}`);
    }

    shouldComponentUpdate(newProps, newState) {
        return newState !== this.state;
    }

    render() {
        return(
            <div className="date-div">
                <span className="date-prev" onClick={function() {
                    const prevDate = new Date(this.state.todayDate.setDate(this.state.todayDate.getDate() - 1));
                    this.getDate(prevDate);
                }.bind(this)}>&lt;</span>
                <span className="date-datetext">
                    <div className="date-datetext-day">{this.state.today.day}</div>
                    <div className="date-datetext-monthyear">{`${this.state.today.month} ${this.state.today.date}, ${this.state.today.year}`}</div>
                </span>
                <span className="date-next" onClick={function() {
                    const nextDate = new Date(this.state.todayDate.setDate(this.state.todayDate.getDate() + 1));
                    this.getDate(nextDate);
                }.bind(this)}>&gt;</span>
            </div>
        );
    }
}

export default DateInfo;