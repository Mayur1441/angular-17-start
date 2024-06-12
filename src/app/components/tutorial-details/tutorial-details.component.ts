import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})

export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() completeRide = false;

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      // this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  takeride(): void {
    this.message = '';
    this.tutorialService.takeride(this.currentTutorial.id, {}).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.status == 200) {
          alert(res.message);
          this.router.navigate(['/dashboard']);
          this.currentTutorial.taken = true;
        } else {
          alert(res.message);
        }
      },
      error: (e) => console.error(e)
    });
  }

  completeride(): void {
    this.message = '';
    this.tutorialService.completeride(this.currentTutorial.id, {}).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.status == 200) {
          alert(res.message);
          this.router.navigate(['/dashboard']);
          this.currentTutorial.complete = true;
          // this.message = res.message ? res.message : 'The status was updated successfully!';
        } else {
          alert(res.message);
        }
      },
      error: (e) => console.error(e)
    });
  }

  cancelride(): void {
    console.log('cancel')
    this.message = '';
    this.tutorialService.cancelride(this.currentTutorial.id, {}).subscribe({
      next: (res) => {
        // console.log(res);
        if (res.status == 200) {
          alert(res.message);
          this.currentTutorial.taken = false;
          this.currentTutorial.complete = false;
          this.currentTutorial = {};
          this.router.navigate(['/rides']);
          // this.message = res.message ? res.message : 'The status was updated successfully!';
        } else {
          alert(res.message);
        }
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}
