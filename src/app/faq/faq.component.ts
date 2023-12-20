import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  faqs = [
    { question: 'What sets your farm-to-table experience apart?', answer: 'Our farm-to-table experience is not just about freshness; it\'s about innovative culinary twists that redefine traditional dining. We source ingredients ethically and sustainably to create a unique and delightful dining experience.', expanded: false },

  ];

  toggleAnswer(faq: any): void {
    faq.expanded = !faq.expanded;
  }

}
