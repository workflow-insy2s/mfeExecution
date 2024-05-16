import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../../service.service'
import Swal from 'sweetalert2';
import { DescriptionComponent } from '../description/description.component';
import { Workflow } from '../models/workflow';
import { Role } from 'src/app/common/models/role';
import { TokenService } from '../../TokenService';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit{

  // constructor(private srv: RuleService , private router: Router) {}
  constructor(private tokenService: TokenService, private srvRole: ServiceService, private router: Router,private dialog: MatDialog) {}


  

  /***************************methode getAllWorkflowByRole********************************** */
role :Role = new Role(0,'','','');
Workflow: Workflow[] = [];

ngOnInit(): void {
  const token = this.tokenService.getToken();
  const accessrole = this.tokenService.getRole();
  //this.role.name=accessrole
  const numRole: number = 1;
  console.log('le token de listWorkflow =', token)
  console.log('le Role de listWorkflow =', accessrole)
  console.log('succes')
/*     const token = this.tokenService.getToken();
  console.log('le token de execute est la :'+ token) */
  this.srvRole.getAllworkflowByRole(numRole).subscribe((res: any) => {

    console.log(res)
    this.Workflow = res
  
   })



}


/************************************************************* */


executer(workflowId : any) {
    this.router.navigate(['/mfe1/executor/workflowExecute/',workflowId]);
  }

















 





 //************************************************************ Role********************************************************** */
 openRoleUserDialog(): void {
  const dialogRef = this.dialog.open(DescriptionComponent, {
    width: '10000px', // Largeur de la boîte de dialogue
    data: {  } // Passer les données au composant edit-objet
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Boîte de dialogue fermée'); // Logique à exécuter après la fermeture de la boîte de dialogue
  });
}



//*************************************************************************************************************************** */




  
  
  
  

}
