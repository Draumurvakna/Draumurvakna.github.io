let themeFunc = async function() {
    let root = document.documentElement;
    
    // 强制设置为白天模式（已移除主题切换功能）
    root.setAttribute('theme', 'light');
    localStorage.setItem('theme', 'light');
};
themeFunc();

