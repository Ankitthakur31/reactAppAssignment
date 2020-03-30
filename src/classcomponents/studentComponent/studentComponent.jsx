import React, { Component } from 'react'
import Logic from './../../modals/logic.js'
import {Universities , Course} from './../../modals/constant.js'
import SelectComponent from './../selectComponent' 
class StudentComponent extends Component {
    constructor(props){
        super(props);
        this.Logic = new Logic();
        this.state = {
            StudentID : 0,
            StudentName : '',
            University  : '',
            Course : '',
            Fee : 0,
            universities : Universities ,
            course : Course , 
            students : [] ,
            MainChecked : false,
            selected : [],
            isStudentIdValid : true,
            isStudentNameValid : true,
            isFormValid : true
        };
    }

    sortByProperty(property){
        return function (x,y){
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };

    revByProperty(property){
        return function (x,y){
            return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
        };
    };

    handleInputs = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
        this.validateForm(evt.target.name , evt.target.value);
    }
    handleClear = (evt) => {

        console.log(Universities);
        console.log(Course );
        
        this.setState({'StudentID' : 0 , 'StudentName' : '' ,'University' : this.state.universities , 'Course' : this.state.course, 'Fee' : 0});
    };

    
    sortin=(evt)=>{
        let stds = this.Logic.getStudent();
        let id = evt.target.id;        
        stds.sort(this.sortByProperty(id));
        this.setState({'students' : stds});        
    }
    reversin=(evt)=>{
        let stds = this.Logic.getStudent();
        let id = evt.target.id;        
        stds.sort(this.revByProperty(id));
        this.setState({'students' : stds});        
    }

    handleSave = () =>{
        let student = {
            StudentID : this.state.StudentID,
            StudentName : this.state.StudentName,
            University : this.state.University,
            Course : this.state.Course,
            Fee : this.state.Fee,
        };
        let stds = this.Logic.addStudent(student);
        this.setState({'students' : stds});
        console.log(JSON.stringify(this.state.students));
        this.handleClear();
    }
        

    componentDidMount = () => {
        let stds = this.Logic.getStudent();
        this.setState({'students' : stds});
    };
    getSelectedUniversity(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        if(val !== 0 ){
        this.setState({University: val});
        }else{
           alert("select");
        }
    }
    getSelectedCourse(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({Course: val})
    }
    rowClick(s){
        console.log(s);
        this.setState({'StudentID' : s.StudentID});
        this.setState({'StudentName' : s.StudentName});
        this.setState({'University' : s.University});
        this.setState({'Course' : s.Course});
        this.setState({'Fee' : s.Fee});
    }
    handleDelete(evt){
        let stds = this.Logic.deleteStudent(evt.target.name);
        this.setState({'students' : stds});
    }

    handleDeletecheck(){
        let stds = this.Logic.deleteStudentCheck(this.state.selected);
        this.setState({selected : []});
        this.setState({'students' : stds});
    }
    getSelectedCheck(evt){
        console.log(evt.target.checked);    
        
        
        if(evt.target.checked){
            this.setState({MainChecked : true});          
        }else{
            this.setState({MainChecked : false});
        }
        
    }
    // getSelectedCheck1(evt){
    //     console.log(evt.target.checked);
        
    //     if(evt.target.checked){
    //         //this.setState({MainChecked : 0});
    //         this.setState({AllChecked : true});            
    //     }else{
    //         //this.setState({MainChecked : 1});
    //         this.setState({AllChecked : false}); 
    //     }
        
    // }
    selectedDelete(evt){
        let indexDel =  this.state.selected;
        if(indexDel.length === 0 ){
            indexDel.push(evt.target.id);
        }else{            
            let flag = 0;
            for(let i = 0 ; i<indexDel.length ; i++){
                if(evt.target.id === indexDel[i]){
                    indexDel.splice(i,1);
                    flag = 1;
                }
            }
            if(!flag){
                indexDel.push(evt.target.id);
            }
        }
        this.setState({selected : indexDel})
        console.log(indexDel);
        
        
    }

    validateForm=(name ,value)=>{
        if(name === 'StudentID'){
            if(parseInt(value) < 0 || value.length > 10 ){
                this.setState({isStudentIdValid  : false});
            }else{
                this.setState({isStudentIdValid  : true});
            }
        }
        if(name === 'StudentName'){
            if(value.length > 20){
                this.setState({isStudentNameValid : false})
            }else{
                this.setState({isStudentNameValid : true})
            }
        }
    }
    render() {
        let columns = [];
        for(let c in this.state.students[0]){
            columns.push(c);
        }
        return (
            <div>
                <div className="container" >
                    <div className="form-group">
                        <label >Student ID</label>
                        <input type="number" value={this.state.StudentID} 
                        className="form-control quantity" 
                        onChange={this.handleInputs.bind(this)} 
                        name="StudentID" />
                        <div hidden={this.state.isStudentIdValid} className="alert alert-danger">Person Id is Must</div>
                    </div>
                    <div className="form-group">
                        <label >Student Name</label>
                        <input type="text" value={this.state.StudentName} 
                        className="form-control" 
                        onChange={this.handleInputs.bind(this)} 
                        name="StudentName" />
                        <div hidden={this.state.isStudentNameValid} className="alert alert-danger">Person Name is Must</div>
                    </div><div className="form-group">
                        <label >University</label>
                        <SelectComponent name="University" data={this.state.University} selectedValue={this.getSelectedUniversity.bind(this)} value={this.state.University} dataSource={this.state.universities}></SelectComponent>
                    </div>
                    <div className="form-group">
                        <label >Courses</label>
                        <SelectComponent name="Course" data={this.state.Course} selectedValue={this.getSelectedCourse.bind(this)} value={this.state.Course} dataSource={this.state.course}></SelectComponent>
                    </div>
                    <div className="form-group">
                        <label >Fees</label>
                        <input type="text" value={this.state.Fee} className="form-control" onChange={this.handleInputs.bind(this)} name="Fee" />
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.handleClear.bind(this)} className="btn btn-primary">New</button>
                        <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-success">Save</button>
                    </div>
                    <input type="checkbox" checked={this.state.MainChecked} onChange={this.getSelectedCheck.bind(this)}/>
                    <button className="btn btn-danger" name="All"  onClick={this.handleDeletecheck.bind(this)}>Delete</button>
                </div>
                <div className="container">
                    
                    <table className="table table-bordered table-striped table-dark table-hover">
                        <thead>
                        <tr>
                            <th>Select</th>
                            {
                                columns.map((c,i) => (
                                    <th key={i}>{c}<i id={c} style={{float : "right", marginLeft : 5}} onClick={this.sortin.bind(this)}> &#8593;</i><i id={c} style={{float : "right", marginLeft : 5}} onClick={this.reversin.bind(this)}> &#8595;</i></th>
                                ))
                            }
                            <th>Option</th>     
                        </tr>
                        </thead>
                        <tbody>
                        {
                             this.state.students.map((d,j) => (
                                <tr key={j} onClick={() => this.rowClick(d)}>
                                    <td><input type="checkbox"  id={j} onClick={this.selectedDelete.bind(this)}/></td>
                                    {
                                        columns.map((c,i) => (
                                        <td key={i}  >{d[c]}</td>
                                        )) 
                                    }
                                    <td><button className="btn btn-danger" name={j} onClick={this.handleDelete.bind(this)}>Delete</button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StudentComponent;
