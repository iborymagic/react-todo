import React, {Component} from 'react';
import DateInfo from './components/DateInfo';
import AddTask from './components/AddTask';
import ListItem from './components/ListItem';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today : null,
            todos : [] 
        }
    }

    componentDidMount() {
        // get data from the local storage
        const todoArr = JSON.parse(localStorage.getItem('todos'));
        if(todoArr) this.setState({ todos : todoArr });
    }

    render() {
        const itemArr = [];
        this.state.todos.map(cur => {
            if(cur.date === this.state.today) {
                itemArr.push(<ListItem key={cur.id} todo={cur} onCheckChanged={function(item_id) {
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[idx].done = !_arr[idx].done;

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });            
                }.bind(this)}
                onDelete={function(item_id) {
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr.splice(idx, 1);

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });
                }.bind(this)}></ListItem>);
            }
        });

        return (
            <div className="App">
                <div className="background"></div>
                <div className="frame">
                    <div className="title-div">
                        <span>Daily-Todos</span>
                    </div>
                    <DateInfo onChangeDate={function(dateStr) {
                        this.setState({ today : dateStr });
                    }.bind(this)}></DateInfo>
                    <AddTask onSubmitTodo={function(_text) {
                        if(!_text) {
                            return;
                        } else {
                            let arr = Array.from(this.state.todos);
                            arr.push({
                                id : this.state.todos.length > 0 ? this.state.todos[this.state.todos.length - 1].id + 1 : 0,
                                text : _text,
                                memo : "",
                                pinned : false,
                                done : false,
                                date : this.state.today
                            });
                            // save data in the local storage
                            localStorage.setItem('todos', JSON.stringify(arr));
                            this.setState({ todos : arr });
                            console.log(arr);
                        }
                    }.bind(this)}></AddTask>
                    <div className="list-div">
                        {itemArr}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;