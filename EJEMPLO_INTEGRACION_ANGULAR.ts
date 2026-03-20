// ==========================================
// CONFIGURACIÓN PARA ANGULAR
// ==========================================

// 1. Tu enum en Angular (ejemplo)
export enum PostCategory {
  TECH = 'TECH',
  DESIGN = 'DESIGN', 
  BUSINESS = 'BUSINESS',
  LIFESTYLE = 'LIFESTYLE',
  TUTORIAL = 'TUTORIAL',
  OPINION = 'OPINION'
}

// 2. Interfaces TypeScript para los datos de Sanity
export interface SanityCategory {
  _id: string;
  titleES: string;
  titleEN?: string;
  value: PostCategory; // Aquí conectas con tu enum
  slug: { current: string };
  description?: string;
  color?: { hex: string };
}

export interface SanityPost {
  _id: string;
  titleES: string;
  titleEN?: string;
  excerptES: string;
  excerptEN?: string;
  bodyES: any[];
  bodyEN?: any[];
  slug: { current: string };
  publishedAt: string;
  category: SanityCategory; // Referencia completa a la categoría
  image?: {
    asset: {
      url: string;
    }
  };
}

// ==========================================
// CONSULTAS GROQ PARA ANGULAR
// ==========================================

// Obtener todos los posts con sus categorías
export const ALL_POSTS_QUERY = \`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    titleES,
    titleEN,
    excerptES,
    excerptEN,
    slug,
    publishedAt,
    category->{
      _id,
      titleES,
      titleEN,
      value,
      slug,
      color
    },
    image{
      asset->{
        url
      }
    }
  }
\`;

// Filtrar posts por categoría usando el enum
export const POSTS_BY_CATEGORY_QUERY = \`
  *[_type == "post" && category->value == $category] | order(publishedAt desc) {
    _id,
    titleES,
    titleEN,
    excerptES,
    excerptEN,
    slug,
    publishedAt,
    category->{
      _id,
      titleES,
      titleEN,
      value,
      slug,
      color
    },
    image{
      asset->{
        url
      }
    }
  }
\`;

// Obtener todas las categorías
export const ALL_CATEGORIES_QUERY = \`
  *[_type == "category"] | order(titleES asc) {
    _id,
    titleES,
    titleEN,
    value,
    slug,
    description,
    color
  }
\`;

// ==========================================
// EJEMPLO DE SERVICIO ANGULAR
// ==========================================

import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: 'a5eryyb2', // Tu project ID
      dataset: 'production',
      apiVersion: '2023-10-01',
      useCdn: true
    });
  }

  // Obtener todos los posts
  async getAllPosts(): Promise<SanityPost[]> {
    return await this.client.fetch(ALL_POSTS_QUERY);
  }

  // Filtrar posts por categoría
  async getPostsByCategory(category: PostCategory): Promise<SanityPost[]> {
    return await this.client.fetch(POSTS_BY_CATEGORY_QUERY, { category });
  }

  // Obtener categorías
  async getAllCategories(): Promise<SanityCategory[]> {
    return await this.client.fetch(ALL_CATEGORIES_QUERY);
  }

  // Ejemplo de uso en componente
  async filterPostsByCategory() {
    // Filtrar solo posts de tecnología
    const techPosts = await this.getPostsByCategory(PostCategory.TECH);
    
    // Filtrar posts de diseño
    const designPosts = await this.getPostsByCategory(PostCategory.DESIGN);
    
    return { techPosts, designPosts };
  }
}

// ==========================================
// EJEMPLO DE COMPONENTE ANGULAR
// ==========================================

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  template: \`
    <div class="blog-container">
      <!-- Filtros de categoría -->
      <div class="category-filters">
        <button 
          *ngFor="let category of categories" 
          [class.active]="selectedCategory === category.value"
          (click)="filterByCategory(category.value)"
          [style.backgroundColor]="category.color?.hex">
          {{ category.titleES }}
        </button>
      </div>

      <!-- Lista de posts -->
      <div class="posts-grid">
        <article *ngFor="let post of filteredPosts" class="post-card">
          <h2>{{ post.titleES }}</h2>
          <p>{{ post.excerptES }}</p>
          <span class="category-tag" 
                [style.backgroundColor]="post.category.color?.hex">
            {{ post.category.titleES }}
          </span>
        </article>
      </div>
    </div>
  \`
})
export class BlogComponent implements OnInit {
  posts: SanityPost[] = [];
  categories: SanityCategory[] = [];
  filteredPosts: SanityPost[] = [];
  selectedCategory: PostCategory | null = null;

  constructor(private blogService: BlogService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.posts = await this.blogService.getAllPosts();
    this.categories = await this.blogService.getAllCategories();
    this.filteredPosts = this.posts;
  }

  async filterByCategory(category: PostCategory) {
    this.selectedCategory = category;
    this.filteredPosts = await this.blogService.getPostsByCategory(category);
  }

  showAllPosts() {
    this.selectedCategory = null;
    this.filteredPosts = this.posts;
  }
}