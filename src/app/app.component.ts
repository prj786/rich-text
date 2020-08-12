import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'textEditor';
  public htmlText = `
    <div>
        Hello World!!
    </div>
  `;
  public editMode = false;


  public realHTML(html: string): void {
    this.htmlText = html;
  }
}
