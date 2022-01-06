import { Component, OnInit } from '@angular/core';
import { ParameterService } from 'src/app/services/parameter.service';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  saved = false;
  error = false;

  suggestion = '';


  constructor(private suggestionService: SuggestionService) { }

  enregistrerSuggestion() {
    this.suggestionService.saveSuggestion(this.suggestion).subscribe(response => {
      if(response){
        this.saved = true;
        this.error = false;
      } else {
        this.error = true;
        this.saved = true;
      }
    },
    error => {
      this.error = true;
      this.saved = true;
    })
  }

  get secondaryColor(): string {
    return ParameterService.configuration.secondaryColor;
  }

}
