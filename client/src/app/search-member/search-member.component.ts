import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.css']
})
export class SearchMemberComponent implements OnInit {
  replVar = '';

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#details').hide();
      $('#accountlist').hide();

      console.log("ready!");

      $("#clearBtn").click(function () {
        $('#details').hide();
        $('#accountlist').hide();
      });

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
    })
  }

  listData() {
    var f;
    if ($("#memberID").val().toString().length === 0) {
      this.populateAccounts($('#firstName').val(), $('#lastName').val());
      $('#accountlist').show();
      
      if (! $.fn.DataTable.isDataTable( '#accountslist' ) ) {
        $('#accountslist').DataTable({
          "columnDefs": [{
            "targets": 1,
            "data": "download_link",
            "render": function (data, type, full, meta) {
              return `<a onclick="loadDetails(` + data + ')">' + data + '</a>';
            }
          }]
        });
      }
    } else {
      this.populateDetails($('#memberID').val());
      $('#details').show();
      $('#assets').DataTable();
    }

    // function loadDetails(data) {
    //   this.populateDetails(data);
    //   $('#details').show();
    //   $('#assets').DataTable();
    // }
  
    // function populateDetails(memberId) {
    //   //alert(memberId);
    // }
  }

  loadDetails(data) {
    console.log("here");
    
    this.populateDetails(data);
    $('#details').show();
    $('#assets').DataTable();
  }

  populateDetails(memberId) {
    //alert(memberId);
  }

  populateAccounts(firstName, lastName) {
    // alert(firstName);
    // alert(lastName);
  }
}
