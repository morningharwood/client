import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';


@Component({
  selector: 'folio',
  templateUrl: './folio.component.html',
  styleUrls: [
    './folio.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolioComponent {
  @Input() header: string = 'Good Morning Harwood';
  @Input() subheader: string = `A digital sandbox created by <a class="wow" href="www.google.com">Matthew Harwood</a>`;
}
