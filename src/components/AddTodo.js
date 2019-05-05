import React from 'react';
import { addTodo } from '../redux/actions';
import { connect } from 'react-redux';
import './AddTodo.css';

class AddTodo extends React.Component {
    constructor(props){
        super(props);
        this.textInput = React.createRef();
        this.state  = {
            input : undefined,
        }
    }

    componentDidMount() {
        this.focusTextInput();
    }

    focusTextInput = () => {
        this.textInput.current.focus();
    }

    handleChange = (e) => {
        this.setState({input: e.target.value});
    }

    handleAddTodo = () => {
        if ((this.state.input).trim() === '')
            return;
        this.props.addTodo(this.state.input.trim());
        this.setState({input: ''})
    }

    handleEnter = (e) =>{
        if (e.key === 'Enter'){
            this.handleAddTodo();
        }
    }

    render(){
        return(
            <div>
            <input className="add-box" 
                placeholder="Add a task?"
                ref={this.textInput}
                onChange={this.handleChange}
                onKeyDown={this.handleEnter}
                value = {this.state.input}
            />
            </div>
        );
    }
}

export default connect( null, { addTodo })(AddTodo);
