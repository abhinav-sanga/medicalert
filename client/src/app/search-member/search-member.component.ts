import { Component, OnInit, ViewChild } from '@angular/core';
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
  salesforceId: string = '';
  membershipDetails: any = [];
  contactRelation: any = [];
  attachmentDetails: any = [];
  assetDetails: any = [];
  isLoading: boolean = false;
  // We use this trigger because fetching the data can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
  dtAssetTrigger = new Subject();

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
    $('#assets').DataTable().destroy();
    $('#accountslist').DataTable().destroy();
    $('#details').hide();
    $('#accountlist').hide();
    $('#contactRelations').DataTable().destroy();
  }

  listData() {
    $('#details').hide();
    $('#accountlist').hide();
    $('#assets').DataTable().destroy();
    $('#accountslist').DataTable().destroy();
    // $('#contactRelations').DataTable().destroy();
    if (this.memberId && this.memberId.toString().length && !this.firstName.length && !this.lastName.length) {
      this.isLoading = true;
      this.populateDataService.medicAlertMemberId(this.memberId).subscribe(res => {
        this.returnedArray = res;
        if (this.returnedArray && this.returnedArray.length && this.returnedArray[0].Id) {
          this.loadDetails(this.returnedArray[0].MemberID__c, this.returnedArray[0].Id);
        }
        // this.dtTrigger.next();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else if (this.firstName.trim().length && !this.lastName.trim().length) {
      this.isLoading = true;
      this.populateDataService.firstNameOnly(this.firstName).subscribe(res => {
        this.returnedArray = res;
        this.dtTrigger.next();
        this.isLoading = false;
        $('#accountlist').show();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else if (this.firstName.trim().length && this.lastName.trim().length) {
      this.isLoading = true;
      this.populateDataService.firstNamelastName(this.firstName, this.lastName).subscribe(res => {
        this.returnedArray = res;
        this.dtTrigger.next();
        this.isLoading = false;
        $('#accountlist').show();
      }, (err) => {
        console.log(err);
        this.clearAll();
      });
    } else {
      this.clearAll();
    }
  }

  async loadDetails(memId, salesId) {
    if (memId && memId.trim().length) {
      this.isLoading = true;
      try {
        this.membershipDetails = await this.populateDataService.salesforceId(salesId).toPromise();
        this.contactRelation = await this.populateDataService.contactRelationship(salesId).toPromise();
        this.attachmentDetails = await this.populateDataService.attachmentId(salesId).toPromise();
        this.assetDetails = await this.populateDataService.memberAsset(salesId).toPromise();
        $('#details').show();
        // this.dtAssetTrigger.next();
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.dtAssetTrigger.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
