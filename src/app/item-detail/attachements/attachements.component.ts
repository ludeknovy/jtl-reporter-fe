import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsApiService } from 'src/app/items-api.service';

@Component({
  selector: 'app-attachements',
  templateUrl: './attachements.component.html',
  styleUrls: ['./attachements.component.css']
})
export class AttachementsComponent implements OnInit {

  @Input() params: any;
  @Input() attachements: [];

  constructor(
    private modalService: NgbModal,
    private itemApiService: ItemsApiService
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getErrors() {
    this.itemApiService.downloadTestErrors(this.params).subscribe(res => {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
    });
  }

}
