import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.css']
})
export class SearchMemberComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#details').hide();
      $('#accountlist').hide();

      console.log("ready!");


      $("#searchBtn").click(function () {
        if ($("#memberID").val().length === 0) {
          populateAccounts($('#firstName').val(), $('#lastName').val());
          $('#accountlist').show();
          if (!$.fn.DataTable.isDataTable('#accountslist')) {
            $('#accountslist').DataTable({
              "columnDefs": [{
                "targets": 1,
                "data": "download_link",
                "render": function (data, type, full, meta) {
                  return '<a href="javascript:loadDetails(' + data + ')">' + data + '</a>';
                }
              }]
            });
          }
        } else {
          populateDetails($('#memberID').val());
          $('#details').show();
          $('#assets').DataTable();
        }





      });
      $("#clearBtn").click(function () {
        $('#details').hide();
        $('#accountlist').hide();
      });



    });

    function loadDetails(data) {
      populateDetails(data);
      $('#details').show();
      $('#assets').DataTable();
    }

    function populateDetails(memberId) {
      //alert(memberId);
    }

    function populateAccounts(firstName, lastName) {
      // alert(firstName);
      // alert(lastName);

    }




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

}
