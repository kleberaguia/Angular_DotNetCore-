import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from '../Models/aluno';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlunoService } from './aluno.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  public modalRef: BsModalRef;
  public Titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public TextSimples: string;
  public alunoForm: FormGroup;
  public modulo = 'post';

  public alunos: Aluno[];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private alunoservice: AlunoService) {
    this.CriarForm();

  }

  ngOnInit() {

    this.CarregarAlunos();
  }

  CarregarAlunos() {

    this.alunoservice.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  SalvarAluno(aluno: Aluno) {
    (aluno.id === 0) ? this.modulo = 'post' : this.modulo = 'put';
    
    this.alunoservice[this.modulo](aluno).subscribe(
      (aluno: Aluno) => {
        console.log(aluno);
        this.CarregarAlunos();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }
  DeletarAluno(id:number){
    this.alunoservice.delete(id).subscribe(
      (model:any)=>{
        console.log(model);
        this.CarregarAlunos();
      },
      (erro:any)=>{
        console.error(erro);

      }
    );
  }


  CriarForm() {
    this.alunoForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit() {
    this.SalvarAluno(this.alunoForm.value);

    //console.log(this.alunoForm.value);
  }

  alunoSelec(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno;  
    this.alunoForm.patchValue(this.alunoSelecionado);
 
  }

  voltar() {
    this.alunoSelecionado = null;
  }


}
