import React, {Component} from 'react';
import './AddTask.css';

class AddTask extends Component {
    shouldComponentUpdate(newProps, newState) {
        return newProps !== this.props;
    }

    render() {
        return(
            <div className="task-div">
                <span className="task-icon"></span>
                <span className="task-form">
                    <form onSubmit={function(e) {
                        e.preventDefault();
                        this.props.onSubmitTodo(e.target.task_input.value);
                        e.target.task_input.value = "";
                    }.bind(this)}>
                        <input type="text" className="task-input" name="task_input" placeholder="Add a task..."></input>
                    </form>
                </span>
            </div>
        );
    }
}

export default AddTask;
