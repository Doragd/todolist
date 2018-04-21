import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {doneTask} from '../actions/index';
import {deleteTask} from '../actions/index';
import {addTask} from '../actions/index';
import {selectTask} from '../actions/index';
import {editTask} from '../actions/index';
import {FormControl,InputGroup, Form, Navbar, Button } from 'react-bootstrap';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
var DatePicker = require("react-bootstrap-date-picker");
import { InputNumber } from 'antd';
import $ from 'jquery';

/*
 * We need "if(!this.props.task)" because we set state to null by default
 * */
// var Datepicker = antd.Datepicker;
class TaskDetail extends Component {
    constructor () {
      super()
      this.state = { adding:0, editing: 0, title: "", expire_date: "", priority: 0, content:"" };
      this.handleEdit = this.handleEdit.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleQuit = this.handleQuit.bind(this);
      this.titleChange = this.titleChange.bind(this);
      this.expire_dateChange = this.expire_dateChange.bind(this);
      this.priorityChange = this.priorityChange.bind(this);
      this.contentChange = this.contentChange.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleAddDone = this.handleAddDone.bind(this);
      this.handleDone = this.handleDone.bind(this);
    }
    handleDone(){
      this.props.task.status = 1;
      this.props.doneTask(this.props.task);
    }
    handleAdd(){
      this.setState({adding: 1});
    }
    handleAddDone(){
      this.setState({editing: 0, adding:0});
      var task = new Object();
      task.id = 100;
      task.expire_date = this.state.expire_date.substring(0,10);
      task.title = this.state.title;
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      if(month < 10){
        month = '0'+month;
      }
      if(date < 10){
        date = '0'+date;
      }
      task.start_date = myDate.getFullYear()+'-'+month+'-'+date;
      task.priority = this.state.priority;
      task.content = this.state.content;
      task.status = false;
      this.props.addTask(task);
      this.props.selectTask(task);
    }
    handleQuit(){
      this.setState({editing: 0, adding:0});
    }
    handleEdit () {
      this.setState({editing: 1});
    }
    handleSubmit() {
      this.setState({editing: 0, adding:0});
      var task = this.props.task;
      if(this.state.title){
        task['title'] = this.state.title;
      }
      if(this.state.expire_date){
        task['expire_date'] = this.state.expire_date.substring(0,10);
      }
      if(this.state.priority){
        task['priority'] = this.state.priority;
      }
      if(this.state.content){
        task['coontent'] = this.state.content;
      }

      this.props.editTask(task);
    }
    handleDone(){
      this.props.doneTask(this.props.task);
      this.setState({status: 1});
    }
    titleChange(event){
      this.setState({title: event.target.value});
    }
    expire_dateChange(value, formattedValue){
      this.setState({expire_date: value});
    }
    priorityChange(event){
      this.setState({priority: event.target.value});
    }
    contentChange(event){
      this.setState({content: event.target.value});
    }
    render() {
        if (!this.props.task && !this.state.adding) {
            return (<div>
              <button className="btn" onClick={this.handleAdd}>Add Task</button>
              <hr />
              Select a task...
              </div>);
        }
        if(!this.state.editing && !this.state.adding){
          if(this.props.task.status){
            return (
              <div>
              <button className="btn" onClick={this.handleEdit}>Edit</button>&nbsp;
              <button className="btn" onClick={() => this.props.deleteTask(this.props.task)}>Delete</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn" onClick={this.handleAdd}>Add Task</button>
              <hr />
              <h3>Title: {this.props.task.title}</h3>
              <hr />
              <table className='table'>
              <tbody>
              <tr><th>Start_Date</th><th>{this.props.task.start_date}</th></tr>
              <tr><th>Expire_Date</th><th>{this.props.task.expire_date}</th></tr>
              <tr><th>Priority</th><th>{this.props.task.priority}</th></tr>
              <tr><th>Status</th><th>Done</th></tr>
              <tr><th>Content</th><th>{this.props.task.content}</th></tr>
              </tbody>
              </table>
              </div>
            );
          }
          else{
            return (
              <div>
              <button className="btn" onClick={this.handleDone}>Done</button>&nbsp;
              <button className="btn" onClick={this.handleEdit}>Edit</button>&nbsp;
              <button className="btn" onClick={() => this.props.deleteTask(this.props.task)}>Delete</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn" onClick={this.handleAdd}>Add Task</button>
              <hr />
              <h3>Title: {this.props.task.title}</h3>
              <hr />
              <table className='table'>
              <tbody>
              <tr><th>Start_Date</th><th>{this.props.task.start_date}</th></tr>
              <tr><th>Expire_Date</th><th>{this.props.task.expire_date}</th></tr>
              <tr><th>Priority</th><th>{this.props.task.priority}</th></tr>
              <tr><th>Status</th><th>Doing</th></tr>
              <tr><th>Content</th><th>{this.props.task.content}</th></tr>
              </tbody>
              </table>
              </div>
            );
          }
        }
        else if(this.state.editing){
          return(
            <form>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text" className="form-control" defaultValue={this.props.task.title} onChange={this.titleChange} />
              <br />
              <ControlLabel>Priority</ControlLabel>
              <FormControl type="number" step='1' defaultValue={this.props.task.priority} onChange={this.priorityChange} />
              <br />
              <ControlLabel>Content</ControlLabel>
              <FormControl componentClass="textarea" className="form-control" defaultValue={this.props.task.content} onChange={this.contentChange} />
              <br />
              <button className='btn' onClick={this.handleSubmit}>Save</button>&nbsp;
              <button className='btn' onClick={this.handleQuit}>Quit</button>
            </FormGroup>
            </form>
          );
        }
        else{
          return(
            <form>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text" className="form-control" onChange={this.titleChange} />
              <br />
              <ControlLabel>Expire_Date</ControlLabel>
              <DatePicker dateFormat="DD-MM-YYYY" value={this.state.expire_date} onChange={this.expire_dateChange} />
              <br />
              <ControlLabel>Priority</ControlLabel>
              <FormControl type="number" step='1' onChange={this.priorityChange} />
              <br />
              <ControlLabel>Content</ControlLabel>
              <FormControl componentClass="textarea" className="form-control" onChange={this.contentChange} />
              <br />
              <button className='btn' onClick={this.handleAddDone}>Add</button>&nbsp;
              <button className='btn' onClick={this.handleQuit}>Quit</button>
            </FormGroup>
            </form>
          );
        }
    }
}

// "state.activeTask" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        task: state.activeTask
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({deleteTask: deleteTask, doneTask: doneTask, editTask:editTask, addTask:addTask, selectTask:selectTask}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(TaskDetail);
