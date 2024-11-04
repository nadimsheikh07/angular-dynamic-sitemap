import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SitemapService } from '../services/sitemap.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  sitemapXml: SafeHtml = '';

  constructor(
    private sitemapService: SitemapService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sitemapService.fetchProducts().subscribe(products => {
      const xml = this.sitemapService.generateSitemapXml(products);
      this.sitemapXml = this.sanitizer.bypassSecurityTrustHtml(xml);
    });
  }

}
