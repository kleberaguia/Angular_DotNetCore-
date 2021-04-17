import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../Models/professor';
import { ProfessorService } from './professor.service';



@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  public  modalRef: BsModalRef;
  public Titulo = 'Professores';
  public ProfSelecionado: Professor;
  public profForm: FormGroup;
  public modulo = 'post';

  professores: Professor[];


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb:FormBuilder,
              private modalService: BsModalService,
              private professorService: ProfessorService) {
    this.CriarForm();
   }
   ngOnInit() {
    this.carregaProfessor();

  }

  CriarForm(){
   this.profForm = this.fb.group({
     id:[0],
      nome:['',Validators.required],
      disciplina:['',Validators.required]

   })
  }

  carregaProfessor(){
    this.professorService.getAll().subscribe(
      (professores:Professor[])=>{
        this.professores =  professores;
     
      },
      (erro:any)=>{

        console.log(erro);

      }

    )

  }

  GetByIdProfessor(idProf:number){
    this.professorService.getbyId(idProf).subscribe(
      (prof:Professor)=>{
       this.ProfSelecionado = prof;
      },
      (erro:any)=>{
        console.log(erro);
      }
    )
  }

  SalvarPrfessor(prof:Professor){
    (prof.id===0)?this.modulo='post':this.modulo='put';

    this.professorService[this.modulo](prof).subscribe
    (
      (prf:Professor)=>{
        console.log(prf);
        this.carregaProfessor();
      },
      (erro:any)=>{
        console.log(erro);
      }
    )
  }

  DeletarProfessor(id:number){
    this.professorService.delete(id).subscribe(
      (model:any)=>{
        console.log(model);
        this.carregaProfessor();
      },
      (erro:any)=>{
        console.log(erro);
      }
    );
  }

  

  DeleteProsessor(idprof:number){
    this.professorService.delete(idprof).subscribe(
      (prof:Professor)=>{
        console.log(prof);
      },
      (erro:any)=>{
        console.log(erro);
        
      }
    )
  }

   profSubmit(){
    this.SalvarPrfessor(this.profForm.value);
   
  }  

  ProfNovo(){
   this.ProfSelecionado =  new Professor;
   this.profForm.patchValue(this.ProfSelecionado);
  }

  profSelec(professor:Professor){
    this.ProfSelecionado = professor;
    this.profForm.patchValue(professor);
  }

  voltar(){
    this.ProfSelecionado = null;
  }
 

}
