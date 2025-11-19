import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchInput } from '../search-input/search-input';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SearchInput],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
