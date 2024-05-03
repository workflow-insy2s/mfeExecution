import { CdkDragDrop, moveItemInArray, copyArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RuleDto } from '../../../common/models/rule-dto';
import { ServiceService } from '../../service.service';
import { WorkflowDto } from 'src/app/common/models/workflow-dto';
import { StepDto } from 'src/app/common/models/step-dto';
import { STEPS_TYPE } from 'src/app/common/enums/steps.enum';
import { MatDialog } from '@angular/material/dialog';

import { StepInfoComponent } from '../step-info/step-info.component';
import { Step } from 'src/app/common/models/step';


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StepsComponent  implements OnInit{
  constructor(private srv: ServiceService , private srvStep: ServiceService, private router: Router ,private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}


  workflowId: '';
  workflow :WorkflowDto = {
    id: '',
    name: '',
    description: '',
    creationDate: new Date(),
    responsible: '',
    steps: []
  };
  idStep: number | null;
  name='Nom de la tâche';
  description='Description';
  StepDto: StepDto = new StepDto();
  steps: StepDto[] = [];

  ngOnInit(): void {
    this.srv.getRuls(StepDto.name).subscribe((res: any) => {

      console.log(res)
      this.RuleDto = res
    })

    this.route.params.subscribe(params => {
      this.workflowId = params['workflowId']; 

     this.getWorkflowDetail();
  });
}


  getWorkflowDetail(){
    this.srv.getWorkflowById(this.workflowId).subscribe((res: any) => {
      this.workflow = res;
      this.create=res.steps;
  });
}
  
  addStepsToWorkflow(): void {
    let newStep: StepDto = { ...this.StepDto }; // Copy the StepDto
    newStep.workflowId= parseInt(this.workflow.id, 10);
    
    this.srvStep.addStepsToWorkflow(newStep)
      .subscribe(
        (result) => { // En cas de succès
          console.log(result);
          Swal.fire('Valider', '', 'success');  
          console.log('Data saved');
          newStep.id = result;
          this.steps.push(newStep);
          console.log(this.steps);
          this.getWorkflowDetail();
        },
        (error) => { // En cas d'erreur
          console.log('Error:', error);
          Swal.fire('Erreur', '', 'error');
        }
      );
  }
  
  deleteStep() {
    // Afficher un message d'alerte de confirmation avant la suppression
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible et supprimera l\'etape.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a cliqué sur "Oui, supprimer"
        if(this.idStep){
          this.srvStep.deleteStepFromWorkflow(this.idStep)
          .subscribe(
            (result) => { // succès
              console.log(result);
              Swal.fire('Step supprimé avec succès', '', 'success');
              window.location.reload();
            },
            (err) => {
              // traitement du cas d'erreur
              console.log(err);
              Swal.fire('Step supprimé avec succès', '', 'success');
              window.location.reload();
            }
          );
      }
        }
         else {
        // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
        Swal.fire('Suppression annulée', '', 'info');
      }
    });
  }

  RuleDto: RuleDto[] = [];
  
    deleteWorkflow(ruleId: any) {
      // Afficher un message d'alerte de confirmation avant la suppression
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Cette action est irréversible et supprimera la régle.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a cliqué sur "Oui, supprimer"
          this.srv.removeRule(ruleId)
            .subscribe(
              (result) => { // succès
                console.log(result);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              },
              (err) => {
                // traitement du cas d'erreur
                console.log(err);
                Swal.fire('Workflow supprimé avec succès', '', 'success');
                window.location.reload();
              }
            );
        } else {
          // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
          Swal.fire('Suppression annulée', '', 'info');
        }
      });
    }
    
    editWorkflow(id: number): void {
      console.log(`Modification du workflow avec l'ID ${id}`);
    }
  
    
  stepst = [ 'Step','Itération', 'Conditionelle', 'Exit'];

  create :any = [];
  iter :any = [];
  c2 :any = [];
  



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      ); 
    
    } else {
        
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showStepInfo: boolean = false;

  createRule() :void {
    this.router.navigate(['/mfe-rule'])
  }

  isStepInfoVisible() {
  return this.showStepInfo;
  }

  ShowStepInfo():void {
    this.name='Nom de la tâche';
  this.description='Description';
  this.idStep = null ;
  
    this.showStepInfo = true;
  }

  ShowStepInfoClick(StepId:any): void {
    this.name='Nom de la tâche';
  this.description='Description';
  this.idStep = null ;
    this.showStepInfo = true;
console.log(StepId);
this.srvStep.getStepById(StepId).subscribe(
(result:Step) => { // succès
  console.log(result);
  this.name = result.name;
  this.description = result.description
  this.idStep = result.id ;
  
},
(err) => {
  // traitement du cas d'erreur
  console.log(err);
 
}
);
    // this.dialog.open(StepInfoComponent, {
    //   width: '400px',
    //   // Add any other configuration options here
    // });
  }

  getSteps(): StepDto[]{
    let steps= this.workflow.steps;
    return steps;
  }

  testStep(element: any): Boolean {
    if (element instanceof Step || element === "Step") {
      return true;
    } 
    return false;
  }

}


