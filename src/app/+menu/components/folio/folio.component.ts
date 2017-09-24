import {
  Component,
  ChangeDetectionStrategy,
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
}
