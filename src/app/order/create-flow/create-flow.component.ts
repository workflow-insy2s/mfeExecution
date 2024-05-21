import { Component, OnInit } from '@angular/core';
import { StepInfoComponent} from '../create-flow/step-info/step-info.component';
import { StepsComponent} from '../create-flow/steps/steps.component';
import { CreateWorkflowComponent} from '../create-flow/create-workflow/create-workflow.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-create-flow',
  templateUrl: './create-flow.component.html',
  styleUrls: ['./create-flow.component.css']
})
export class CreateFlowComponent implements OnInit{
  constructor(private route: ActivatedRoute ,private router:Router,private srv: ServiceService){}

  ngOnInit(): void {
console.log("succe")
  }

  selectedContent: string = 'Step';

  showContent(content: string) {
    this.selectedContent = content;
  }
  showViewRegle:Boolean=false;
  
  ShowRegle(){
    this.showViewRegle=true;
    this.router.navigate(['/MfeRule']);

    

  }
}
