import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions'
import { bindActionCreators } from 'redux';
import moment from 'moment';


class ReminderList extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            dueDate:''
        }
    }
    addReminder(){
        this.props.addReminder(this.state.text, this.state.dueDate);
        console.log('Props logged:', this.state.text);
    }
    deleteReminder(id){
        this.props.deleteReminder(id);
    }
    renderReminders(){
        const { reminders } = this.props;
        return(
            <ul className="list list-group reminders-list">
               {
                   reminders.map(reminder => {
                        return(
                            
                            <li className="list-group-item" key={reminder.id}>
                            <div className="list-item">
                                <div className="reminder">{ reminder.text }</div>
                                <div className="datefield">
                                    <em>{ moment(new Date(reminder.dueDate)).fromNow() }</em>
                                </div>
                                <div 
                                className="delete-button"
                                onClick = {() => this.deleteReminder(reminder.id) }
                                >
                                    &#x2715;
                                </div>
                            </div>
                            
                        </li>
                        )
                    }

                   )
               }
            </ul>
        )
        
    }

    render(){
        return(
            <div className="row">
                <div className="container">
                    <h2 className="heading2">Reminders List</h2>
                    <div className="form-inline">
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control"
                            onChange={event => this.setState({text: event.target.value})}
                            onFocus={()=>this.value=''}
                            />
                            <input 
                            type="datetime-local" 
                            className="form-control"
                            onChange={event=>this.setState({dueDate: event.target.value})}
                            />
                            <button className="btn btn-success" onClick={() => this.addReminder()}>Add reminder</button>
                        </div>
                        { this.renderReminders() }
                    </div>
                </div>
                <div className="container">
                    <button className="btn btn-danger" onClick={()=> this.props.clearReminders()}>
                        Clear Reminders
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        reminders: state
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (ReminderList);