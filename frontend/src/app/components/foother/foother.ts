import { Component } from '@angular/core';
import { Chat } from '../chat/chat';
import { Popover } from 'primeng/popover';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AppIcon } from '../app-icon/app-icon';

@Component({
  selector: 'app-foother',
  imports: [
    Chat,
    Popover,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    AppIcon,
  ],
  templateUrl: './foother.html',
  styleUrl: './foother.css',
})
export class Foother {
  members = [
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    {
      name: 'Bernardo Dominic',
      image: 'bernardodominic.png',
      email: 'bernardo@email.com',
      role: 'Editor',
    },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
  ];
}
