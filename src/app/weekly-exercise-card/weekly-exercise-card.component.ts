import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-weekly-exercise-card',
  templateUrl: './weekly-exercise-card.component.html',
  styleUrls: ['./weekly-exercise-card.component.scss']
})
export class WeeklyExerciseCardComponent {
  @Input() day: string | undefined | null;
  @Input() exerciseTime: number | undefined | null;
  @Input() isExercised: boolean | undefined | null;

}
