import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, Validators.required, this.noTestAsProjectNameAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    })
  }

  onSubmit(){
    console.log(this.projectForm.value);

  }

  noTestAsProjectName = (control: FormControl): {[s: string]: boolean} => {
    if(control.value == 'Test'){
      return {'Invalid project name': true}
    }
  }

  noTestAsProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value == 'Test'){
          resolve({'Invalid project name': true})
        }
        else{
          resolve(null)
        }
      }, 1000)
    });
    return promise;
  }




}
