import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  private apiUrl = 'https://example.com/api/products';

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  generateSitemapXml(products: any[]): string {
    const baseUrl = 'https://example.com';
    const urls = products.map(product => `
      <url>
        <loc>${baseUrl}/products/${product.id}</loc>
        <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);

    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('')}
      </urlset>
    `;
  }
}
