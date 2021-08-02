import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

   public frases: Frase[] = FRASES;
   public instrucao = 'Traduza a frase: ';
   public resposta: string = '';
   public progressoPai:number = 0;
   public rodada: number = 0;
   public tentativas: number = 3;
   public rodadaFrase!:Frase;
   @Output()  encerrarJogo: EventEmitter<string> = new EventEmitter();


  constructor() {
    this.atualizaRodada();
   }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;

  }

  public vericaResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta) {
      this.rodada++;
      this.progressoPai = this.progressoPai + (100 / this.frases.length);

      if(this.rodada >= this.frases.length){
        this.encerrarJogo.emit('vitoria');
      }
      this.atualizaRodada();
    } else {
      this.tentativas--;
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }

    }

  }

  public atualizaRodada():void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
