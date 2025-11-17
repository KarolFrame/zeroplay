import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-app-icon',
  imports: [CommonModule],
  templateUrl: './app-icon.html',
  styleUrl: './app-icon.css',
})
export class AppIcon {
  @Input() name!: string;
}
