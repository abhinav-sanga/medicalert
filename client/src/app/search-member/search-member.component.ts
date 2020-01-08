import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PopulateDataService } from '../services/populate-data.service';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.css']
})
export class SearchMemberComponent implements OnInit {

  memberId: number;
  firstName: string = '';
  lastName: string = '';
  returnedArray: any = [];
  // We use this trigger because fetching the data can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  constructor(private populateDataService: PopulateDataService) { }

  ngOnInit() {
    this.clearAll();

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  clearAll() {
    this.memberId = null;
    this.firstName = '';
    this.lastName = '';
    this.returnedArray = [];
    $('#details').hide();
    $('#accountlist').hide();
  }

  listData() {
    if (this.memberId && this.memberId.toString().length && !this.firstName.length && !this.lastName.length) {
      this.populateDataService.medicAlertMemberId(this.memberId).subscribe(res => {
        this.returnedArray = res;
        // this.createDatatable();
        this.dtTrigger.next();
        $('#accountlist').show();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else if (this.firstName.trim().length && !this.lastName.trim().length) {
      this.populateDataService.firstNameOnly(this.firstName).subscribe(res => {
        this.returnedArray = res;
        // this.createDatatable();
        this.dtTrigger.next();
        $('#accountlist').show();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else if (this.firstName.trim().length && this.lastName.trim().length) {
      this.populateDataService.firstNamelastName(this.firstName, this.lastName).subscribe(res => {
        this.returnedArray = res;
        // this.createDatatable();
        this.dtTrigger.next();
        $('#accountlist').show();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else {
      this.clearAll();
    }
  }

  loadDetails(data) {
    //   if (data && data.trim().length) {
    //     this.populateDataService.salesforceId()
    //     $('#details').show();
    //     $('#assets').DataTable();
    //   }
  }
}
