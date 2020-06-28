import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo : props.todo
        }
    }

    render() {
        const item_id = this.state.todo.id;
        return(
            <div className="item">
                <div className="item-div">
                    {/*<input type="checkbox" className="item-check" id={`item-check-${item_id}`}></input>*/}
                    {this.state.todo.done ? 
                    <input type="checkbox" className="item-check" id={`item-check-${item_id}`} onChange={function() {
                        this.props.onCheckChanged(item_id);
                    }.bind(this)} checked></input> : 
                    <input type="checkbox" className="item-check" id={`item-check-${item_id}`} onChange={function() {
                        this.props.onCheckChanged(item_id);
                    }.bind(this)}></input>}
                    <label htmlFor={`item-check-${item_id}`} className="item-label"></label>
                    <div className="item-todo">{this.state.todo.text}</div>
                    <div className="item-pin"></div>
                    <div className="item-menu" id={`item-menu-${item_id}`} onClick={function() {
                        document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-open');
                        document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-close');
                    }}></div>
                    <div className="item-tooltip">
                        <ul className="item-tooltip-ul item-tooltip-close" id={`item-tooltip-${item_id}`}>
                            <li className="item-tooltip-li">
                                <div className="item-pin-icon"></div>
                                <div className="item-pin-text">Pin on the top</div>
                            </li>
                            <li className={!this.state.todo.memo ? 'item-tooltip-li' : 'item-tooltip-li memo-unable'}>
                                <div className="item-memo-icon"></div>
                                <div className="item-memo-text" onClick={function() {
                                    document.getElementById(`item-memo-input-${item_id}`).classList.toggle('item-memo-input-open');
                                    document.getElementById(`item-memo-input-${item_id}`).classList.toggle('item-memo-input-close');

                                    document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-open');
                                    document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-close');
                                }}>Add a memo</div>
                            </li>
                            <li className={this.state.todo.memo ? 'item-tooltip-li' : 'item-tooltip-li memo-unable'} id={`item-memo-delete-${item_id}`}>
                                <div className="item-memo-delete-icon"></div>
                                <div className="item-memo-delete-text" onClick={function() {
                                    const _todo = Object.assign({}, this.state.todo);

                                    document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-open');
                                    document.getElementById(`item-tooltip-${item_id}`).classList.toggle('item-tooltip-close');

                                    _todo.memo = "";
                                    this.setState({ todo : _todo });
                                    this.props.onMemoDelete(item_id);
                                }.bind(this)}>Delete Memo</div>
                            </li>
                            <li className="item-tooltip-li">
                                <div className="item-delete-icon"></div>
                                <div className="item-delete-text" onClick={function() {
                                    this.props.onDelete(item_id);
                                }.bind(this)}>Delete</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <form className="item-memo-form" onSubmit={function(e) {
                    e.preventDefault();
                    if(e.target.memo_input.value) {
                        const _memo = e.target.memo_input.value;
                        const _todo = Object.assign({}, this.state.todo);
                        _todo.memo = _memo;
                        e.target.memo_input.value = "";
                        this.setState({ todo : _todo });
                        this.props.onMemoInput(_memo, item_id);
                    }
                    document.getElementById(`item-memo-input-${item_id}`).classList.toggle('item-memo-input-open');
                    document.getElementById(`item-memo-input-${item_id}`).classList.toggle('item-memo-input-close');
                }.bind(this)}>
                    <input type="text" name="memo_input" className="item-memo-input item-memo-input-close" id={`item-memo-input-${item_id}`} placeholder="Add a memo..." autoComplete="off"></input>

                </form>
                <div className={!this.state.todo.memo ? "item-memo item-memo-close" : "item-memo item-memo-open"} id={`item-memo-${item_id}`}>{this.state.todo.memo}</div>
            </div>
        );
    }
}

export default ListItem;
