import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, OnChanges {
  // emitters
  @Output() insertedText: EventEmitter<any> = new EventEmitter<any>();
  @Input() editMode = false;
  @Input() innerContent = '';

  public tableResize = document.getElementById('resizeDiv');
  // Arrays
  public fontList: Array<string> = [
    'Helvetica',
    'Georgia',
    'Sans',
    'Sans-serif'
  ];
  public fontSize: Array<string> = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17'
  ];
  public colorList: Array<string> = [
    '#000000',
    '#5d8aa8',
    '#e32636',
    '#ffbf00',
    '#9966cc',
    '#a4c639',
    '#f2f3f4',
    '#cd9575',
    '#915c83'
  ];
  // booleans
  public nameDropdown = false;
  public sizeDropdown = false;
  public imgDropdown = false;
  public anchorDropdown = false;
  public colorsDropdown = false;
  public tableDropdown = false;
  public zoomIn = true;
  public zoomOut = false;
  public pickedColor: any = '#000';
  // strings
  public imgUrl = '';
  public anchorUrl = '';
  public anchorText = '';
  public htmlText = '';
  public tableRow = 0;
  public tableColumn = 0;
  public tableWidth = 100;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editMode) {
      this.nameDropdown = false;
      this.sizeDropdown = false;
      this.imgDropdown = false;
      this.anchorDropdown = false;
      this.colorsDropdown = false;
      this.tableDropdown = false;
      this.pickedColor = '#000000';
    }
  }

  public execCommand(command: string, fontName?: string, fontSize?: string, color?: string): void {
    const textBox = document.getElementById('textEditor');
    const editorBox = document.getElementById('editorBox');
    textBox.focus();
    switch (command) {
      case 'bold':
        document.execCommand('bold', false, null);
        break;
      case 'italic':
        document.execCommand('italic', false, null);
        break;
      case 'copy' :
        document.execCommand('copy', false, null);
        break;
      case 'strikethrough' :
        document.execCommand('strikethrough', false, null);
        break;
      case 'underline' :
        document.execCommand('underline', false, null);
        break;
      case 'superscript' :
        document.execCommand('superscript', false, null);
        break;
      case 'subscript' :
        document.execCommand('subscript', false, null);
        break;
      case 'createLink' :
        if (this.anchorUrl && this.anchorUrl) {
          this.createLink(this.anchorUrl, this.anchorText);
        }
        break;
      case 'fontName' :
        document.execCommand('fontName', false, fontName);
        break;
      case 'fontSize' :
        document.execCommand('fontSize', false, fontSize.toString());
        break;
      case 'insertUnorderedList' :
        document.execCommand('insertUnorderedList', false, null);
        break;
      case 'insertOrderedList' :
        document.execCommand('insertOrderedList', false, null);
        break;
      case 'undo' :
        document.execCommand('undo', false, null);
        break;
      case 'redo' :
        document.execCommand('redo', false, null);
        break;
      case 'foreColor' :
        this.pickedColor = color;
        document.execCommand('foreColor', false, color);
        break;
      case 'insertImg' :
        if (this.imgUrl) {
          textBox.focus();
          this.insertImg(this.imgUrl);
          this.imgUrl = '';
        }
        break;
      case 'insertHorizontalRule' :
        document.execCommand('insertHorizontalRule', false, null);
        break;
      case 'print' :
        window.print();
        break;
      case 'fullScreen' :
        this.zoomIn = !this.zoomIn;
        this.zoomOut = !this.zoomOut;
        editorBox.classList.toggle('zoom');
        break;
      case 'createTable':
        console.log('test');
        this.createTable();
        break;
      default : {
        this.htmlText = textBox.innerHTML;
        this.insertedText.emit(this.htmlText);
      }
    }
  }

  public insertImg(url: string): void {
    const img = '<img src=\'' + url + '\' style="max-width: 120px; max-height: 120px" >';
    document.execCommand('insertHTML', false, img);
  }

  public createTable(): void {
    let rowText = '';
    let columnBody = '';
    let columns = '';
    let table = '';
    for (let i = 0; i < this.tableRow; i++) {
      rowText += `<th style="width: ${this.tableWidth.toString() + 'px'}"></th>`;
    }
    for (let j = 0; j < this.tableRow; j++) {
      columnBody += `<td style="width: ${this.tableWidth.toString() + 'px'}"></td>`;
    }
    for (let k = 0; k < this.tableRow; k++) {
      columns += `<tr>${columnBody}</tr>`;
    }
    table = `<table border="1px solid black" style="table-layout: fixed">
                        <thead>
                            <tr>${rowText}</tr>
                        </thead>
                        <tbody>
                            ${columns}
                        </tbody>
                    </table>
`;
    document.execCommand('insertHTML', false, table);
  }

  public resizeDiv(event): void {
    console.log(event);
  }

  public createLink(url: string, text: string): void {
    const anchor = '<a href="' + url + '" target="_blank">' + text + '</a>';
    document.execCommand('insertHTML', false, anchor);
  }
}
