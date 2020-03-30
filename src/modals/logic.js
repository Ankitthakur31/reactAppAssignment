class Logic{
    constructor(){
        this.students = [
            
            {StudentID : 101, StudentName : "Ankit" , University : "Indore" , Course : "IT", Fee : 10000 },
            {StudentID : 102, StudentName : "Harsh" , University : "Pune" , Course : "CIVIL", Fee : 34000},
            {StudentID : 103, StudentName : "Harshal" , University : "Bhopal" , Course : "MECH", Fee : 21000},
            {StudentID : 104, StudentName : "Forum" , University : "Mumbai" , Course : "EC", Fee : 10002},
            {StudentID : 105, StudentName : "Anushka" , University : "Indore" , Course : "IT", Fee : 111000}
        
        ];

    }
    getStudent(){
        return this.students;
    }
    addStudent(student){
        let flag=1;
        this.students.forEach((a,i)=>{
            if(a.StudentID === student.StudentID){
                a.StudentName = student.StudentName;
                a.University = student.University;
                a.Course = student.Course;
                a.Fee = student.Fee;
                flag= 0 ;
            }
        });
        if(flag){
            this.students.push(student);
        }
        return this.students;
    }

    deleteStudent(index){
        if(index === "All"){
        this.students.splice(0);
            
        }else{
            this.students.splice(index,1);
        }
        return this.students;
    }

   

    deleteStudentCheck(select){
        //let stu = this.students;
        for(let i = select.length-1 ; i>=0 ; i--){
            this.students.splice(select[i] , 1);
        }
        return this.students;
    }

   
}

export default Logic;