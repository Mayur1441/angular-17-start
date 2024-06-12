import {Component, OnInit} from '@angular/core';
import {LocalService} from "../../services/local.token";
import {ActivatedRoute, Router} from "@angular/router";
import {TutorialService} from '../../services/tutorial.service';
import {Tutorial} from "../../models/tutorial.model";

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  constructor(
    private tutorialService: TutorialService,
    private localStore: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  currentIndex = -1;
  title = 'Dashboard';
  loginDetails = null;
  totalEarnToday = 0;
  totalEarnAll = 0;
  totalTravelToday = 0;
  totalTravelAll = 0;
  totalCommissionsToday = 0;
  totalCommissionsAll = 0;
  totalRideToday = 0;
  totalRideAll = 0;
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};

  ngOnInit(): void {
    this.loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');
    // console.log('Dashboard compo', this.loginDetails);
    if (this.loginDetails == null) {
      this.router.navigate(['/login']);
    }
    this.getAllNotTakenRides();
  }

  getAllNotTakenRides(): void {
    this.tutorialService.getMyAllRides().subscribe({
      next: (data) => {
        this.tutorials = data;
        let temptotalEarnToday = 0;
        let temptotalEarnAll = 0;
        let temptotalTravelToday = 0;
        let temptotalRidesToday = 0;
        let temptotalTravelAll = 0;
        this.totalRideAll = data.length
        data.forEach(function (value, key) {
          // console.log(key + ': ', value);
          let date = new Date(value.createdAt + '');
          let dateToday = new Date();
          let date1 = (date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
          let date2 = (dateToday.getDate() + '-' + dateToday.getMonth() + '-' + dateToday.getFullYear());
          if (date1 == date2 && value.complete == true) {
            temptotalEarnToday = temptotalEarnToday + Number(value.fare);
            temptotalTravelToday = temptotalTravelToday + Number(value.distance);
            temptotalRidesToday = temptotalRidesToday + 1;
          }
          if (value.complete == true) {
            temptotalEarnAll = temptotalEarnAll + Number(value.fare);
            temptotalTravelAll = temptotalTravelAll + Number(value.distance);
          }
        });
        this.totalEarnToday = temptotalEarnToday;
        this.totalTravelToday = temptotalTravelToday;
        this.totalEarnAll = temptotalEarnAll;
        this.totalTravelAll = temptotalTravelAll;
        this.totalRideToday = temptotalRidesToday;
        this.totalCommissionsToday = this.totalEarnToday / 100 * 15;
        this.totalCommissionsAll = this.totalEarnAll / 100 * 15;
      },
      error: (e) => console.error(e)
    });
  }

  setActiveRide(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  doLogOut(): void {
    this.localStore.removeData('logindetails');
    this.router.navigate(['/login']);
  }
}
