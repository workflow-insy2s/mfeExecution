import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { WorkflowDto } from '../../common/models/workflow-dto';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  workflow: WorkflowDto = new WorkflowDto();

  constructor(private route: ActivatedRoute ,private router:Router, private srv: ServiceService ) { }
  workflowId=this.route.snapshot.params['workflowId'];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.workflowId = params.get('workflowId');
      console.log('Retrieved workflowId:', this.workflowId);

      //getById
      this.srv.getWorkflowById(this.workflowId).subscribe((res: any) => {
  
        console.log(res)
        this.workflow = res
      })


    });
  }




  editWorkflow2(){
    this.srv.editworkflow(this.workflow , this.workflowId)
    .subscribe(
      (result) => { 
      console.log(result)
      this.ngOnInit()
      Swal.fire('Valider', '', 'success')
      this.router.navigate(['/mfe1/orderComponent/create-flowComponent/'+ this.workflowId]);
    },
    (err) => {
      // traitement du cas d'erreur
      console.log(err)
      Swal.fire('Invalid ', '', 'error')
    }
    )
  }
  
}
