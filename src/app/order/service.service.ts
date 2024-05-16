import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowDto } from '../common/models/workflow-dto';
import { RuleDto } from '../common/models/rule-dto';
import { Rule } from '../common/models/Rule';
import { RuleObjetDto } from '../common/models/RuleObjet-dto';
import { ObjectDto } from '../common/models/object-dto';
import { ParamDto } from '../common/models/param-dto';
import { StepDto } from '../common/models/step-dto';
import { Observable } from 'rxjs';
import { Step } from '../common/models/step';
import { Role } from '../common/models/role';
import { User } from '../common/models/user';
import { WorkflowExecution } from './executor/models/workflowExecutes';
import { Objet, RuleObjet } from './executor/models/ruleObjet';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  url='http://localhost:7080/api/workflow'
  
// Service Workflow

  addWorkflow (workflow:WorkflowDto): Observable<any>{
    return this.http.post(this.url,workflow) 
   }


  getWorkflows(){
    return this.http.get(this.url)
  
   }

   removeWorkflow (id: any ){
    return this.http.delete(this.url+'/'+id)
  }



  editworkflow(workflow:WorkflowDto , workflowId:any ){
    return this.http.put(this.url+'/'+workflowId,workflow) 
   }


   getWorkflowById(workflowId:any){
    return this.http.get(this.url+'/'+workflowId)
  }

  addStepsToWorkflow(steps: StepDto) {
    return this.http.post(this.url+'/steps', steps)
  }


  deleteStepFromWorkflow(stepId: number): Observable<any> {
    return this.http.delete(this.url+'/steps/'+ stepId);
  }

  getStepById(stepId:any): Observable<Step>{
    return this.http.get<Step>(this.url+'/steps/'+stepId)
  }
  


  //service Rule 
  url1='http://localhost:7081/api/rule/rules'

  


  addRule (rule:RuleDto){
    return this.http.post(this.url1,rule) 
   }

  getRuls(stepEntry: any){
    return this.http.get(this.url1+'stepEntry/'+stepEntry)
  
   }

   removeRule (ruleId: any ){
    return this.http.delete(this.url1+ruleId)
  }



  editRule(rule:RuleDto , ruleId:any ){
    return this.http.put(this.url1+'/'+ruleId,rule) 
   }


   getRuleById(ruleId:any){
    return this.http.get(this.url1+'/'+ruleId)
  }

  //pour l'objet
  addObjet (object:ObjectDto){
    return this.http.post(this.url1+'/objets',object) 
   }

/*    addParam (param:ParamDto){
    return this.http.post(this.url1+'/parameters',param) 
   } */

   addRuleObjet (relation:RuleObjetDto){
    return this.http.post(this.url1+'/relations',relation) 
   }

   //Parameter
   addParameter (param:ParamDto){
    return this.http.post(this.url1+'/parameters',param) 
   }
   
   //Add Rule With Objects 
   
   addRuleWithObjects (rule:Rule){
    return this.http.post(this.url1+'/rules/addWithObjects',rule) 
   }

   deleteObjet (ObjetId: any ){
    return this.http.delete(this.url1+'/objets/'+ObjetId)
  }

  //EDit Object
  editObject(object:ObjectDto , objtId:any ){
    return this.http.put(this.url1+'/objets/'+objtId,object) 
   }


   //APIRole
url2='http://localhost:8082/api/keycloak'

addRole (role:Role){
  return this.http.post(this.url+'/roles/',role) 
 }

 getAllRoles(){
  return this.http.get(this.url+'/roles/')

 }

 deleteRole (roleId: any ){
  return this.http.delete(this.url+'/roles/'+roleId)
}

editRole(role:Role , roleId:any ){
  return this.http.post(this.url+'/roles/'+roleId+'/update',role) 
 }


//APIs User


addUser (user:User){
  return this.http.post(this.url+'/users/create',user) 
 }

 getAllUsers(){
  return this.http.get(this.url+'/users/')

 }

 deleteUser (userId: any ){
  return this.http.delete(this.url+'/users/'+userId)
}

editUser(user:User){
  return this.http.post(this.url+'/users/update',user) 
 }


 getRoleById(userId:any){
  return this.http.get(this.url+'/'+userId)
}



/** ghazi api for executor */
//APIRole
 // API pour récupérer tous les workflows par rôle
 getAllworkflowByRole(role: number) {
  return this.http.get(this.urlEx + '/workflow/role/' + role, );
}

// API pour récupérer toutes les étapes par ID de workflow
getAllStepByIdWorkflow(workflowId: any) {
  return this.http.get(this.urlEx + '/workflow/workflowExs/workflow/stpes/' + workflowId);
}

// API pour éditer une étape
editStep(stepEx: WorkflowExecution, id :number) {
  return this.http.put(this.urlEx + '/workflow/workflowExs/'+id,stepEx);
}

// API pour obtenir le résultat d'une règle
getResultRule(ruleId: any) {
  return this.http.get(this.urlExRule + '/rules/relation2eme/'+ruleId);
}
//api pour obtenir les objets du regle
getAllObjetByRuleId(ruleId: number) {
return this.http.get(this.urlExRule + '/rules/ObjectsByIdRule/' + ruleId);
}
  // API pour éditer une Objet
  editObjet(obj: Objet, id :number) {
    return this.http.put(this.urlExRule + '/objets/'+id,obj);
  }



// Votre URL de base pour les API
private urlEx = 'http://localhost:7080/api';
private urlExRule = 'http://localhost:7081/api/rule';


}

