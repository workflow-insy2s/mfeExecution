import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
// import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
// import { WorkflowDto } from '../models/workflow-dto';
import { FormsModule } from '@angular/forms';
import { WorkflowDto } from '../../common/models/workflow-dto';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../TokenService';
import { Role } from 'src/app/common/models/role';


@Component({
    selector: 'app-addworkflow',
    templateUrl: './addworkflow.component.html',
    styleUrls: ['./addworkflow.component.css']

})
export class AddworkflowComponent implements OnInit{

  token: string | null | undefined;

  constructor(private srv: ServiceService, private router: Router, private dialog: MatDialog,private tokenService: TokenService) { }
  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    console.log('réception de Token dans MFE_Rule ',this.tokenService.getToken())
    }

  //methode AddWorkflow

  roles: Role[]=[];

  workflow : WorkflowDto=new WorkflowDto()


  
  //2eme
  ajoutWorkflow2() {
    // console.log(this.workflow);
    this.srv.addWorkflow(this.workflow)
      .subscribe(
        (result) => { // success
          console.log(result);

           this.router.navigate(['/mfe1/orderComponent/create-flowComponent/'+result.id]);
          Swal.fire('Valider', '', 'success');
          
        },
        (err) => {
          // traitement du cas d'erreur
          console.log(err);
          Swal.fire('Invalid ', '', 'error');
        }
      );
  }

  // Méthode pour gérer le changement d'état des cases à cocher
  selectedRoles: Role[] = [];
  handleRoleChange(event: any, role: Role) {
    role.checked = event.target.checked;
    if (event.target.checked) {
      // Si la case est cochée, ajoutez le rôle au tableau
      this.selectedRoles.push(role);
    } else {
      // Si la case est décochée, retirez le rôle du tableau
      const index = this.selectedRoles.findIndex(selectedRole => selectedRole === role);
      if (index !== -1) {
        this.selectedRoles.splice(index, 1);
      }
    }

    //console.log(this.selectedRoles)
    
  }
  

}
