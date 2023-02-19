import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'googledoc';
  checkControl:boolean= false;

  public quesAnsForm!: FormGroup;

  constructor(private _fb:FormBuilder){}

  ngOnInit():void{
    this.setQuestionForm();
  }

  setQuestionForm(){
    this.quesAnsForm = this._fb.group({
      formElements: this._fb.array([this.formElementsInstance()])
    });

    return this.quesAnsForm;
  }

  formElementsInstance(){
    if(this.checkControl){
      return this._fb.group({
        label:['', Validators.required],
        controltype:['radio',Validators.required],
        validations: [''],
        options:this._fb.array([this.optionsInstance()]),
        masked:true
      });
    }else{
      return this._fb.group({
        label:['', Validators.required],
        controltype:['paragraph',Validators.required],
        placeholder:['Enter Text'],
        validations: ['']
      });
    }
  }

  get quesAnsFormInstance(){
    return <FormArray>this.quesAnsForm.get('formElements');
  }

  addQuesAnsFormInstance(){
    this.quesAnsFormInstance.push(this.formElementsInstance());
  }

  removeQuesAnsFormInstance(i:number){
    this.quesAnsFormInstance.removeAt(i);
  }

  optionsInstance(){
    return this._fb.group({
      optlabel:[''],
      optvalue:['']
    });
  }

  get optionsInstanceControl(){
      const optionsIns = this.quesAnsFormInstance.controls;
      // console.log("Option instance: ",optionsIns[0].get('options'));
      return <FormArray>optionsIns[0]?.get('options');
  }

  addOptionsInstance(){
    this.optionsInstanceControl.push(this.optionsInstance());
  }

  removeOptionsInstance(j:number){
    this.optionsInstanceControl.removeAt(j);
  }

  onSelectControl(i:number, controltype:any){

    if(controltype.value=='radio'){
     this.checkControl = true;
      // this.setQuestionForm();
      console.log("formElements : ", this.quesAnsFormInstance.controls[i]);
    }else{
      this.checkControl = false;
      // this.setQuestionForm();
      console.log("formElements : ",  this.quesAnsFormInstance.controls[i]);
    }
  }

  saveInJson(){
    console.log("Form Object: ", JSON.stringify(this.quesAnsForm.value));
  }
}
