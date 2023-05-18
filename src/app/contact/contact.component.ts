import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../main/auth.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  topics: string[] = ['Question', 'Comment', 'Improvement to the app'];
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    topic: ['', Validators.required],
    otherTopic: [{value: '', disabled: true}, Validators.required],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.contactForm.get('topic')?.valueChanges.subscribe(topic => {
      const otherTopicControl = this.contactForm.get('otherTopic');
      if (topic === 'other') {
        otherTopicControl?.enable();
      } else {
        otherTopicControl?.disable();
      }
    });

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.contactForm.patchValue({
          name: user.firstName + ' ' + user.lastName,
        });
      }
    });
  }

  onSubmit(): void {
    // Submit logic goes here
    console.log(this.contactForm.value);
  }
}
