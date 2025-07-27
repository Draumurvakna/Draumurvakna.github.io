/**
 * 杂志风格摄影页面 - 简化JavaScript
 */

class PhotographyGallery {
  constructor() {
    this.config = window.PHOTOGRAPHY_CONFIG || {};
    this.photos = this.config.photos || [];
    this.categories = this.config.categories || [];
    this.currentFilter = 'all';
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderPhotos();
  }

  setupEventListeners() {
    // 分类筛选
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter(e.target.dataset.category);
      });
    });

    // 照片点击事件
    document.addEventListener('click', (e) => {
      if (e.target.closest('.photo-card')) {
        const card = e.target.closest('.photo-card');
        const photoId = card.dataset.id;
        const photo = this.photos.find(p => p.id === photoId);
        if (photo) {
          this.openViewer(photo);
        }
      }
    });

    // 查看器关闭
    document.getElementById('viewerClose')?.addEventListener('click', () => {
      this.closeViewer();
    });

    document.getElementById('viewerOverlay')?.addEventListener('click', () => {
      this.closeViewer();
    });

    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeViewer();
      }
    });
  }

  renderPhotos() {
    const container = document.getElementById('photoGallery');
    if (!container) return;

    const filteredPhotos = this.getFilteredPhotos();
    
    if (filteredPhotos.length === 0) {
      container.innerHTML = '<div class="empty-state">暂无作品</div>';
      return;
    }

    container.innerHTML = '';

    filteredPhotos.forEach(photo => {
      const photoCard = this.createPhotoCard(photo);
      container.appendChild(photoCard);
    });
  }

  createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.dataset.category = photo.category;
    card.dataset.id = photo.id;

    card.innerHTML = `
      <div class="photo-container">
        <img src="${photo.image}" alt="${photo.title}">
      </div>
      <div class="photo-info">
        <span class="photo-category">${this.getCategoryName(photo.category)}</span>
        <h3 class="photo-title">${photo.title}</h3>
        <p class="photo-description">${photo.description}</p>
        <div class="photo-meta">
          <span class="photo-date">📅 ${this.formatDate(photo.date)}</span>
          <span class="photo-location">📍 ${photo.location}</span>
        </div>
      </div>
    `;

    return card;
  }

  getFilteredPhotos() {
    if (this.currentFilter === 'all') {
      return this.photos;
    }
    return this.photos.filter(photo => photo.category === this.currentFilter);
  }

  setFilter(category) {
    this.currentFilter = category;
    
    // 更新按钮状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    this.renderPhotos();
  }

  openViewer(photo) {
    const viewer = document.getElementById('photoViewer');
    const image = document.getElementById('viewerImage');
    const title = document.getElementById('viewerTitle');
    const description = document.getElementById('viewerDescription');
    const date = document.getElementById('viewerDate');
    const location = document.getElementById('viewerLocation');

    if (viewer && image) {
      image.src = photo.image;
      image.alt = photo.title;
      title.textContent = photo.title;
      description.textContent = photo.description;
      date.textContent = this.formatDate(photo.date);
      location.textContent = photo.location;

      viewer.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  closeViewer() {
    const viewer = document.getElementById('photoViewer');
    if (viewer) {
      viewer.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  getCategoryName(categoryId) {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '未分类';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new PhotographyGallery();
}); 