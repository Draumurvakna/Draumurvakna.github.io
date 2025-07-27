/**
 * 杂志风格摄影页面 - 简化JavaScript
 */

class PhotographyGallery {
  constructor() {
    this.config = window.PHOTOGRAPHY_CONFIG || {};
    this.photos = this.config.photos || [];
    this.categories = this.config.categories || [];
    this.currentFilter = 'all';
    this.scrollPosition = 0;
    
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
    let viewer = document.getElementById('photoViewer');
    
    // 如果查看器不存在，创建一个新的
    if (!viewer) {
      viewer = this.createViewer();
    }
    
    // 确保查看器直接添加到body下，脱离页面布局
    if (viewer.parentNode !== document.body) {
      document.body.appendChild(viewer);
    }

    const image = document.getElementById('viewerImage');
    const title = document.getElementById('viewerTitle');
    const description = document.getElementById('viewerDescription');
    const date = document.getElementById('viewerDate');
    const location = document.getElementById('viewerLocation');

    if (image) {
      // 保存当前滚动位置
      this.scrollPosition = window.pageYOffset;
      
      image.src = photo.image;
      image.alt = photo.title;
      title.textContent = photo.title;
      description.textContent = photo.description;
      date.textContent = this.formatDate(photo.date);
      location.textContent = photo.location;

      // 使用CSS类显示查看器
      viewer.classList.add('show');
      
      // 确保关闭按钮事件绑定成功（额外保障）
      setTimeout(() => {
        const closeBtn = document.getElementById('viewerClose');
        if (closeBtn && !closeBtn.hasAttribute('data-event-bound')) {
          closeBtn.addEventListener('click', () => {
            this.closeViewer();
          });
          closeBtn.setAttribute('data-event-bound', 'true');
        }
      }, 0);
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.scrollPosition}px`;
      document.body.style.width = '100%';
    }
  }

  createViewer() {
    const viewer = document.createElement('div');
    viewer.id = 'photoViewer';
    viewer.className = 'photo-viewer';
    
    viewer.innerHTML = `
      <div class="viewer-overlay" id="viewerOverlay"></div>
      <div class="viewer-content">
        <button class="viewer-close" id="viewerClose">×</button>
        <img id="viewerImage" src="" alt="">
        <div class="viewer-info">
          <h3 id="viewerTitle"></h3>
          <p id="viewerDescription"></p>
          <div class="viewer-meta">
            <span id="viewerDate"></span>
            <span id="viewerLocation"></span>
          </div>
        </div>
      </div>
    `;
    
    // 添加事件监听器
    const closeBtn = viewer.querySelector('#viewerClose');
    closeBtn.addEventListener('click', () => {
      this.closeViewer();
    });
    closeBtn.setAttribute('data-event-bound', 'true');
    
    viewer.querySelector('#viewerOverlay').addEventListener('click', () => {
      this.closeViewer();
    });
    
    return viewer;
  }

  closeViewer() {
    const viewer = document.getElementById('photoViewer');
    if (viewer) {
      // 使用CSS类隐藏查看器
      viewer.classList.remove('show');
      
      // 恢复滚动样式和位置
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // 恢复之前的滚动位置
      if (typeof this.scrollPosition === 'number') {
        window.scrollTo(0, this.scrollPosition);
      }
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