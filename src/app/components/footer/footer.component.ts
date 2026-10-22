import { Component } from '@angular/core';

@Component({ selector: 'app-footer', standalone: true, template: `<footer><span>© 2026 ConfTech</span><span>Built for people who build the future.</span><a href="#top">Back to top ↑</a></footer>`, styles: [`:host{display:block}footer{border-top:1px solid #e7eaf0;padding:18px max(28px,calc((100% - 1180px)/2));display:flex;justify-content:space-between;color:#8791a0;font-size:10px}a{color:#586b3a;text-decoration:none}@media(max-width:520px){footer{gap:10px;flex-wrap:wrap}}`] })
export class FooterComponent {}
