import { Step } from "./step";
import { StepDto } from "./step-dto";

export class WorkflowDto {
      id :any;
      name: string = '';
      description: string = '';
      creationDate: Date = new Date();
      responsible: string = '';
      steps: Step[];   
 }

    
    
    
     
    