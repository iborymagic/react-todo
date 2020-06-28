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
                    }.bind(this)}></div>
                    <div className="item-tooltip">
                        <ul className="item-tooltip-ul item-tooltip-close" id={`item-tooltip-${item_id}`}>
                            <li className="item-tooltip-li">
                                <div className="item-pin-icon"></div>
                                <div className="item-pin-text">Pin on the top</div>
                            </li>
                            <li className="item-tooltip-li">
                                <div className="item-memo-icon"></div>
                                <div className="item-memo-text">Add a memo</div>
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
                <div className="item-memo">{this.state.todo.memo}</div>
            </div>
        );
    }
}

export default ListItem;
