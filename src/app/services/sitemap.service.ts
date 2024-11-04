import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  private apiUrl = 'https://dummyjson.com/products';

  private routes = [
    {
      path: "",
      changefreq: "never",
      priority: "0.8"
    },
    {
      path: "contact",
      changefreq: "never",
      priority: "0.8"
    },
    {
      path: "about",
      changefreq: "never",
      priority: "0.8"
    },
  ]

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.products) // Accessing the 'products' key
    );
  }

  generateSitemapXml(products: any[]): string {
    const baseUrl = 'https://dummyjson.com';

    
    // Generate XML for product URLs
    const productUrls = products.map(product => `
      <url>
        <loc>${baseUrl}/products/${product.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `);

    // Generate XML for static route URLs
    const routeUrls = this.routes.map(route => `
      <url>
        <loc>${baseUrl}/${route.path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
      </url>
    `);

    // Combine both product and static route URLs
    const urls = [...productUrls, ...routeUrls];

    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('')}
      </urlset>
    `;
  }
}
