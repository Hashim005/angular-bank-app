import { LoaderService } from './service/loader.service';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Banking';

  isLoading !: Subject<boolean>;
  constructor(private loaderService:LoaderService){
    this.isLoading = this.loaderService.isLoading
  }
}
