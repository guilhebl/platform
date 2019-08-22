import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bc-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],
})
export class HomePageComponent {}
