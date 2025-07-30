let themeFunc = async function() {
    let btn = document.getElementById("theme-btn");
    let root = document.documentElement;
    
    // 初始化主题：优先使用localStorage中保存的主题，否则使用默认的light主题
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('theme', savedTheme);
    } else {
        // 如果没有保存的主题，设置为light并保存
        root.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    
    // 主题切换事件
    btn.addEventListener('click', e => {
        if (root.getAttribute('theme') == 'dark') {
            root.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
};
themeFunc();

