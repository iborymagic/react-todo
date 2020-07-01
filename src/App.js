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
        let dividedByDate = [];
        const pinnedTodos = this.state.todos.filter(el => el.pinned);
        // pinnedTodos에서 날짜를 가지고 분류를 해야 함.
        // 만약 기존 배열에서 내 날짜를 가진 애가 있으면 패스, 없으면 들어가기
        let cnt = 0;
        console.log(pinnedTodos);
        console.log('-');
        pinnedTodos.forEach((el, idx) => {
            if(idx > 0 && el.date !== pinnedTodos[idx - 1].date) {
                cnt++;
            }
            dividedByDate[cnt] = el;
        });
        console.log(dividedByDate);
        
        let lastPinIds = [];
        if(dividedByDate.length > 0) {
            lastPinIds = dividedByDate.map(el => el.id);
        }
        this.state.todos.map(cur => {
            if(cur.date === this.state.today) {
                itemArr.push(<ListItem key={cur.id} todo={cur} last_ids={lastPinIds} onCheckChanged={function(item_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === item_id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].done = !_arr[i].done;

                            /*_arr.sort((a, b) => new Date(a).date - new Date(b).date);*/

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

                            /*_arr.sort((a, b) => new Date(a).date - new Date(b).date);*/

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                }.bind(this)}
                onMemoInput={function(_memo, _id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].memo = _memo;

                            /*_arr.sort((a, b) => new Date(a).date - new Date(b).date);*/

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
                }.bind(this)}
                onMemoDelete={function(_id) {
                    let i = 0;
                    const len = this.state.todos.length;
                    
                    for(i = 0; i < len; i++) {
                        if(this.state.todos[i].id === _id) {
                            const _arr = Array.from(this.state.todos);
                            _arr[i].memo = "";

                            /*_arr.sort((a, b) => new Date(a).date - new Date(b).date);*/

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
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

                            _arr.sort((a, b) => new Date(a.date) - new Date(b.date));

                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
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

                            /*_arr.sort((a, b) => new Date(a).date - new Date(b).date);*/
                            
                            localStorage.removeItem('todos');
                            localStorage.setItem('todos', JSON.stringify(_arr));

                            this.setState({ todos : _arr });
                            break;
                        }
                    }
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
                            /*arr.sort((a, b) => new Date(a.date) - new Date(b.date));*/
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