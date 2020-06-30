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
        const pinnedTodos = this.state.todos.filter(el => el.pinned);
        
        let lastPinId = -10;
        if(pinnedTodos.length > 0) {
            lastPinId = pinnedTodos[pinnedTodos.length - 1].id;
        }
        this.state.todos.map(cur => {
            if(cur.date === this.state.today) {
                itemArr.push(<ListItem key={cur.id} todo={cur} last_id={lastPinId} onCheckChanged={function(item_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].done = !_arr[i].done;

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[idx].done = !_arr[idx].done;

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}
                onDelete={function(item_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr.splice(i, 1);

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr.splice(idx, 1);

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}
                onMemoInput={function(_memo, _id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].memo = _memo;

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(_id === el.id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[idx].memo = _memo;

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}
                onMemoDelete={function(_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].memo = "";

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[idx].memo = "";

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}
                onPin={function(_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            const tmp = _arr[i];
                            _arr.splice(i, 1);
                            tmp.pinned = true;
                            _arr.unshift(tmp);

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr.splice(idx, 1);
                            el.pinned = true;
                            _arr.unshift(el);

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}
                onPinOut={function(_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            const tmp = _arr[i];
                            _arr.splice(i, 1);
                            tmp.pinned = false;
                            _arr.push(tmp);
                            
                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                    /*
                    this.state.todos.forEach((el, idx) => {
                        if(el.id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr.splice(idx, 1);
                            el.pinned = false;
                            _arr.push(el);
                            
                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                        }
                    });*/
                }.bind(this)}></ListItem>);
            }
        });

        return (
            <div className="App" onClick={function(e) {
                if(!e.target.classList.contains('item-menu')) {
                    const openTooltips = document.getElementsByClassName('item-tooltip-open');
                    if(openTooltips) {
                        Array.from(openTooltips).forEach(el => {      
                            el.classList.toggle('item-tooltip-open');
                            el.classList.toggle('item-tooltip-close');
                        });
                    }
                }
            }}>
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
                                id : Math.random().toString(36).substr(2, 9),
                                /*this.state.todos.length > 0 ? this.state.todos[this.state.todos.length - 1].id + 1 : 0,*/
                                text : _text,
                                memo : "",
                                pinned : false,
                                done : false,
                                date : this.state.today
                            });
                            // save data in the local storage
                            localStorage.setItem('todos', JSON.stringify(arr));
                            this.setState({ todos : arr });
                        }
                    }.bind(this)}></AddTask>
                    <div className="list-div">
                        {itemArr}
                        <div className="blank"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;