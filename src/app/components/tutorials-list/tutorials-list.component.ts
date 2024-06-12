import {Component, OnInit} from '@angular/core';
import {Tutorial} from '../../models/tutorial.model';
import {TutorialService} from '../../services/tutorial.service';
import {LocalService} from "../../services/local.token";
import {ActivatedRoute, Router} from "@angular/router";
import {timer} from 'rxjs';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})

export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  loginDetails = null;

  constructor(
    private tutorialService: TutorialService,
    private localStore: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginDetails = JSON.parse(this.localStore.getData('logindetails') + '');
    // console.log('list compo', this.loginDetails);
    if (this.loginDetails == null) {
      this.router.navigate(['/login']);
    }
    console.log('before setTimeout called');
    // this.getAllNotTakenRides();
    timer(0, 5000).subscribe(result =>
      this.getAllNotTakenRides()
    );

  }

  getAllNotTakenRides(): void {
    this.tutorialService.getAllNotTakenRides().subscribe({
      next: (data) => {
        this.tutorials = data;
        // console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  setActiveRide(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  /*searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }*/
}
